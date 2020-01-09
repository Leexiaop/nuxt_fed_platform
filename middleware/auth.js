import utils from '~/assets/utils'
import axios from 'axios'
export default ({route, req, res, redirect}) => {
    let token
    if (process.client) {
        token = utils.getClientCookie('fed_token')
    }
    if (process.server) {
        token = utils.getServerCookie(req)
    }
    if (!token && route.path !== '/login') {
        redirect('/login')
    }
    if (token) {
        axios.defaults.headers['Authorization'] = "fed_token " + token
    }
}
