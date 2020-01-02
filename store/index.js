import * as types from '~/assets/actions_types'
import apis from '~/assets/apis'

export const state =() => ({
    [types.SKU_LIST]: [],
    [types.SKU_LIST]: []
})

export const actions = {
    async [types.SKU_LIST] (context, params = {}) {
        await context.dispatch(`company/${types.COMPANY_LIST}`)
        const companyList = context.state['company'][types.COMPANY_LIST]
        const { data } = await apis.sku_list(params)
        let sku_list = data.data.data
        let arr = []
        sku_list.map((sku, index) => {
            companyList.map(company => {
                if (sku.cid === company.id) {
                    arr.push({
                        key: index + 1,
                        insure_name: company.title,
                        id: sku.id,
                        cid: sku.cid,
                        uid: sku.uid,
                        url: sku.url,
                        title: sku.title,
                        sku_name: sku.sku_name,
                        config: sku.config,
                        scene_name: sku.scene_name,
                        created_at: sku.created_at
                    })
                }
            })
        })
        context.commit(types.SKU_LIST, arr)
    },
    async [types.SKU_ADD] (context, params) {
        const { data } = await apis.sku_add(params)
        context.commit(types.SKU_ADD, data.data.data)
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
