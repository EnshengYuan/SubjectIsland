<template>
  <view class="pt-16rpx w-750rpx bg-white pl-2 pr-2 h-100%" style="box-sizing: border-box;">
    <view class="flex items-center">
      <image class="w-45rpx h-45rpx" src="/static/images/home/pdf.png" />
      <view class="ml-10rpx;text-size-36rpx">
        {{ formationDetail.formationName }}
      </view>
    </view>
    <view class="flex items-center pt-24rpx pb-24rpx color-#999" style="border-bottom: 2rpx solid #f2f2f2;">
      <view class>
        {{ formationDetail.date }}
      </view>
      <view class="color-red ml-30rpx">
        {{ 10 }}积分
      </view>
      <image src="/static/images/home/doc.png" class="w-30rpx h-30rpx ml-30rpx" />
      <view class="ml-10rpx">
        {{ formationDetail.num }}页
      </view>
      <image src="/static/images/home/size.png" class="w-30rpx h-30rpx ml-30rpx" />
      <view class="ml-10rpx">
        {{ removeDecimalAndKeepUnit(formationDetail.size) }}
      </view>
      <image src="/static/images/home/easy.png" class="w-30rpx h-30rpx ml-30rpx" />
      <view class="ml-10rpx">
        {{ formationDetail.scanAmout }}人浏览
      </view>
    </view>
    <image class="w-750rpx" :src="formationDetail.coverImage" mode="widthFix" />
    <view class="color-#ffc200 text-align-center">
      ------预览已结束，还剩{{ formationDetail.num - 1 }}页未读------
    </view>
    <view class="w-750rpx position-fixed bottom-0 left-0 h-88rpx flex items-center color-#999999 font-size-24rpx">
      <view class="flex flex-col items-center w-110rpx h-100%" @click="toHome">
        <image class="w-45rpx h-45rpx" src="/static/images/tabbar/home_unselected.png" />
        <view>首页</view>
      </view>
      <view class="bg-#f2f2f2 w-2rpx h-80%" />
      <button class="font-size-24rpx pl-0rpx pr-0rpx color-#999999" open-type="share" plain style="border: none;">
        <view class="flex flex-col items-center w-110rpx">
          <image class="w-45rpx h-45rpx bg-white" src="/static/images/home/share.png" />
          <view class="color-#999999">
            分享
          </view>
        </view>
      </button>
      <view class="bg-#f2f2f2 w-2rpx h-80%" />
      <view class="flex flex-col items-center w-110rpx h-100%">
        <image class="w-45rpx h-45rpx" src="/static/images/home/service.png" />
        <view>客服</view>
      </view>
      <view
        class="h-80rpx flex-1 mr-20rpx mb-5rpx bg-#00b26d color-white text-center line-height-80rpx" style="border-radius: 80rpx;"
        @click="toLoad(formationDetail.url)"
      >
        立刻下载
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formationDetail = ref();

onLoad((option: any) => {
  let detail = {};
  try {
    detail = JSON.parse(decodeURIComponent(option.detail));
  }
  catch (error) {
    console.error(error);
  }
  formationDetail.value = detail;
});

function removeDecimalAndKeepUnit(sizeStr) {
  // 正则表达式匹配数字部分，并保留后面的任意英文字母单位
  const regex = /([\d.]+)\s*([a-z]+)/i;
  const match = sizeStr.match(regex);

  if (match) {
    // 提取数字部分并去除小数点，只保留整数部分
    const integerSize = Math.floor(Number.parseFloat(match[1]));
    // 返回整数部分和单位
    return `${integerSize}${match[2]}`;
  }
  else {
    // 如果没有匹配到，返回原字符串
    return sizeStr;
  }
}

const toHome = () => {
  uni.switchTab({
    url: '/pages/tab/home/index',
  });
};

onShareAppMessage(() => {
  return {
    title: '学科岛',
    path: '/pages/tabbar/home/index',
  };
});

const toLoad = (url: string) => {
  uni.downloadFile({
    url,
    success(res) {
      // 下载完成后转发
      uni.shareFileMessage({
        filePath: res.tempFilePath,
        success() {},
        fail: console.error,
      });
    },
    fail: console.error,
  });
};
</script>
