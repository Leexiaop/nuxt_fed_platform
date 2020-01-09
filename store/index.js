import * as types from '~/assets/actions_types'
import urls from '~/assets/urls'
export const state =() => ({
    [types.SKU_LIST]: []
})

export const actions = {
    async [types.SKU_LIST] (context, params = {}) {
        const { list } = await this.$axios.$get(urls.sku_list)
        context.commit(types.SKU_LIST, list)
    },
    async [types.SKU_ADD] (context, params) {
        const { data } = await apis.sku_add(params)
        context.commit(types.SKU_ADD, data.data)
    }
}

export const mutations = {
    [types.SKU_LIST] (state, data) {
        state[types.SKU_LIST] = data
    },
    [types.SKU_ADD] (state, data) {
        state[types.SKU_ADD] = data
    }
}

export const getters = {
    [types.SKU_LIST] (state) {
        return state[types.SKU_LIST]
    },
    [types.SKU_ADD] (state) {
        return state[types.SKU_ADD]
    }
}
