<template>
  <view class="mt-2rpx w-750rpx bg-white pl-2 pr-2">
    <z-paging ref="pagingRef" v-model="formationList" @query="queryList">
      <view
        v-for="(item, index) in formationList" :key="index" class="flex pt-24rpx pb-24rpx ml-30rpx mr-30rpx" style="border-bottom: 2rpx solid #f2f2f2;"
        @click="gotoDetail(item)"
      >
        <image :src="item.coverImage" class="w-160rpx h-190rpx" />
        <view class="flex flex-col ml-1 position-relative flex-1">
          <view class="mt-8rpx">
            {{ item.formationName }}
          </view>
          <view class="color-red position-absolute bottom-60rpx">
            {{ 10 }}积分
          </view>
          <view class="position-absolute bottom-0 flex items-center position-absolute w-100%" :style="`visibility:${commonStore.isAduit ? 'hidden' : 'visible'}`">
            <image src="/static/images/home/easy.png" class="w-30rpx h-30rpx" />
            <view class="ml-16rpx">
              {{ item.scanAmout }}人浏览
            </view>
            <image src="/static/images/home/doc.png" class="w-30rpx h-30rpx ml-16rpx" />
            <view class="ml-16rpx flex-1">
              {{ item.num }}页
            </view>
            <view class>
              {{ item.date }}
            </view>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import zPaging from 'z-paging/components/z-paging/z-paging.vue';

import { useCommonStore } from '@/store';

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null);
const formationList = ref<string[]>([]);
const pageParamRef = ref({});
const commonStore = useCommonStore();

onLoad((option: any) => {
  if (option?.navTitle) {
    uni.setNavigationBarTitle({
      title: option.navTitle,
    });
  }

  pageParamRef.value = {
    gradeId: option?.gradeId,
    semesterId: option?.semesterId,
    subjectId: option?.subjectId,
  };
});

onShareAppMessage(() => {
  return {
    title: '知识印记',
    path: '/pages/tabbar/home/index',
  };
});

const randomScan = () => {
  // 生成一个150到800之间的随机数
  const randomNumber = Math.floor(Math.random() * (800 - 150 + 1)) + 150;
  return randomNumber;
};

function queryList(pageNo: number, pageSize: number) {
  console.log(pageNo, pageSize);
  // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  // 这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过pagingRef.value.complete(请求回来的数组)将请求结果传给z-paging
  wx.cloud.callFunction({
    name: 'getFormationList',
    data: {
      gradeId: pageParamRef.value?.gradeId,
      semesterId: pageParamRef.value?.semesterId,
      subjectId: pageParamRef.value?.subjectId,
      publisher: pageParamRef.value?.publisher,
    },
  })
    .then((res) => {
      pagingRef.value.complete(res?.result?.data || []).map((item) => {
        item.scanAmout = randomScan();
        return item;
      });
    })
    .catch((error) => {
      console.error(error);
      // 如果请求失败写pagingRef.value.complete(false)，会自动展示错误页面
      // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      pagingRef.value.complete(false);
    });
}

const gotoDetail = (item: any) => {
  const detail = encodeURIComponent(JSON.stringify(item));
  uni.navigateTo({
    url: `/pages/common/detail/index?detail=${detail}`,
    data: item,
  });
};
</script>

<style scoped>
::v-deep .z-paging-content {
  background-color: white;
}
</style>
