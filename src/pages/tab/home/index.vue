<template>
  <view class="flex flex-col items-center justify-center">
    <view class="w-702rpx mt-16rpx ml-24rpx - mr-24rpx">
      <up-search v-model="searchKey" placeholder="日照香炉生紫烟" @change="changeKey" @search="clickSearch" />
    </view>
    <view class="w-750rpx mt-16rpx">
      <u-swiper
        :list="bannerList"
      />
    </view>
    <div>
      <u-notice-bar :text="notice" />
    </div>
    <view class="mt-8rpx w-750rpx bg-white pt-24rpx pb-24rpx">
      <u-grid
        :border="false"
        col="5"
        @click="clickGrid"
      >
        <u-grid-item
          v-for="(item, index) in subjectList"
          :key="index"
        >
          <image :src="item.icon" width="80rpx" height="80rpx" class="w-120rpx h-120rpx" />
          <text class="grid-text">
            {{ item.title }}
          </text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToastRef" />
    </view>
    <view class="flex items-center w-750rpx bg-white pl-16rpx pr-16rpx pt-16rpx pb-16rpx mt-16rpx">
      <image src="/static/images/home/recent.png" class="w-50rpx h-50rpx ml-16rpx" />
      <view class="ml-12rpx">
        最近更新
      </view>
      <view class="flex-1 mr-16rpx text-right">
        今日已更新<text style="color: #f00">
          {{ todayAmount }}
        </text>份，总计<text style="color: #f00">
          {{ totalAmount }}
        </text>份
      </view>
    </view>
    <view class="mt-2rpx w-750rpx bg-white pl-2 pr-2">
      <view v-for="(item, index) in formationList" :key="index" class="flex pt-24rpx pb-24rpx ml-30rpx mr-30rpx" style="border-bottom: 2rpx solid #f2f2f2;">
        <image src="/static/images/home/cover_icon.png" class="w-160rpx h-190rpx" />
        <view class="flex flex-col ml-1 position-relative flex-1">
          <view class="mt-8rpx">
            {{ item.title }}
          </view>
          <view class="color-red position-absolute bottom-10">
            {{ item.integral }}积分
          </view>
          <view class="position-absolute bottom-0 flex items-center position-absolute" style="width: 100%;">
            <image src="/static/images/home/easy.png" class="w-30rpx h-30rpx" />
            <view class="ml-16rpx">
              {{ item.scanAmount }}人浏览
            </view>
            <image src="/static/images/home/doc.png" class="w-30rpx h-30rpx ml-16rpx" />
            <view class="ml-16rpx flex-1">
              {{ item.pageSize }}页
            </view>
            <view class>
              {{ item.date }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <agree-privacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
// import { useUserStore } from '@/store';
// import zPaging from 'z-paging/components/z-paging/z-paging.vue';
// const pagingRef = ref<InstanceType<typeof zPaging> | null>(null);
// const dataList = ref<string[]>([]);

// const title = ref<string>();
// title.value = import.meta.env.VITE_APP_TITLE;

// const store = useUserStore();
// console.log('store.user_name', store.user_name);

const showAgreePrivacy = ref(false);
// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}

const bannerList = ref(['/static/images/home/home_banner1.png']);
const notice = ref('号外号外，看起来即使安装了 autoreconf 之后，仍然存在一些问题。');

const todayAmount = ref(10);
const totalAmount = ref(1000);

const searchKey = ref('');

const subjectList = ref([
  {
    title: '一年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '二年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '三年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '四年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '五年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '一年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '二年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '三年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '四年级',
    icon: '/static/images/home/one_grade.png',
  },
  {
    title: '五年级',
    icon: '/static/images/home/one_grade.png',
  },
]);

// 创建对子组件的引用
const uToastRef = ref(null);

const clickGrid = (index: any) => {
  console.log('点击了', index);
  uni.showToast({
    title: `搜索${searchKey.value}`,
  });
};

const clickSearch = () => {
  console.log('用户点击了搜索', searchKey);
  // if (uToastRef.value) {
  //   uToastRef.value.show({
  //     title: 'wqrqr'
  //   })
  // }

  // uni.showToast({
  //   title: '搜索：' + res.value,
  //   icon: 'none'
  // })
};

const changeKey = () => {
  console.log('用户点击了搜索', searchKey);
};

const formationList: any[] = [
  {
    coverImg: '/static/images/home/cover.png',
    title: '小学四年级上册数学找规律专项练习题',
    integral: 10,
    scanAmount: 301,
    pageSize: 67,
    date: '2024-10-25',
    recommend: true,
  },
  {
    coverImg: '/static/images/home/cover.png',
    title: '小学四年级上册数学找规律专项练习题',
    integral: 10,
    scanAmount: 301,
    pageSize: 67,
    date: '2024-10-25',
    recommend: false,
  },
  {
    coverImg: '/static/images/home/cover.png',
    title: '小学四年级上册数学找规律专项练习题',
    integral: 10,
    scanAmount: 301,
    pageSize: 67,
    date: '2024-10-25',
    recommend: true,
  },
  {
    coverImg: '/static/images/home/cover.png',
    title: '小学四年级上册数学找规律专项练习题',
    integral: 10,
    scanAmount: 301,
    pageSize: 67,
    date: '2024-10-25',
    recommend: false,
  },
  {
    coverImg: '/static/images/home/cover.png',
    title: '小学四年级上册数学找规律专项练习题',
    integral: 10,
    scanAmount: 301,
    pageSize: 67,
    date: '2024-10-25',
    recommend: false,
  },
  {
    coverImg: '/static/images/home/cover.png',
    title: '小学四年级上册数学找规律专项练习题',
    integral: 10,
    scanAmount: 301,
    pageSize: 67,
    date: '2024-10-25',
    recommend: true,
  },
];
</script>

<style scoped>
::v-deep .u-notice {
  height: 30rpx;
}
</style>
