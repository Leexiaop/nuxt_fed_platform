import * as types from '~/assets/actions_types'
import apis from '~/assets/apis'

export const state = () => ({
    [types.LOGIN]: []
})

export const actions = {
    async [types.LOGIN] (context, params) {
        const { data } = await apis.login(params)
        context.commit(types.LOGIN, data.data.data)
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