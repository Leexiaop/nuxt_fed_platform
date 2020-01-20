<template>
  <div class="sku">
    <div class="table-operations">
      <a-input
        v-model="state.url"
        placeholder="访问链接"
        @change="handleInputChange"
      />
      <a-input
        v-model="state.sku_name"
        placeholder="SKU_NAME"
        @change="handleInputChange"
      />
      <a-input
        v-model="state.scene_name"
        placeholder="SCENE_NAME"
        @change="handleInputChange"
      />
      <a-input
        v-model="state.title"
        placeholder="保险名称"
        @change="handleInputChange"
      />
      <a-select
        placeholder="请选择保险公司"
        @change="handleSelectChange"
      >
        <a-select-option
          v-for="(company, index) in $store.getters[`company/${actionTypes.COMPANY_LIST}`]"
          :key="index"
          :value="company.id"
        >
          {{ company.title }}
        </a-select-option>
      </a-select>
      <a-button
        type="primary"
        @click="handleBtnClick"
      >
        添加
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="sku.list"
      bordered
      :pagination="false"
    >
      <template
        slot="operation"
        slot-scope="text, record"
      >
        <a-button @click="handleBtnClick(record, 1)">
          访问
        </a-button>
        <a-button
          type="primary"
          @click="handleBtnClick(record, 3)"
        >
          修改
        </a-button>
        <a-popconfirm
          title="确定要删除本条SKU吗？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleBtnClick(record, 2)"
        >
          <a-button type="danger">
            删除
          </a-button>
        </a-popconfirm>
        <a-button
          type="primary"
          @click="handleBtnClick(record, 4)"
        >
          查看
        </a-button>
      </template>
    </a-table>
    <a-pagination
      :default-current="3"
      :total="sku.total"
      :page-size.sync="pageSize"
      @change="onPageChange"
    />
    <a-drawer
      :title="`SKU信息${title}`"
      placement="right"
      :closable="false"
      :visible="isDrawerShow"
      width="700"
      @close="onDrawerClose"
    >
      <div class="drawerContent">
        <a-form layout="horizontal">
          <a-form-item label="访问链接">
            <a-input
              v-model="form.url"
              placeholder="请输入访问链接"
            />
          </a-form-item>
          <a-form-item label="SKU_NAME">
            <a-input
              v-model="form.sku_name"
              placeholder="请输入SKU_NAME"
            />
          </a-form-item>
          <a-form-item label="SCENE_NAME">
            <a-input
              v-model="form.scene_name"
              placeholder="请输入SCENE_NAME"
            />
          </a-form-item>
          <a-form-item label="保险名称">
            <a-input
              v-model="form.title"
              placeholder="请输入保险名称"
            />
          </a-form-item>
          <a-form-item label="保险公司">
            <a-select
              v-model="form.insure_name"
              default-value="请选择保险公司"
              placeholder="请选择保险公司"
              @change="handleDrawerSelectChange"
            >
              <a-select-option
                v-for="(company, index) in $store.getters[`company/${actionTypes.COMPANY_LIST}`]"
                :key="index"
                :value="company.id"
              >
                {{ company.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="配置信息">
            <a-textarea
              v-model="form.config"
              placeholder="请输入配置信息"
              :rows="25"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="default"
              @click="isDrawerShow = false"
            >
              取消
            </a-button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <a-button
              type="primary"
              @click="addSku"
            >
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>
    <a-modal
      v-model="isModelShow"
      title="JSON数据对比"
      width="80%"
      ok-text="保存"
      cancel-text="下载"
      @ok="addSku"
      @cancel="downModalData"
    >
      <div class="content">
        <div class="content-left">
          <a-textarea
            v-model="form.config"
            placeholder="Basic usage"
            :rows="45"
          />
        </div>
        <div class="content-right">
          <json-viewer
            :value="form.config"
            :expand-depth="5"
            copyable
            sort
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import * as types from '~/assets/actions_types'
export default {
    layout: 'content',
    middleware: 'getCompanyList',
    async asyncData({ store }) {
        await store.dispatch(types.SKU_LIST, { page: 1, page_size: 15 })
    },
    data() {
        return {
            columns: [
                {
                    title: '序号',
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
                    scopedSlots: { customRender: 'operation' }
                }
            ],
            state: {
                url: '',
                sku_name: '',
                scene_name: '',
                title: '',
                company: ''
            },
            isDrawerShow: false,
            isModelShow: false,
            title: '修改',
            form: {},
            currentPage: 1,
            pageSize: 15,
            jsonConfig: {},
            actionTypes: types
        }
    },
    computed: {
        sku() {
            return this.$store.getters[types.SKU_LIST]
        }
    },
    methods: {
        handleSelectChange(value) {
            this.state.company = this.$store.getters[`company/${types.COMPANY_LIST}`].find(company => company.id === value).id
            this.$store.dispatch(types.SKU_LIST, this.state)
        },
        handleInputChange() {
            // utils.throttle(() => {
            this.$store.dispatch(types.SKU_LIST, this.state)
            // }, 500)
        },
        async handleBtnClick(record, key) {
            switch (key) {
            case 1:
                window.open(record.url, '_blank', true)
                break
            case 2:
                await this.$store.dispatch(types.SKU_DELETE, { id: record.id })
                if (!this.$store.getters[types.SKU_DELETE]) {
                    this.isDrawerShow = false
                    this.$store.dispatch(types.SKU_LIST, { page: this.currentPage, page_size: this.pageSize })
                }
                break
            case 3:
                this.title = '修改'
                this.isDrawerShow = true
                this.form = {
                    id: record.id,
                    url: record.url,
                    sku_name: record.sku_name,
                    scene_name: record.scene_name,
                    company: record.cid,
                    title: record.title,
                    config: record.config,
                    insure_name: record.insure_name
                }
                break
            case 4:
                this.isModelShow = true
                this.form = {
                    id: record.id,
                    url: record.url,
                    sku_name: record.sku_name,
                    scene_name: record.scene_name,
                    config: record.config,
                    title: record.title,
                    company: record.cid
                }
                break
            default:
                this.isDrawerShow = true
                this.title = '添加'
                this.form = {}
            }
        },
        onDrawerClose() {
            this.isDrawerShow = false
            this.form = {}
        },
        handleDrawerSelectChange(value) {
            this.form.cid = value
        },
        onPageChange(page, pageSize) {
            this.$store.dispatch(types.SKU_LIST, { page: page, page_size: pageSize })
        },
        async addSku() {
            let param = {
                url: this.form.url,
                sku_name: this.form.sku_name,
                scene_name: this.form.scene_name,
                config: this.form.config,
                title: this.form.title,
                cid: this.form.company
            }
            if (this.form.id) {
                param.id = this.form.id
                await this.$store.dispatch(types.SKU_UPDATE, param)
            } else {
                await this.$store.dispatch(types.SKU_ADD, param)
            }
            if (!this.$store.getters[types.SKU_ADD]) {
                this.isDrawerShow = false
                this.$store.dispatch(types.SKU_LIST, { page: this.currentPage, page_size: this.pageSize })
            }
        },
        downModalData() {
            if (!this.form.config) {
                this.$notification.warning({
                    message: '提示',
                    description: '数据为空，不能下载文件。。。'
                })
                alert('保存的数据为空')
                return
            }
            let text = '//sku_name=' + this.form.sku_name + '&scene_name=' + this.form.scene_name + '\n' + this.form.config
            let blob = new Blob([text], { type: 'text/json' }),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a')
            a.download = `${this.form.sku_name}-${this.form.scene_name}.json`
            a.href = window.URL.createObjectURL(blob)
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            a.dispatchEvent(e)
        }
    }
}
</script>
<style lang="less" scoped>
.table-operations {
	margin-bottom: 24px;
	input,
	.ant-select {
		width: 15%;
	}
}
div.content {
	display: flex;
	div.content-left,
	div.content-right {
		width: 50%;
		height: 955px;
		border-radius: 4px;
		border: 1px solid #d9d9d9;
		overflow: scroll;
	}
}
</style>
