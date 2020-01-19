<template>
    <div class="nav">
        <div class="nav_left">
            <img src="~/static/bg.jpeg" alt="">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{userInfo.name}}</div>
        </div>
        <a-button type="primary">退出</a-button>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    data () {
        return {
            userInfo: {
                name: '吉他吹唢呐',
                head: '~/static/bg.jpeg'
            }
        }
    },
    methods: {
        logout () {
            this.$router.push('/login')
            Cookies.remove('fed_token', { path: '' })
        }
    }
}
</script>

<style scoped lang="less">
div.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    div.nav_left {
        display: flex;
        align-items: center;
        img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }
    }
}
</style>