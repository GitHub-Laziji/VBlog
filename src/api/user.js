import request from '@/utils/request'
import store from '../store/index'

export default {
    verifyToken: function (token) {
        return request({
            url: '/user?access_token=' + token
        })
    },
    getInfo: function () {
        let githubUsername = store.state.configuration.githubUsername
        return request({
            url: '/users/' + githubUsername
        })
    },
    followers: function (query) {
        let githubUsername = store.state.configuration.githubUsername
        return request({
            url: `/users/${githubUsername}/followers?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    following: function (query) {
        let githubUsername = store.state.configuration.githubUsername
        return request({
            url: `/users/${githubUsername}/following?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    info:function (githubUsername) {
        return request({
            url: `/users/${githubUsername}`
        })
    },
}