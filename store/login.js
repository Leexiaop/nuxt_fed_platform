import * as types from '~/assets/actions_types'
import urls from '~/assets/urls'
import Cookies from 'js-cookie'
export const state = () => ({
    [types.LOGIN]: ''
})

export const actions = {
    async [types.LOGIN] (context, params) {
        const data = await this.$axios.$post(urls.login, params)
        Cookies.set('fed_token', data.token)                               
        context.commit(types.LOGIN, data.token)
    }
}
export const mutations = {
    [types.LOGIN] (state, data) {
        state[types.LOGIN] = data
    }
}
export const getters = {
    [types.LOGIN] (state) {
        return state[types.LOGIN]
    }
}