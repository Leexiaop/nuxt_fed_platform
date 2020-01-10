import * as types from '~/assets/actions_types'
import urls from '~/assets/urls'
export const state =() => ({
    [types.SKU_LIST]: []
})

export const actions = {
    async [types.SKU_LIST] (context, params = {}) {
        await context.dispatch(`company/${types.COMPANY_LIST}`)
        let sku = await this.$axios.$get(urls.sku_list, { params: params})
        const { list } = await this.$axios.$get(urls.company_list)
        sku.list.map((sku, index) => {
            list.map(company => {
                if (sku.cid === company.id) {
                    sku.insure_name = company.title
                }
                sku.key = (index + 1)
            })
        })
        context.commit(types.SKU_LIST, sku)
    },
    async [types.SKU_ADD] (context, params) {
        const { data } = await this.$axios.$post(urls.sku_add, params)
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
