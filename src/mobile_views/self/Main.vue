<template>

    <div :style="'background: #f8f8f8;min-height: '+windowSize.height+'px'">
        <van-nav-bar style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -3px 10px #888888;width: 100%;" title="个人中心" />
        <div style="height: 60px;"></div>
        <van-row style="background: #ffffff;" class="mobile-border">
            <van-col span="8" style="padding: 10px 10px 5px 10px">
                <img :src="avatarUrl" style="margin-right: 10px;width:100px; height:100px; border-radius:5px; border: 1px solid #EBEEF5"
                />
            </van-col>
            <van-col span="16" style="padding: 10px 10px 0px 10px">
                <font style="color:#303133;font-size: 18px;line-height:33px;">{{githubUsername}}</font>
                <br>
                <font style="color:#606266;font-size: 13px;line-height:13px;">
                    <van-icon name="contact" />&emsp;{{name}}</font>
                <br>
                <font style="color:#606266;font-size: 13px;line-height:13px;">
                    <van-icon name="location" />&emsp;{{location}}</font>
                <br>
                <font style="color:#606266;font-size: 13px;line-height:13px;">粉丝&nbsp;{{followersTotal}}</font>&emsp;
                <font style="color:#606266;font-size: 13px;line-height:13px;">关注&nbsp;{{followingTotal}}</font>
            </van-col>
        </van-row>

        <van-cell class="mobile-border mobile-margin-top" title="　github.com/GitHub-Laziji" icon="sign" url="https://github.com/GitHub-Laziji"
            is-link />

        <van-cell class="mobile-border mobile-margin-top" title="　项目源码" icon="logistics" url="https://github.com/GitHub-Laziji/VBlog"
            is-link />

        <van-cell class="mobile-border mobile-margin-top" title="　其他博客" icon="password-view" :url="blog" is-link />

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                windowSize: this.$util.getWindowSize()
            }
        },
        computed: {
            ...mapGetters([
                'githubUsername',
                'avatarUrl',
                'name',
                'location',
                'blog',
                'followersTotal',
                'followingTotal'
            ])
        },
        mounted() {
            // this.$toast({
            //     message: '移动端开发中... 请在电脑上查看',
            //     duration: 5000
            // })
        },
        methods: {

        }
    }
</script>