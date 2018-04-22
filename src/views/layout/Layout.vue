<template>
    <div>
        <section class="page-header">
            <h1 class="project-name">LaZiji</h1>
            <h2 class="project-tagline">欢迎来到辣子鸡的个人博客.</h2>
            
            <a href="https://github.com/GitHub-Laziji" class="btn">GitHub主页</a>
            <a href="https://github.com/GitHub-Laziji/blog-vue" class="btn">博客源码</a> 
        </section>
        <section class="main-content" style="min-height: 800px">
            <el-row>
                <el-col :span="6" style="padding: 0px 20px 0px 20px">
                    <sidebar></sidebar>
                </el-col>
                <el-col :span="18" style="padding: 0px 20px 0px 20px">
                    <app-main></app-main>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <foot></foot>
                </el-col> 
            </el-row>
        </section>


       
    </div>
</template>
<script>
    import Sidebar from './components/Sidebar'
    import AppMain from './components/AppMain'
    import Foot from './components/Foot'
    export default{
        components: {
            Sidebar,
            AppMain,
            Foot
        },
        data(){
            return {

            }
        }
    }
</script>

<style>
    .page-header{
        padding: 5rem 6rem;
        color: #fff;
        text-align: center;
        background-color: #159957;
        background-image: linear-gradient(120deg, #155799, #159957);
    }
    .project-name {
        font-size: 3.25rem;
        margin-top: 0;
        margin-bottom: 0.1rem;
    }
    .project-tagline {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        font-weight: normal;
        opacity: 0.7;
    }
    .btn:hover {
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        background-color: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.3);
    }
    a:hover {
        text-decoration: underline;
    }
    a:active, a:hover {
        outline: 0;
    }
    .btn {
        padding: 0.75rem 1rem;
        display: inline-block;
        margin-bottom: 1rem;
        color: rgba(255,255,255,0.7);
        background-color: rgba(255,255,255,0.08);
        border-color: rgba(255,255,255,0.2);
        border-style: solid;
        border-width: 1px;
        border-radius: 0.3rem;
        transition: color 0.2s, background-color 0.2s, border-color 0.2s;
    }
    a {
        color: #1e6bb8;
        text-decoration: none;
    }
    .btn + .btn {
        margin-left: 1rem;
    }
    .main-content {
        max-width: 74rem;
        padding: 2rem 6rem;
        margin: 0 auto;
        font-size: 1.1rem;
        word-wrap: break-word;
    }

</style>