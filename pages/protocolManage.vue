<template>
  <div class="protocol">
    <div>{{ data }}</div>
  </div>
</template>
<script>
export default {
    layout: 'content',
    async asyncData() {
        return {
            data: '还没有程序猿开发我呢。。。。呜呜呜呜呜呜。。。。。。。'
        }
    }
}
</script>
<style lang="less" scoped></style>
