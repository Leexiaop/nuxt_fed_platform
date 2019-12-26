import * as types from '~/assets/actions_types'
import apis from '~/assets/apis'

export const state =() => ({
    [types.SKU_LIST]: []
})

export const actions = {
    async [types.SKU_LIST] (context, params = {}) {
        const { data } = await apis.sku_list(params)
        context.commit(types.SKU_LIST, data.data.data)
    }
}

export const mutations = {
    [types.SKU_LIST] (state, data) {
        state[types.SKU_LIST] = data
    }
}

export const getters = {
    [types.SKU_LIST] (state) {
        return state[types.SKU_LIST]
    }
}