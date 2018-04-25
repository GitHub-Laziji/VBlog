<template>
    <div style="min-height: 800px">
        <el-card shadow="never">
            <div v-html="$markdown(text)"></div>
        </el-card>
       
    </div>
</template>
<script>
    export default{
        data(){
            return {
                text:"## 简介\n" +
                "\n" +
                "博客基于 GitHub Pages 与 Github API 实现无后台，可动态发布博客的系统\n" +
                "博客数据储存于gist 通过Github API 进行增删改查\n" +
                "\n" +
                "### 特点\n" +
                "\n" +
                "- [x] 基于 GitHub Pages 无需服务器\n" +
                "- [x] 改进传统 GitHub Pages 不能动态发布的缺陷\n" +
                "- [x] 使用vue单页面，体验较好\n" +
                "\n" +
                "### 演示地址\n" +
                "[https://github-laziji.github.io][1]\n" +
                "\n" +
                "### 快速开始\n" +
                "不想下载源码编译的同学 可以直接下载打包好的文件 [https://github.com/GitHub-Laziji/GitHub-Laziji.github.io][2]\n" +
                "\n" +
                "## 准备工作\n" +
                "\n" +
                "### 安装\n" +
                "\n" +
                "    npm install \n" +
                "\n" +
                "### 运行\n" +
                "\n" +
                "    npm run dev \n" +
                "\n" +
                "\n" +
                "### 构建\n" +
                "\n" +
                "    npm run build\n" +
                "\n" +
                "\n" +
                "### 获取Token\n" +
                "\n" +
                "在 *github > settings > Developer settings > Personal access tokens*  勾选gist权限 获取Token\n" +
                "\n" +
                "\n" +
                "------\n" +
                "\n" +
                "\n" +
                "作者 *Laziji*\n" +
                "\n" +
                "\n" +
                "\n" +
                "  [1]: https://github-laziji.github.io\n" +
                "  [2]: https://github.com/GitHub-Laziji/GitHub-Laziji.github.io"
            }
        }
    }
</script>

<style>
  
</style>