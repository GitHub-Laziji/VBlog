<template>
    <div>
        <el-dialog
        title="绑定Token"
        :visible.sync="show"
        width="500px">
            <el-form :model="tokenForm" ref="tokenForm" label-width="100px">
            <el-form-item
              prop="token"
              label="Token"
              :rules="[{ required: true, message: '请输入accessToken', trigger: 'blur' }]">
              <el-input v-model="tokenForm.token"></el-input>
            </el-form-item>
          </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
</el-dialog>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                show:false,
                handleClose:null,
                tokenForm:{
                    token:""
                }
            }
        },
        methods:{
            open(handleClose){
                this.handleClose=handleClose
                this.show=true
            },
            onSubmit(){
                this.$refs["tokenForm"].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch("Authentication", this.tokenForm.token)
                        if(typeof this.handleClose == "function"){
                            this.handleClose()
                        }
                        
                    }
                })
                this.show=false
            }
        }
    }
</script>