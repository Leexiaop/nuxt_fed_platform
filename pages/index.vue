<template>
    <div class="sku">
        <div v-for="(sku, index) in sku_list" :key="index">{{sku.url + index}}</div>
    </div>
</template>
<script>
import * as types from '~/assets/actions_types'

export default {
    data () {
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
                width: '20%',
                scopedSlots: { customRender: 'name' },
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                filters: [
                    { text: 'Male', value: 'male' },
                    { text: 'Female', value: 'female' },
                ],
                width: '20%',
            },
            {
                title: 'Email',
                dataIndex: 'email',
            }]
        }
    },
    async asyncData ({store}) {
        await store.dispatch(types.SKU_LIST)
    },
    computed: {
        sku_list () {
            return [...this.$store.getters[types.SKU_LIST]]
        }
    }
}
</script>
<style lang="less" scoped>
.sku {
    color: red;
    div {
        color: blue;
    }
}
</style>