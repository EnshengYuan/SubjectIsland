<template>
  <view class="content">
    <image class="logo" src="/static/images/home/logo.png" />
    <view class="text-area">
      <text class="title">
        {{ `${title}boy111222` }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('Hello');

onShareAppMessage(() => {
  return {
    title: '知识印记',
    path: '/pages/tabbar/home/index',
  };
});
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  margin: 200rpx auto 50rpx;
  width: 200rpx;
  height: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
