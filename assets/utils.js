import Cookies from 'js-cookie'
export default {
    //  截流函数
    throttle: (fn, delay = 500) => {
        var timer
        return function() {
            var th = this
            var args = arguments
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                timer = null
                fn.apply(th, args)
            }, delay)
        }
    },
    //  客户端获取cookie
    getClientCookie: key => {
        return Cookies.get(key) ? Cookies.get(key) : ''
    },
    //  服务端获取cookie
    getServerCookie: req => {
        return (req.headers && req.headers.cookie && req.headers.cookie.split('=')[1]) || ''
    }
}
