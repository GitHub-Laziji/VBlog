import Cookie from '@/utils/cookie'
import UserApi from '@/api/user'
import store from '../index'
import Vue from 'vue'
import message, { notify } from '@/utils/notify'

const TOKEN_KEY = "TOKEN_KEY"
const token = {
    state: {
        token: Cookie.getAttribute(TOKEN_KEY)
    },

    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value
            Cookie.setAttribute(TOKEN_KEY, value, 30)
        },
        REMOVE_TOKEN: (state) => {
            state.token = null
            Cookie.remove(TOKEN_KEY)
        }
    },

    actions: {
        Authentication({ commit }, accessToken) {
            UserApi.verifyToken(accessToken).then((response) => {
                let result = response.data
                let githubUsername = store.state.configuration.githubUsername
                if (githubUsername == result['login']) {
                    commit('SET_TOKEN', accessToken)
                    notify({
                        title: '成功',
                        message: 'Token绑定成功',
                        type: 'success'
                    })
                    // message({
                    //     message: 'Token绑定成功',
                    //     type: 'success'
                    // })
                } else {
                    message({
                        message: 'Token用户不一致',
                        type: 'error'
                    })
                }
            }).catch((err) => {
                // 原来这里是空的 catch：校验 token 一失败（网络错误、接口 500 等）
                // 界面上什么都不显示，用户以为点绑定没反应。至少留痕，方便排查。
                console.error('[token] 绑定校验失败', err)
                message({
                    message: 'Token 绑定失败，请稍后重试',
                    type: 'error'
                })
            })
        },
        Cancellation({ commit }) {
            commit('REMOVE_TOKEN')
            message({
                message: 'Token取消绑定',
                type: 'info'
            })
        },
    }
}

export default token