import Cookies from 'js-cookie'

export default {
    setAttribute(key, value, time) {
        if (time) {
            return Cookies.set(key, value, { expires: time })
        }
        return Cookies.set(key, value)
    },
    getAttribute(key) {
        return Cookies.get(key)
    },
    remove(key) {
        return Cookies.remove(key)
    }
}