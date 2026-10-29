import axios from 'axios'
import notifyMessage from './notify'
import store from '../store/index'


const service = axios.create({
    baseURL: "https://api.github.com",
    timeout: 15000,
    headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    }
})

service.interceptors.request.use(
    config => {
        let token = store.state.token.token
        if (token) {
            // GitHub 已不再支持 access_token 查询参数（2021 年起逐步移除），
            // 统一走 Authorization 头，避免 token 出现在 URL/日志/代理记录里。
            config.headers = config.headers || {}
            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
    error => Promise.reject(error)
)


service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // 局部变量不能叫 message：会遮蔽上面 import 进来的 notifyMessage 同名概念，
        // 之前这里写成 message({...}) 等于在调用字符串，401/403/404 全部抛 TypeError。
        let text
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    text = "Token 无效或已过期，请重新绑定"
                    break
                case 403:
                    text = "请求被 GitHub 拒绝，可能触发了访问频率限制（未绑定 Token 时每小时仅 60 次）"
                    break
                case 404:
                    text = "资源不存在"
                    break
                default:
                    text = (error.response.data && error.response.data.message) || ("请求失败: " + error.response.status)
                    break
            }
        } else {
            // 网络错误/超时/被拦截时 error.response 为空，原代码会在这里抛 TypeError
            text = "网络请求失败，请检查网络连接"
        }
        notifyMessage({
            message: text,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default service
