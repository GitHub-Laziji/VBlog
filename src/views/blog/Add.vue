<template>
    <div style="min-height: 600px">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-form ref="form" :model="form" label-width="80px" :rules="ruleValidate">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="简要说明" prop="description">
                    <el-input v-model="form.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="博客正文" prop="content">
                    <mavon-editor @imgAdd="imgAdd" style="max-height: 500px" ref="md" v-model="form.content" :subfield="false" :toolbars="mavonEditorToolbars"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="submitButton.loading" :disabled="submitButton.disabled">发表</el-button>
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
                submitButton: {
                    loading: false,
                    disabled: false
                },
                mavonEditorToolbars: {
                    bold: true, // 粗体 
                    italic: true, // 斜体 
                    header: true, // 标题 
                    underline: true, // 下划线 
                    strikethrough: true, // 中划线 
                    mark: true, // 标记 
                    superscript: true, // 上角标 
                    subscript: true, // 下角标 
                    quote: true, // 引用 
                    ol: true, // 有序列表 
                    ul: true, // 无序列表 
                    link: true, // 链接 
                    imagelink: true, // 图片链接 
                    code: true, // code 
                    table: true, // 表格 
                    // fullscreen: true, // 全屏编辑 
                    // readmodel: true, // 沉浸式阅读 
                    htmlcode: true, // 展示html源码 
                    // help: true, // 帮助 /* 1.3.5 */ 
                    // undo: true, // 上一步 
                    // redo: true, // 下一步 
                    trash: true, // 清空 
                    // save: true, // 保存（触发events中的save事件） /* 1.4.2 */ 
                    // navigation: true, // 导航目录 /* 2.1.8 */ 
                    alignleft: true, // 左对齐 
                    aligncenter: true, // 居中 
                    alignright: true, // 右对齐 /* 2.2.1 */ 
                    // subfield: true, // 单双栏模式 
                    preview: true, // 预览
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
                        GistApi.create(this.form).then((response) => {
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