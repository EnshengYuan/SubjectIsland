<script setup lang="ts">
import { mpUpdate } from '@/utils/index';

onLaunch(() => {
  console.log('App Launch');
  // #ifdef MP-WEIXIN
  wx.cloud.init({
    env: 'subjectlib-0gd6lir684eb2e12',
  });
  mpUpdate();
  // #endif
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
onShareAppMessage(() => {
  return {
    title: '详情',
    path: '/pages/tabbar/home/index',
  };
});
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';
</style>
