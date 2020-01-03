import Cookie from 'js-cookie'
import * as types from '~/assets/actions_types'
export default async ({route, store, req, redirect}) => {
    let token
    if (process.client) {
        token = Cookie.get('token') ? Cookie.get('token') : ''
    }
    if (process.server) {
        token = req.headers && req.headers.cookie &&req.headers.cookie.split('=')[1] || ''
    }
    if (!token && route.name !== 'login') {
        redirect('/login')
    } else {
        await store.dispatch(`login/${types.CHECK_LOGIN}`)
        let data = store.getters[`login/${types.CHECK_LOGIN}`]
        if (!data) {
            Cookie.remove('token', {path: ''})
            redirect('/login')
        }
    }
}
