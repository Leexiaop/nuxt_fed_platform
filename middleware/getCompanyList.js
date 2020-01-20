import * as types from '~/assets/actions_types'
export default ({ store }) => {
    store.dispatch(`company/${types.COMPANY_LIST}`)
}
