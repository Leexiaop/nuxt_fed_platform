import * as types from '~/assets/actions_types'
import urls from '~/assets/urls'

export const state = () => ({
    [types.COMPANY_LIST]: []
})

export const actions = {
    async [types.COMPANY_LIST](context, params = {}) {
        const { list } = await this.$axios.$get(urls.company_list, { params: params })
        context.commit(types.COMPANY_LIST, list)
    }
}

export const mutations = {
    [types.COMPANY_LIST](state, data) {
        state[types.COMPANY_LIST] = data
    }
}

export const getters = {
    [types.COMPANY_LIST](state) {
        return state[types.COMPANY_LIST]
    }
}
