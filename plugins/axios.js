import utils from '~/assets/utils'
import { notification } from 'ant-design-vue'
export default ({ $axios, redirect, req }) => {
    let token
    if (process.client) {
        token = 'fed_token ' + utils.getClientCookie('fed_token')
    }
    if (process.server) {
      token = 'fed_token ' + utils.getServerCookie(req)
    }
    $axios.setHeader('Authorization', token)
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
