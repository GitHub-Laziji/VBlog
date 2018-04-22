<template>
    <div style="min-height: 800px">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-form ref="form" :model="form" label-width="80px" :rules="ruleValidate">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="简要说明" prop="describe">
                    <el-input  v-model="form.describe" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="博客正文" prop="content">
                    <mavon-editor
                    v-model="form.content"
                    :subfield="false"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">发表</el-button>
                    <el-button @click="$router.push('/user/blog/main')">返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
       
    </div>
</template>
<script>
    export default{
        data(){
            return {
                form: {
                    title:"",
                    describe:"",
                    content:""
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { type: 'string', max: 32, message: '标题长度不大于32字符', trigger: 'change' }
                    ],
                    describe: [
                        { required: true, message: '请输入博客描述', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输博客入正文', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            onSubmit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style>
  
</style>