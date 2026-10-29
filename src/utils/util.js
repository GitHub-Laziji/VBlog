export default {
    cutStr(str, len) {
        try {
            if (str.length > len) {
                return str.substring(0, len) + '...'
            }
            return str
        } catch (e) {
            return ""
        }
    },
    verifyEmail(str) {
        if (str == null || str == undefined) {
            return false
        }
        let reg = /^[0-9A-Za-z_]+@[0-9A-Za-z]+\.[A-Za-z]+/
        return reg.test(str)
    },
    //yyyy-MM-ddThh-mm-ss.*
    // 原实现手动 +8 小时把时区写死，非东八区用户看到的发布时间全是错的；
    // 改成交给 Date 按访问者本地时区格式化。
    utcToLocal(time) {
        if (!time) {
            return ""
        }
        let date = new Date(time)
        if (isNaN(date.getTime())) {
            return time
        }
        let formatNum = (num)=>{
            return num>=10?num:('0'+num)
        }
        return formatNum(date.getFullYear()) + "-"
            + formatNum((date.getMonth() + 1)) + "-"
            + formatNum(date.getDate()) + " "
            + formatNum(date.getHours()) + ":"
            + formatNum(date.getMinutes()) + ":"
            + formatNum(date.getSeconds())
    },
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    },
    //s<=r<e
    randomInt(s, e) {
        let d = e - s
        if (d < 0) {
            return s
        }
        let r = Math.random() * d + s
        r = parseInt(r, 10)
        return r
    },
    fullScreen() {
        let element = document.documentElement
        // 标准 API 是 requestFullscreen（小写 s）。原代码写 requestFullScreen，
        // 现代浏览器永远命中不了，只能靠 webkit 兼容分支碰运气；IE 的 ActiveX
        // 分支已随 IE 退役，直接删掉。
        if (element.requestFullscreen) {
            element.requestFullscreen().catch(() => {})
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
        }
    },
    fullExit() {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {})
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    },

    parseHeaders(headers) {
        try {
            let linkArr = headers['link'].split(",")
            for (let i = 0; i < linkArr.length; i++) {
                let temp = linkArr[i]
                if (temp.indexOf("rel=\"last\"") < 0) {
                    continue
                }
                let paramArr = temp.split(/[\?&]/)
                for (let j = 0; j < paramArr.length; j++) {
                    let stemp = paramArr[j]
                    let kv = stemp.split("=")
                    if (kv[0] != "page") {
                        continue
                    }
                    return parseInt(kv[1])
                }
            }
        } catch (e) {

        }

        return 0
    },
    copy(message) {
        let doc = document.createElement("input")
        doc.value = message
        document.body.appendChild(doc)
        doc.select()
        let status
        try {
            status = document.execCommand('copy')
        } catch (e) { }
        document.body.removeChild(doc)
        return status
    },
    formatTime(time) {
        let it = parseInt(time)
        let m = parseInt(it / 60)
        let s = parseInt(it % 60)

        return (m < 10 ? "0" : "") + parseInt(it / 60) + ":" + (s < 10 ? "0" : "") + parseInt(it % 60)
    },
    getWindowSize() {
        let windowSize = {}
        // 原来写的是 innerWeight（拼写错误），永远取不到真实视口尺寸
        windowSize.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        windowSize.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        return windowSize
    },
    addHttp(url){
        return (url.match(/https?:\/\//i)?'':'https://') + url
    }

}