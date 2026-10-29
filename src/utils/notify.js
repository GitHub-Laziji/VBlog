import Vue from 'vue'

// Element UI / Vant 改成按布局懒加载后，登录、刷新 token 这类早期流程可能发生在
// 布局挂载之前，此时 Vue.prototype.$message / $notify 还不存在。这里做一层降级：
// 有组件库就正常弹提示，没有就退回 console，不能因为提示组件没加载而打断业务流程。
export function message(option) {
    if (typeof Vue.prototype.$message === 'function') {
        Vue.prototype.$message(option)
    } else {
        console.error('[message]', option && option.message)
    }
}

export function notify(option) {
    if (typeof Vue.prototype.$notify === 'function') {
        Vue.prototype.$notify(option)
    } else {
        console.error('[notify]', option && option.message)
    }
}

export default message
