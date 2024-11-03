<template>
  <view class="flex" style="height: 100%;">
    <view class="w-180rpx">
      <view v-for="(gradeItem, gradeindex) in gradeList" :key="gradeindex" class="h-112rpx text-center line-height-112rpx" :style="currentGradeIndex === gradeindex ? 'background:white' : ''" @click="clickGrade(gradeindex)">
        {{ gradeItem?.gradeName }}
      </view>
    </view>
    <view class="bg-white flex-1">
      <view v-for="(semesterItem, semesterIndex) in gradeList[currentGradeIndex]?.semester" :key="semesterIndex" class="flex flex-col items-center">
        <view class="mt-30rpx">
          {{ semesterItem.title }}
        </view>
        <view class="mt-8rpx bg-white pb-24rpx pt-24rpx w-100%">
          <u-grid
            :border="false"
            col="3"
          >
            <u-grid-item
              v-for="(subjectItem, subjectIndex) in semesterItem?.subjectCategory"
              :key="subjectIndex"
              style="margin-top: 16rpx;"
              @click="clickSubject(gradeList[currentGradeIndex]?.gradeId, semesterItem?.semesterId, subjectItem?.subjectId, subjectItem?.publisher, switch2Title(subjectItem.subjectId, subjectItem.publisher))"
            >
              <image src="/static/images/home/logo.png" width="80rpx" height="80rpx" class="h-120rpx w-120rpx" />
              <text class="grid-text" style="font-size: 24rpx;">
                {{ switch2Title(subjectItem.subjectId, subjectItem.publisher) }}
              </text>
            </u-grid-item>
          </u-grid>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store';

const commonStore = useCommonStore();
const currentGradeIndex = ref<number>(0);
const gradeList = ref([]);

const clickGrade = (index: number) => {
  currentGradeIndex.value = index;
};

onMounted(() => {
  getGradeList();
});

onShow(() => {
  currentGradeIndex.value = commonStore.gradeIndex || 0;
});

const switch2Title = (subjectId: string, publisher: string) => {
  let title = '';
  if (subjectId === 'chinese') {
    title = `语文` + `(${publisher})`;
  }
  else if (subjectId === 'math') {
    title = `数学` + `(${publisher})`;
  }
  else if (subjectId === 'english') {
    title = `英语` + `(${publisher})`;
  }

  return title;
};

onShareAppMessage(() => {
  return {
    title: '学科岛',
    path: '/pages/tabbar/home/index',
  };
});

const clickSubject = (gradeId: string, semesterId: string, subjectId: string, publisher: string, subjectTitle: string) => {
  uni.navigateTo({
    url: `/pages/common/list/index?gradeId=${gradeId}&semesterId=${semesterId}&subjectId=${subjectId}&publisher=${publisher}&navTitle=${subjectTitle}`,
  });
};

/** 获取年级列表 */
function getGradeList() {
  wx.cloud.callFunction({
    name: 'getGradeList',
    data: {},
  })
    .then((res) => {
      gradeList.value = res.result?.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
