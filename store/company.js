import * as types from '~/assets/actions_types'
import apis from '~/assets/apis'

export const state =() => ({
    [types.COMPANY_LIST]: []
})

export const actions = {
    async [types.COMPANY_LIST] (context, params = {}) {
        const { data } = await apis.company_list(params)
        data.data.data.unshift({id: 0, title: '全部', created_at: '2020-01-01'})
        context.commit(types.COMPANY_LIST, data.data.data)
    }
}

export const mutations = {
    [types.COMPANY_LIST] (state, data) {
        state[types.COMPANY_LIST] = data
    }
}

export const getters = {
    [types.COMPANY_LIST] (state) {
        return state[types.COMPANY_LIST]
    }
}