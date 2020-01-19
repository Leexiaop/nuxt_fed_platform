import { notification } from 'ant-design-vue'
import utils from '~/assets/utils'
export default ({route, $axios, redirect, req }) => {
    let token
    if (process.client) {
        token = utils.getClientCookie('fed_token')
    }
    if (process.server) {
        token = utils.getServerCookie(req)
    }
    if (!token && route.path !== '/login') {
        redirect('/login')
        return
    }
    $axios.onResponse(response => {
        const { code } = response.data
        if (code === 401) {
            notification.error({
                message: '提示',
                description: '用户名或者密码错误，请重新登录。。。'
            })
            redirect('/login')
            return
        }
        return response.data
    })
}
