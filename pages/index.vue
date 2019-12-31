<template>
    <div class="sku">
        <div class="table-operations">
            <a-input placeholder="访问链接" @change="handleInputChange" v-model="state.url"/>
            <a-input placeholder="SKU_NAME" @change="handleInputChange" v-model="state.skuName"/>
            <a-input placeholder="SCENE_NAME" @change="handleInputChange" v-model="state.sceneName"/>
            <a-input placeholder="保险名称" @change="handleInputChange" v-model="state.title"/>
            <a-select @change="handleSelectChange" placeholder="请选择公司">
                <a-select-option v-for="(company, index) in company_list" :value="company.id" :key="index">{{company.title}}</a-select-option>
            </a-select>
        </div>
        <a-table :columns="columns" :dataSource="sku_list" bordered>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="handleBtnClick(record, 1)">访问</a>
                <a href="javascript:;" @click="handleBtnClick(record, 2)">查看</a>
                <a href="javascript:;" @click="handleBtnClick(record, 3)">修改</a>
            </template>
        </a-table>
        <a-drawer
            title="SKU信息修改"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="isShow"
            :maskClosable="true"
            >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-drawer>
    </div>
</template>
<script>
import * as types from '~/assets/actions_types'

export default {
    data () {
        return {
            columns: [
                {
                    title: 'Id',
                    dataIndex: 'key'
                },
                {
                    title: '保险公司',
                    dataIndex: 'insure_name'
                },
                {
                    title: '访问链接',
                    dataIndex: 'url'
                },
                {
                    title: '保险名称',
                    dataIndex: 'title'
                },
                {
                    title: 'SKU_NAME',
                    dataIndex: 'sku_name'
                },
                {
                    title: 'SCENE_NAME',
                    dataIndex: 'scene_name'
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: { customRender: 'operation' },
                }
            ],
            state: {
                url: '',
                skuName: '',
                sceneName: '',
                title: '',
                company: ''
            },
            isShow: false
        }
    },
    async asyncData ({store}) {
        await store.dispatch(types.SKU_LIST)
    },
    methods: {
        handleSelectChange (value) {
            this.state.company = this.company_list.find(company => company.id === value).id
            this.$store.dispatch(types.SKU_LIST, this.state)
        },
        handleInputChange () {
            this.$store.dispatch(types.SKU_LIST, this.state)
        },
        handleBtnClick (record, key) {
            switch (key) {
                case 1:
                    window.open(record.url, '_blank', true)
                    break
                case 3:
                    this.isShow = true
                    break
                default:
                    console.log('我也不知道干啥！')
            }
        },
        onClose () {}
    },
    computed: {
        sku_list () {
            return [...this.$store.getters[types.SKU_LIST]]
        },
        company_list () {
            return [...this.$store.getters[`company/${types.COMPANY_LIST}`]]
        }
    }
}
</script>
<style lang="less" scoped>
.table-operations {
    margin-bottom: 24px;
    input, .ant-select {
        width: 15%;
    }
}
</style>