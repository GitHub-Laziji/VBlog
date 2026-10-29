# VBlog 审计与优化报告

作者 2018 年后基本停更，代码停留在 Vue 2 + webpack 3 + Element UI 2.3 时代。这次按"能不能用 → 安不安全 → 快不快 → 好不好养"四层过了一遍，分成**已修**和**建议**两部分。

分支：`optimize/security-perf`

---

## 一、功能 bug（已修）

| # | 问题 | 影响 | 位置 | 修法 |
|---|------|------|------|------|
| 1 | 详情页先给 `blog.id` 赋值再调接口，但接口用的是 `this.blog.id` 赋值前的空值 | 打开文章/项目详情页永远空白，等于博客核心功能挂了 | `src/views/blog/Details.vue:49`、`src/views/project/Details.vue`、两个移动端同名文件 | 在 `mounted` 里先取 `this.$route.params.id`，再用它请求 `GistApi.single(id)` |
| 2 | GitHub 早已不支持 `?access_token=` 传 token | 绑定 Token 后所有请求 401，"写博文/编辑"全废 | `src/utils/request.js:19`（原 `addAuthHeader`） | 改成请求拦截器统一塞 `Authorization: Bearer <token>` |
| 3 | 拉用户信息时 `githubUsername` 还是配置加载前的空串 | 请求打到 `/users/`，404；头像昵称简介全空 | `src/store/modules/user.js:36`、`src/App.vue:24` | `Init` 拿到 configuration.json 后再 `GetInfo`；`GetInfo` 改成从 store 取用户名 |
| 4 | 错误提示里局部变量 `message` 遮蔽了导入的提示函数，`message({...})` 等于调用字符串 | 401/403/404 全部抛 `TypeError`，用户只看到"请求失败"甚至白屏 | `src/utils/request.js` 响应拦截器 | 变量改名 `text`，提示函数改名 `notifyMessage`；按 401/403/404/网络错误分支给中文文案 |
| 5 | `utcToLocal` 手动 `+8` 小时 | 非东八区用户看到的发布时间全错 | `src/utils/util.js` | 交给 `Date` 按访问者本地时区格式化 |
| 6 | `created` 里就设 `document.title`，此时配置还没回来 | 首屏标签页标题是空的 | `src/App.vue` | 加 `watch: htmlTitle`，配置到位后补设 |
| 7 | 全屏按钮判断的是 `requestFullScreen`（标准是 `requestFullscreen`），还留着 IE 的 `ActiveXObject` | 现代浏览器只能靠 webkit 兼容分支碰运气，IE 分支是死代码 | `src/utils/util.js` `fullScreen/fullExit` | 用标准 API + webkit/ms 兜底，`exitFullscreen` 同理 |

发文章标题里带 `/` 时 GitHub 返回 422 的问题，也顺手做了文件名清洗（`src/api/gist.js` `safeFileName`）。

---

## 二、安全

1. **存储型 XSS（已修，最严重）**
   文章内容走 `mavon-editor.markdownIt.render()` 后直接 `v-html`，作者在文章里写 `<img onerror=...>` 或 `<script>` 就能在每个读者浏览器里执行（配合"Token 存在 Cookie 里"可以偷 Token）。
   现在 `$markdown` 统一过 DOMPurify，模板里 5 处 `v-html` 也改成 `v-html="$sanitize(...)"` 兜底。
   测试脚本 `tools/test-sanitize.mjs`：8 条断言全 PASS（`onerror`、`<script>`、`javascript:`、内联事件、`<iframe>` 全部剥掉，`<h1>/<pre>/target` 保留）。

2. **Token 泄露面（已修）**
   token 不再出现在 URL、代理日志、Referer 里。

3. **还没解决的**
   - token 仍存在 Cookie（`js-cookie`）里，纯前端项目没法用 httpOnly；建议至少加 `SameSite=Lax`，并明确"Token 等同密码"。
   - `axios 0.17.1`（2017 年版本）有已知 CVE，建议升到 1.x，改动不大（拦截器写法兼容）。
   - 无 CSP。项目是纯静态托管，可以在宿主或 `index.html` 里加一条基础 CSP。

---

## 三、性能（实测，不是估算）

`node build/build.js` 真实构建产物对比：

| 产物 | 改动前 | 改动后 |
|------|--------|--------|
| `vendor.js` | 1.16 MB / gzip 311 KB | 1143.6 KB / gzip 310.9 KB |
| `app.js` | 81.6 KB | 14.1 KB / gzip 4.7 KB |
| `app.css` | 273 KB / gzip 69 KB | 270 KB / gzip 68.8 KB |
| 异步 chunk | 0 | 22 个（页面级） |
| `dist` 总大小 | 6.3 MB（带 sourcemap） | 2.2 MB |

做了三件事：

1. **路由级懒加载**：原来 23 个页面（桌面 13 + 移动 7 + 布局）全部静态 `import`，首屏必须全下。现在每个页面一个 chunk。
2. **构建期预压缩**：`productionGzip: true`，产物里带 `.gz`，Nginx 开 `gzip_static on` 直接发压缩体。
3. **关掉生产 sourcemap**：`productionSourceMap: false`，dist 从 6.3 MB 降到 2.2 MB。

**真实首屏传输量**（ego-browser 打开构建产物，服务端带 gzip，读 `performance.getEntriesByType('resource')` 的 `encodedBodySize`）：

```
manifest 2 KB  app 5 KB  vendor 311 KB  css 69 KB
当前路由 chunk 10 KB + 5 KB + 2 KB
合计 404 KB（其中 JS 335 KB）
```

**为什么首屏只降了 5～7%**：`vendor.js` 里三个大头——element-ui（≈590 KB）、vant（≈580 KB）、mavon-editor（≈1 MB，含 highlight.js）——都是 `main.js` 里全局 `import` 的，跟业务代码在不在一个包没关系。业务代码从 81.6 KB 压到 14.1 KB 是真的，但它在首屏里本来就只占 1/5。

**试过但没采用的**：把 element-ui / vant 拆成按布局懒加载的独立异步 chunk（`src/plugins/*.js` + layout 里 import + `CommonsChunkPlugin minChunks: 2`）。实测首屏 335 KB → 330 KB，基本没动，反而引入新的风险：`/404` 之外的其它不经过 Layout 的页面如果用了 `el-*` 组件会静默失效。已经在一次提交里做过又回退，代码里没留。

**下一步的收益排序**（估算，都需要动构建链）：

1. UI 库按需注册：element-ui 每个页面实际用不到 15 个组件，`babel-plugin-component` + 逐组件注册大约能把 element 从 590 KB 压到 200 KB 上下（估省 100 KB gz 以上）。Vant 只给移动端用，桌面端本来就不该下载——但要做对必须按布局注册并且覆盖所有非 Layout 页面，硬拆反而容易漏。
2. 编辑器拆包：`mavon-editor`（≈1 MB，进 vendor 后 gzip 约 100 KB）只在"写博文/编辑"页用。阅读页只需要渲染，把渲染换成 `markdown-it` + `highlight.js` 并把编辑器改成异步 chunk，估省 90 KB gz。
3. 换构建链：webpack 3 + uglify-js 2 在现代 Node 上要靠 `--openssl-legacy-provider` 才能跑，一次构建 6～10 分钟；`ExtractTextPlugin` 还会把所有异步 chunk 的 CSS 合成一个文件。升 webpack 5 或直接迁 Vite，上面两条才真正好落地，构建时间也能进一分钟。

---

## 四、工程与体验建议（未改）

- **免费 API 限流**：未绑 Token 每小时只有 60 次，实测把额度打满后博客列表直接 403。建议给 `/users/:name/gists`、`/users/:name` 加 localStorage + TTL 缓存（比如 5 分钟），并把 403 文案引导到"绑定 Token"。
- **分享按钮**：`document.execCommand('copy')` 已废弃，Chrome 仍能用但不保证；换 `navigator.clipboard.writeText` + 失败回退。
- **`verifyEmail` 正则没锚定**（`/^[0-9A-Za-z_]+@...\.[A-Za-z]+/`），`a@b.com<script>` 也能过；改成 `/...$/`。
- **首页串行请求**：`Init → GetInfo → 各列表` 一路串行，首屏白屏时间偏长；可以并行拉配置以外的接口，配骨架屏。
- **图片无懒加载、无尺寸声明**（`<img>` 直接给原图 URL），列表页滚动会抖。
- **没有任何测试**：`jest`、`nightwatch` 都在 devDependencies 里躺着，零测试用例。至少给 `util.js`、`api/gist.js` 的纯函数补几个单测。
- **依赖全过期**：`vue-cli 2.8.2`、`webpack 3.12`、`node-sass 4.x`（现代 Node 装不上）、`axios 0.17`。建议排期迁 Vue 3 + Vite，而不是继续给 webpack 3 打补丁。

---

## 五、怎么验证

```bash
# 1. 构建（Node 18+ 需要这一行，否则 webpack 3 的 md4 哈希会报错）
NODE_OPTIONS=--openssl-legacy-provider npm run build

# 2. 起个静态服务看产物
node tools/serve-dist.mjs dist 8094
# 打开 http://127.0.0.1:8094/

# 3. XSS 修复的断言
npm i --no-save jsdom dompurify
node tools/test-sanitize.mjs
```

本次实际验收（ego-browser 打开构建产物，服务端按 `gzip_static` 语义发 `.gz`）：

- 首屏渲染出"最新动态 / 社交圈 / 博客列表 / 开源项目 / 使用帮助"，作者信息（GitHub-Laziji）从 API 正常拉回；
- 标签页标题为 `标签页标题 - 最新动态`（`static/configuration.json` 里的 htmlTitle + 路由标题）；
- Element UI 正常注册：首页 `.el-button` × 7、`.el-menu` × 4、`.el-card` × 4；
- 访问不存在的路由（`/#/board`）落到 404 页并正常渲染；
- 首屏资源 = manifest + app + vendor + 当前路由 chunk，合计 404 KB（gzip）；
- `node tools/test-sanitize.mjs` 8 条断言全 PASS。

**没验证到的**：绑定 Token 后的写文章/编辑流程需要真实 GitHub 账号，本次只验证到"未绑定 Token"的只读路径；免费 API 限流后 gist 列表会 403，详情页正文没能实测（"先取 id 再请求"这个修复是纯粹的赋值顺序问题，逻辑上确定，绑 Token 后建议回归一次）。

---

## 六、改动文件

```
src/main.js                              $sanitize / $markdown 消毒
src/router/index.js                      路由懒加载
src/App.vue                              配置到位后再设标题；Init → GetInfo 顺序
src/utils/request.js                     Authorization 头 + 状态码分支提示
src/utils/notify.js                      (新增) 组件库未就绪时的提示降级
src/utils/util.js                        时区、全屏 API
src/api/gist.js                          文件名清洗
src/api/user.js                          verifyToken 走 header
src/store/modules/configuration.js       配置加载
src/store/modules/token.js               提示降级
src/views/blog/Details.vue               详情页先取 id 再请求 + 消毒
src/views/project/Details.vue            同上
src/views/new/Main.vue                   消毒
src/mobile_views/blog/Details.vue        同上
src/mobile_views/project/Details.vue     同上
config/index.js                          productionSourceMap=false, productionGzip=true
.gitignore                               tools/*.log 不入库
package.json                             +dompurify, +compression-webpack-plugin
tools/serve-dist.mjs                     (新增) 产物验收用的静态服务，有 .gz 时按 gzip_static 语义发压缩体
tools/test-sanitize.mjs                  (新增) XSS 消毒断言
```
