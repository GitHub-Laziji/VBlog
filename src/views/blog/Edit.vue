<template>
    <div style="min-height: 800px">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-form ref="form" :model="form" label-width="80px" :rules="ruleValidate">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="简要说明" prop="description">
                    <el-input  v-model="form.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="博客正文" prop="content">
                    <mavon-editor
                    v-model="form.content"
                    :subfield="false"/>
                </el-form-item>
                <el-form-item>
                    <el-button 
                    type="primary" 
                    @click="onSubmit" 
                    :loading="submitButton.loading"
                    :disabled="submitButton.disabled">发表</el-button>
                    <el-button @click="$router.push('/user/blog/main')">返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <token-dialog ref="tokenDialog"></token-dialog>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import TokenDialog from '@/views/common/TokenDialog'
    import GistApi from '@/api/gist'
    export default{
        components: {
            TokenDialog
        },
        data(){
            return {
                form: {
                    title:"",
                    description:"",
                    content:""
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { type: 'string', max: 32, message: '标题长度不大于32字符', trigger: 'change' }
                    ],
                    description: [
                        { required: true, message: '请输入博客描述', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输博客入正文', trigger: 'blur' }
                    ],
                },
                submitButton:{
                    loading:false,
                    disabled:false
                }
            }
        },
        computed: {
            ...mapGetters([
                'token',
            ])
        },
        methods:{
            onSubmit(){
                if(this.token){
                    this.publish()
                }else{
                    this.$refs.tokenDialog.open(()=>{
                        this.publish()
                    })
                }
            },
            publish(){   
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitButton.loading=true
                        this.submitButton.disabled=true
                        GistApi.create(this.form).then((result)=>{
                            console.log(JSON.stringify(result))
                            this.$message({
                                message: '发表成功',
                                type: 'success'
                            })
                        }).then(()=>{
                            this.submitButton.loading=false
                            this.submitButton.disabled=false
                        })
                    }
                })
            }
        }
    }
</script>

<style>
  
</style>