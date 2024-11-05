<script setup lang="ts">
import { mpUpdate } from '@/utils/index';

import { useCommonStore } from '@/store';

onLaunch(() => {
  console.log('App Launch');
  // #ifdef MP-WEIXIN
  wx.cloud.init({
    env: 'subjectlib-0gd6lir684eb2e12',
  });
  mpUpdate();
  fixAduitStatus();
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
const commonStore = useCommonStore();
function fixAduitStatus() {
  wx.cloud.callFunction({
    name: 'getAduitStatus',
    data: {},
  })
    .then((res) => {
      console.log('审核状态==>', res.result);
      if (res) {
        commonStore.setCommonValue({
          isAduit: res.result,
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';
</style>
