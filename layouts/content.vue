<template>
  <div class="container">
    <a-layout>
      <a-layout-header>
        <Nav />
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <a-menu
            :default-selected-keys="[0]"
            mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
          >
            <a-menu-item
              v-for="(tab, index) in tabList"
              :key="index"
            >
              <nuxt-link :to="tab.router">
                <a-icon :type="tab.icon" />
                <span>{{ tab.name }}</span>
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
import Nav from '~/components/Nav'
export default {
    components: {
        Nav
    },
    data() {
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
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.container {
	margin: 0 auto;
	width: 100%;
	height: 100%;
}
.ant-layout {
	height: 100%;
}
.ant-layout-header {
	color: #fff;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.ant-layout-sider,
.ant-layout-sider-dark {
	flex: none !important;
	min-height: 100% !important;
}
.ant-layout-content {
	padding: 24px;
}
</style>
