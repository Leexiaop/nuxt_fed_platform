import * as types from '~/assets/actions_types'
import urls from '~/assets/urls'
export const state =() => ({
    [types.SKU_LIST]: []
})

export const actions = {
    async [types.SKU_LIST] (context, params = {}) {
        await context.dispatch(`company/${types.COMPANY_LIST}`)
        let sku = await this.$axios.$get(urls.sku_list, { params: params})
        const list = await context.getters[`company/${types.COMPANY_LIST}`]
        for (let i = 0; i < sku.list.length; i++) {
            let obj = sku.list[i]
            obj.key = i + 1
            for (let n = 0; n < list.length; n++) {
                let item = list[n]
                if (obj.cid === item.id) {
                    obj.insure_name = item.title
                }
            }
        }
        context.commit(types.SKU_LIST, sku)
    },
    async [types.SKU_ADD] (context, params) {
        const data = await this.$axios.$post(urls.sku_add, params)
        context.commit(types.SKU_ADD, data)
    },
    async [types.SKU_UPDATE] (context, params) {
        const data = await this.$axios.$put(urls.sku_update, params)
        context.commit(type.SKU_UPDATE, data)
    },
    async [types.SKU_DELETE] (context, params) {
        const data = await this.$axios.$delete(urls.sku_delete, { params: params })
        context.commit(types.SKU_DELETE, data)
    }
}

export const mutations = {
    [types.SKU_LIST] (state, data) {
        state[types.SKU_LIST] = data
    },
    [types.SKU_ADD] (state, data) {
        state[types.SKU_ADD] = data
    },
    [types.SKU_UPDATE] (state, data) {
        state[types.SKU_UPDATE] = data
    },
    [types.SKU_DELETE] (state, data) {
        state[types.SKU_DELETE] = data
    }
}

export const getters = {
    [types.SKU_LIST] (state) {
        return state[types.SKU_LIST]
    },
    [types.SKU_ADD] (state) {
        return state[types.SKU_ADD]
    },
    [types.SKU_UPDATE] (state) {
        return state[types.SKU_UPDATE]
    },
    [types.SKU_DELETE] (state, data) {
        return state[types.SKU_DELETE]
    }
}
