<template>
    <div>
        <el-card shadow="never" style="min-height: 600px;margin-bottom: 20px;">
            <el-collapse v-model="active" accordion>
                <el-collapse-item title="如何部署" name="deploy">
                    <el-carousel trigger="click" height="352px" :autoplay="false" @change="deployChange">
                        <el-carousel-item v-for="(item,index) in deploy.images" :key="'deploy'+index">
                            <div style="border-radius:5px; border: 1px solid #EBEEF5;height: 350px;">
                                <img :src="item" style="width: 100%;height:350px;">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <el-steps :active="deploy.active" align-center style="margin-top: 20px;" :process-status="deploy.status">
                        <el-step title="克隆项目" description="https://github.com/GitHub-Laziji/GitHub-Laziji.github.io"></el-step>
                        <el-step title="修改配置" description="将 /static/configuration.json 中的 githubUsername  改为自己的"></el-step>
                        <el-step title="查看效果" description="https://用户名.github.io 就是你的博客了"></el-step>
                    </el-steps>
                </el-collapse-item>
                <el-collapse-item title="如何使用" name="use">
                    <el-carousel trigger="click" height="352px" :autoplay="false" @change="useChange">
                        <el-carousel-item v-for="(item,index) in use.images" :key="'use'+index">
                            <div style="border-radius:5px; border: 1px solid #EBEEF5;height: 350px;">
                                <img :src="item" style="width: 100%;height:350px;">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <el-steps :active="use.active" align-center style="margin-top: 20px;" :process-status="use.status">
                        <el-step title="获取Token" description="在GitHub上获取调用API所需的Token"></el-step>
                        <el-step title="登录" description="将获取的Token绑定上"></el-step>
                        <el-step title="发个博客" description="点击博客列表右上角的发布博文按钮"></el-step>
                    </el-steps>
                </el-collapse-item>
                <el-collapse-item title="开发注意事项" name="develop">
                    <div style="padding: 10px;line-height: 30px;color: #303133;font-size: 16px">
                        配置文件读取的总是与
                        <tt>index.html</tt> 同级的
                        <tt>./static/configuration.json</tt> , 而修改配置的时候是通过
                        <tt>github-api</tt> 修改
                        <tt>你的用户名.github.io</tt> 下的
                        <tt>/static/configuration.json</tt>, 所以本地
                        <tt>npm run dev</tt> 的时候会出现修改配置无效的情况, 如果需要修改的话修改本地的配置文件就行, 发布到
                        <tt>github</tt> 之后不影响</div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                active: "deploy",
                deploy: {
                    images: [
                        require('../../assets/deploy0.png'),
                        require('../../assets/deploy1.png'),
                        require('../../assets/deploy2.png')
                    ],
                    status: "process",
                    active: 0,
                },
                use: {
                    images: [
                        require('../../assets/use0.png'),
                        require('../../assets/use1.png'),
                        require('../../assets/use2.png')
                    ],
                    status: "process",
                    active: 0,
                }
            }
        },
        mounted() {

        },
        methods: {
            deployChange(index) {
                this.deploy.status = index == 2 ? "success" : "process"
                this.deploy.active = index
            },
            useChange(index) {
                this.use.status = index == 2 ? "success" : "process"
                this.use.active = index
            }
        }
    }
</script>