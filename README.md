# VBlog

![](https://img.shields.io/github/languages/top/github-laziji/VBlog.svg?style=flat)
![](https://img.shields.io/github/stars/gitHub-laziji/VBlog.svg?style=social)


## [English Documents](README-EN.md)

## 简介

博客可搭建在 GitHub Pages 上,
文章数据储存于gist 中, 通过Github API 与数据进行交互, 实现无后台、可动态发布文章的博客系统

## 使用的组件

- Element (电脑端)
- Vant (移动端)

## 项目截图

![博客截图](screenshots/201805152146.png)
![博客截图](screenshots/201805152147.png)
![博客截图](screenshots/201805111431.png)
![博客截图](screenshots/201805111438.png)

## 快速使用
搭建博客只需2步
- 点击github头像旁边的 "+" 号 选择 ```Import repository ```克隆地址填 ```https://github.com/GitHub-Laziji/GitHub-Laziji.github.io ```项目名填 ```你的用户名.github.io ```
- 克隆完成后 修改文件 ```/static/configuration.json``` 中的 ```githubUsername``` 为自己的github用户名


类似演示地址其中 GitHub-Laziji 为我的用户名


现在 ```https://你的用户名.github.io``` 就是你的个人博客

## 开发

#### 安装 运行 构建

    npm install

    npm run dev

    npm run build

#### 获取Token

在 ```github > settings > Developer settings > Personal access tokens```  勾选```gist``` 和 ```repo```权限 获取```Token```

#### 开发注意事项

- 配置文件读取的总是与 ```index.html``` 同级的 ```./static/configuration.json```, 所以本地 ```npm run dev``` 的时候会出现修改配置无效的情况, 如果需要修改的话修改本地的配置文件就行, 发布到 github 之后不影响, 因为修改配置的时候是通过 ```github-api``` 修改 ```你的用户名.github.io``` 下的 ```/static/configuration.json ```


## License

Code licensed under the [Mozilla](LICENSE).

------


作者 *Laziji*





  [1]: https://github-laziji.github.io
  [2]: https://github.com/GitHub-Laziji/GitHub-Laziji.github.io
