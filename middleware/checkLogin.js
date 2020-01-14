import utils from '~/assets/utils'
export default ({ route, $axios, req, redirect}) => {
    let token
    if (process.client) {
        token = utils.getClientCookie('fed_token')
    }
    if (process.server) {
        token = utils.getServerCookie(req)
    }
    if (route.path !== '/login') {
        $axios.setHeader('Authorization', 'fed_token ' + token)
    }
    if (!token && route.path !== '/login') {
        redirect('/login')
        return
    }
}
