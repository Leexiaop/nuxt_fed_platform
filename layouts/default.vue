<template>
    <div class="container">
      <a-layout>
        <a-layout-header>
            <a-button type="primary">我的大头贴</a-button>
            <a-button type="primary">退出</a-button>
        </a-layout-header>
        <a-layout>
          <a-layout-sider>
                  <a-menu
                    :defaultSelectedKeys="[0]"
                    mode="inline"
                    theme="dark"
                    :inlineCollapsed="collapsed"
                  >
                    <a-menu-item v-for="(tab, index) in tabList" :key="index">
                      <nuxt-link :to="tab.router">
                        <a-icon :type="tab.icon" />
                        <span>{{tab.name}}</span>
                      </nuxt-link>
                    </a-menu-item>
                </a-menu>
          </a-layout-sider>
          <a-layout-content>
            <nuxt />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
</template>

<script>

export default {
    data () {
        return {
            collapsed: false,
            tabList: [
                {
                    id: 1,
                    name: 'SKU管理',
                    icon: 'user',
                    router: '/'
                },
                {
                    id: 2,
                    name: '常用工具',
                    icon: 'user',
                    router: '/protocolManage'
                },
                // {
                //     id: 3,
                //     name: '协议管理',
                //     icon: 'user',
                //     router: ''
                // },
                // {
                //     id: 4,
                //     name: '需求管理',
                //     icon: '',
                //     router: ''
                // },
                // {
                //     id: 5,
                //     name: '远程部署',
                //     icon: '',
                //     router: ''
                // }
            ]
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    width: 100%;
    height: 100%;
}
.ant-layout-header {
  color: #fff;
  width: 100%;
}
.ant-layout-content {
  padding: 24px;
}
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
