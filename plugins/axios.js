import { notification } from 'ant-design-vue'
export default ({$axios, redirect }) => {
    $axios.onResponse(response => {
        const { code } = response.data
        if (code === 401) {
            notification.error({
                message: '提示',
                description: '用户名或者密码错误，请重新登录。。。'
            })
            redirect('/login')
        }
        return response.data
    })
}
