<template>
    <div style="min-height: 600px" v-loading="loading">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-form ref="form" :model="form" label-width="80px" :rules="ruleValidate">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="简要说明" prop="description">
                    <el-input v-model="form.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="博客正文" prop="content">
                    <mavon-editor @imgAdd="imgAdd" style="max-height: 500px" ref="md" v-model="form.content" :subfield="false" :toolbars="mavonEditorToolbars"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="submitButton.loading" :disabled="submitButton.disabled">修改</el-button>
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
    export default {
        components: {
            TokenDialog
        },
        data() {
            return {
                form: {
                    id: "",
                    title: "",
                    description: "",
                    content: ""
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
                loading: true,
                submitButton: {
                    loading: false,
                    disabled: false
                },
                mavonEditorToolbars: {
                    bold: true,
                    italic: true,
                    header: true,
                    underline: true,
                    strikethrough: true,
                    mark: true,
                    superscript: true,
                    subscript: true,
                    quote: true,
                    ol: true,
                    ul: true,
                    link: true,
                    imagelink: true,
                    code: true,
                    table: true,
                    htmlcode: true,
                    trash: true,
                    alignleft: true,
                    aligncenter: true,
                    alignright: true,
                    preview: true,
                },
            }
        },
        computed: {
            ...mapGetters([
                'token',
            ])
        },
        mounted() {
            if (!this.token) {
                this.$nextTick(() => {
                    this.$message({
                        message: '权限不足',
                        type: 'error'
                    })
                    this.$router.go(-1)
                })
                return
            }
            this.loading = true
            this.form.id = this.$route.params.id
            GistApi.single(this.form.id).then((response) => {
                let result = response.data
                for (let key in result.files) {
                    this.form['title'] = key
                    this.form['content'] = result.files[key]['content']
                    this.form['description'] = result['description']
                    break
                }
            }).then(() => this.loading = false)
        },
        methods: {
            imgAdd(pos, file) {
                this.$refs.md.$img2Url(pos, file.miniurl)
            },
            onSubmit() {
                if (this.token) {
                    this.publish()
                } else {
                    this.$refs.tokenDialog.open(() => {
                        this.publish()
                    })
                }
            },
            publish() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitButton.loading = true
                        this.submitButton.disabled = true
                        GistApi.edit(this.form).then((response) => {
                            let result = response.data
                            // console.log(JSON.stringify(result))
                            this.$message({
                                message: '发表成功',
                                type: 'success'
                            })
                            this.$router.push("/user/blog/details/" + result.id)
                        }).then(() => {
                            this.submitButton.loading = false
                            this.submitButton.disabled = false
                        })
                    }
                })
            }
        }
    }
</script>

<style>
</style>