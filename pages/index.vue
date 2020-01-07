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
            <a-button type="primary" @click="handleBtnClick">添加</a-button>
        </div>
        <a-table :columns="columns" :dataSource="sku_list" bordered :pagination="{pageSize: 15}">
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="handleBtnClick(record, 1)">访问</a>
                <a href="javascript:;" @click="handleBtnClick(record, 2)">查看</a>
                <a href="javascript:;" @click="handleBtnClick(record, 3)">修改</a>
            </template>
        </a-table>
        <a-drawer :title="`SKU信息${title}`" placement="right" :closable="false" @close="onDrawerClose" :visible="isDrawerShow" width="700" >
            <div class="drawerContent">
                <a-form layout="horizontal">
                    <a-form-item label="访问链接">
                        <a-input placeholder="请输入访问链接" v-model="form.url"/>
                    </a-form-item>
                    <a-form-item label="SKU_NAME">
                        <a-input placeholder="请输入SKU_NAME" v-model="form.skuName"/>
                    </a-form-item>
                    <a-form-item label="SCENE_NAME">
                        <a-input placeholder="请输入SCENE_NAME" v-model="form.sceneName"/>
                    </a-form-item>
                    <a-form-item label="保险名称">
                        <a-input placeholder="请输入保险名称" v-model="form.title"/>
                    </a-form-item>
                     <a-form-item label="保险公司">
                        <a-select v-model="companyName" @change="handleDrawerSelectChange" placeholder="请选择公司">
                            <a-select-option v-for="(company, index) in company_list" :value="company.id" :key="index">{{company.title}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="配置信息">
                        <a-textarea placeholder="请输入配置信息" :rows="25" v-model="form.config"/>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="default" @click="isDrawerShow = false">取消</a-button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <a-button type="primary" @click="addSku">确定</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import * as types from '~/assets/actions_types'
import fun from '~/assets/utils'
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
            isDrawerShow: false,
            title: '修改',
            companyName: '',
            form: {}
        }
    },
    async asyncData ({store}) {
        // await store.dispatch(types.SKU_LIST)
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
                case 2:
                    console.log('查看信息')
                    break
                case 3:ßß
                    this.title = '修改'
                    this.isDrawerShow = true
                    this.form = {
                        id: record.id,
                        url: record.url,
                        skuName: record.sku_name,
                        sceneName: record.scene_name,
                        company: record.cid,
                        title: record.title,
                        config: record.config
                    }
                    this.companyName = record.insure_name
                    break
                default:
                    this.isDrawerShow = true
                    this.title = '添加'
                    this.form = {}
            }
        },
        onDrawerClose () {
            this.isDrawerShow = false
            this.form = {}
            this.companyName = ''
        },
        handleDrawerSelectChange (value) {
            this.form.company = value
        },
        async addSku ({store}) {
            await this.$store.dispatch(types.SKU_ADD, this.form)
            if (this.$store.getters[types.SKU_ADD] === '添加成功') {
                this.isDrawerShow = false
                this.$store.dispatch(types.SKU_LIST)
            } else {
                this.$notification['error']({
                    message: 'Error',
                    description: '提交失败，请迅速联系程序猿。。。',
                })
            }
        }
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