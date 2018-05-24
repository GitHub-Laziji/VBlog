<template>
    <div v-loading="loading">
        <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <span>{{githubUsername}}</span>
                <el-button @click="$router.go(-1)" style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-left">返回</el-button>
            </div>
            <el-row>
                <el-col :span="9" style="padding: 0px 10px 20px 0px">
                    <img :src="avatarUrl" style="width: 100%;border-radius:5px;">
                    <div style="padding: 10px">
                        <font style="font-size: 26px;line-height: 40px;font-weight: 600">{{name}}
                            <br>
                        </font>
                        <font style="font-size: 20px;font-style: normal;font-weight: 300;line-height: 35px;color: #666;">{{githubUsername}}
                            <br>
                        </font>
                        <font style="font-size: 14px;line-height: 20px;color:#606266;" v-if="location">
                            <i class="el-icon-location-outline"></i>&nbsp;&nbsp;{{location}}
                            <br>
                        </font>
                        <font style="font-size: 14px;line-height: 20px;color:#606266;" v-if="email">
                            <i class="el-icon-message"></i>&nbsp;&nbsp;{{email}}
                            <br>
                        </font>
                        <font style="font-size: 14px;color:#606266;" v-if="blog">
                            <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                            <a :href="$util.addHttp(blog)" target="_blank">{{blog}}</a>
                            <br>
                        </font>
                    </div>

                </el-col>
                <el-col :span="15" style="padding: 0px 20px 20px 10px">
                    <div style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 10px;font-size: 16px;
                    color: #6a737d;" v-if="bio">
                        {{bio}}
                    </div>
                    <div style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 30px;text-align: center;
                    font-size: 30px;color:#dddddd" v-else>
                        <b>◔ ‸◔？没有简介</b>
                    </div>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>
<script>
    import UserApi from '@/api/user'
    export default {
        data() {
            return {
                loading: false,
                githubUsername: this.$route.params.name,
                name: null,
                avatarUrl: null,
                htmlUrl: null,
                blog: null,
                location: null,
                email: null,
                bio: null,
                followers: null,
                following: null,
                publicRepos: null
            }
        },
        mounted() {
            this.loading = true
            UserApi.info(this.githubUsername).then((response) => {
                let result = response.data
                this.name = result["name"]
                this.avatarUrl = result["avatar_url"]
                this.htmlUrl = result["html_url"]
                this.blog = result["blog"]
                this.location = result["location"]
                this.bio = result["bio"]
                this.email = result["email"]
                this.followers = result["followers"]
                this.following = result["following"]
                this.publicRepos = result["publicRepos"]
            }).then(() => this.loading = false)
        },
        methods: {

        }
    }
</script>