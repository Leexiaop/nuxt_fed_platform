import Cookies from 'js-cookie'
export default {
    //  截流函数
    throttle: (fn, interval = 500) => {
        let timer = null;
        let firstTime = true;
        return function (...args) {
            if (firstTime) {
                fn.apply(this, args)
                return firstTime = false;
            }
            if (timer) {
                return
            }
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
                fn.apply(this, args)
            }, interval)
        };
    },
    //  客户端获取cookie
    getClientCookie: (key) => {
        return Cookies.get(key) ? Cookies.get(key) : ''
    },
    //  服务端获取cookie
    getServerCookie: (req) => {
        return req.headers && req.headers.cookie &&req.headers.cookie.split('=')[1] || ''
    }
}
