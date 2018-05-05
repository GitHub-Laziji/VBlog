<template>
    <div style="min-height: 800px" v-loading="loading">
        <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
            <el-form :model="configure" :rules="rules" ref="configureForm" label-width="100px">
                <el-form-item label="用户名" prop="githubUsername">
                    <el-input v-model="configure.githubUsername" disabled></el-input>
                </el-form-item>
                <el-form-item label="博客标题" prop="blogTitle">
                    <el-input v-model="configure.blogTitle" :placeholder="configure.githubUsername"></el-input>
                </el-form-item>
                <el-form-item label="博客描述" prop="blogDescribe" >
                    <el-input v-model="configure.blogDescribe" :placeholder="'欢迎来到'+configure.githubUsername+'的个人博客。'"></el-input>
                </el-form-item>
                <el-form-item label="页面标题" prop="htmlTitle">
                    <el-input v-model="configure.htmlTitle"  :placeholder="configure.githubUsername+'的博客'"></el-input>
                </el-form-item>
                <el-form-item label="文字颜色">
                    <el-color-picker v-model="configure.fontColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="使用背景图" >
                    <el-switch
                    v-model="configure.useBackgroundImage"></el-switch>
                </el-form-item>
                <div v-if="!configure.useBackgroundImage">
                    <el-row>
                        <el-col :span="3">
                            <el-form-item label="背景颜色">
                                <el-color-picker v-model="configure.backgroundColorLeft"></el-color-picker>
                            </el-form-item>
                        </el-col>
                        <el-col  :span="21">
                            <el-form-item >
                                <el-color-picker v-model="configure.backgroundColorRight"></el-color-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-form-item label="效果" prop="htmlTitle">
                        <div :style="'background-image: linear-gradient(120deg, '+configure.backgroundColorLeft+', '+configure.backgroundColorRight+');border-radius: 5px;border: 1px solid #F2F6FC;width:300px;height:100px;'">
                            <div :style="'color: '+configure.fontColor+';text-align: center;padding-top:25px;font-size:35px'">
                                <b>标题</b>
                            </div>
                        </div>
                    </el-form-item>
                </div>
                <div v-if="configure.useBackgroundImage">
                    <el-form-item label="背景图片">
                        <el-upload
                        action=""
                        :auto-upload="false"
                        drag>
                            <i class="el-icon-upload"></i>
                            <div>将文件拖到此处&nbsp;(暂不支持上传图片)</div>
                        </el-upload>   
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button 
                    @click="submit"
                    :loading="submitButton.loading"
                    :disabled="submitButton.disabled"
                    type="primary">修改配置</el-button>
                    <el-button @click="reset">还原</el-button>
                  </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import ProjectApi from '@/api/project'
    export default{
        data(){
            return{
                loading:false,
                configureSha:null,
                configure:{},
                initConfigure:{},
                rules: {
                    githubUsername: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    blogTitle: [
                        // { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    blogTitle: [
                        // { required: true, message: '请输入用户名', trigger: 'blur' },
                    ]
                },
                submitButton:{
                    loading:false,
                    disabled:false
                },
            }
        },
        mounted(){
            this.loading=true
            ProjectApi.getBlogConfigure().then((response)=>{
                let result = response.data
                let base64 = require('js-base64').Base64
                let text=base64.decode(result.content)
                this.configure = JSON.parse(text)
                this.initConfigure = JSON.parse(text)
                this.configureSha = result.sha
            }).then(()=>this.loading=false)
        },
        methods:{
            submit(){
                this.$refs['configureForm'].validate((valid) => {
                    if (valid) {
                        this.submitButton.loading=true
                        this.submitButton.disabled=true
                        ProjectApi.editBlogConfigure(this.configure,this.configureSha).then((response)=>{
                            let result = response.data
                            this.configureSha = result.content.sha
                            this.initConfigure = JSON.parse(JSON.stringify(this.configure))
                            this.$store.dispatch("LocalReload",this.configure)
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                        }).then(()=>{
                            this.submitButton.loading=false
                            this.submitButton.disabled=false
                        })
                    }
                })
            },
            reset(){
                this.configure = JSON.parse(JSON.stringify(this.initConfigure))
            }
        }
    }
</script>