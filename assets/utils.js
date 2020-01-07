//  函数截流
export default {
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
    getClientCookie: (key) => {
        return Cookie.get(key) ? Cookie.get(key) : ''
    },
    getServerCookie: (req) => {
        return req.headers && req.headers.cookie &&req.headers.cookie.split('=')[1] || ''
    }
}
