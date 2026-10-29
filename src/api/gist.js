import request from '@/utils/request'
import store from '../store/index'

// gist 的文件名直接来自文章标题，标题里带 / 或 \ 时 GitHub 会返回 422，
// 发文章就失败。这里做一次兜底清洗（只替换非法字符，不改扩展名，兼容老数据）。
function safeFileName(title) {
    let name = (title || "").trim().replace(/[\/\\]/g, "-")
    if (!name) {
        name = "untitled"
    }
    return name.slice(0, 200)
}

export default {
    list: function (query) {
        let githubUsername = store.state.configuration.githubUsername
        return request({
            url: `/users/${githubUsername}/gists?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    single: function (id) {
        return request({
            url: '/gists/' + id
        })
    },
    create: function (form) {
        let files = {}
        files[safeFileName(form.title)] = { content: form.content }
        return request({
            url: '/gists',
            method: 'post',
            data: {
                "description": form.description,
                "public": true,
                "files": files
            }
        })
    },
    edit: function (form) {
        let files = {}
        // 改了标题的话，原文件名要显式置 null 删掉，否则 gist 里会多出一个旧文件
        if (form.originalTitle && form.originalTitle !== form.title) {
            files[form.originalTitle] = null
        }
        files[safeFileName(form.title)] = { content: form.content }
        return request({
            url: '/gists/' + form.id,
            method: 'PATCH',
            data: {
                "description": form.description,
                "public": true,
                "files": files
            }
        })
    },
    delete: function (id) {
        return request({
            url: '/gists/' + id,
            method: 'DELETE',
        })
    },
}
