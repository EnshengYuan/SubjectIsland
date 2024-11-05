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
              <image :src="switch2Icon(subjectItem.subjectId)" width="80rpx" height="80rpx" class="h-120rpx w-120rpx" />
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
  commonStore.setCommonValue({
    gradeIndex: index,
  });
};

onMounted(() => {
  getGradeList();
});

onShow(() => {
  currentGradeIndex.value = commonStore.gradeIndex || 0;
});

const switch2Icon = (subjectId: string) => {
  let icon = '';
  if (subjectId === 'chinese') {
    icon = '/static/images/category/chinese.png';
  }
  else if (subjectId === 'math') {
    icon = `/static/images/category/math.png`;
  }
  else if (subjectId === 'english') {
    icon = `/static/images/category/english.png`;
  }
  else if (subjectId === 'history') {
    icon = `/static/images/category/history.png`;
  }
  else if (subjectId === 'geography') {
    icon = `/static/images/category/geography.png`;
  }
  else if (subjectId === 'biology') {
    icon = `/static/images/category/biology.png`;
  }
  else if (subjectId === 'taoism') {
    icon = `/static/images/category/taoism.png`;
  }
  else if (subjectId === 'physics') {
    icon = `/static/images/category/physics.png`;
  }
  else if (subjectId === 'chemical') {
    icon = `/static/images/category/chemical.png`;
  }

  return icon;
};

const switch2Title = (subjectId: string, publisher: string) => {
  let title = '';
  if (subjectId === 'chinese') {
    title = `语文`;
  }
  else if (subjectId === 'math') {
    title = `数学`;
  }
  else if (subjectId === 'english') {
    title = `英语`;
  }
  else if (subjectId === 'history') {
    title = `历史`;
  }
  else if (subjectId === 'geography') {
    title = `地理`;
  }
  else if (subjectId === 'biology') {
    title = `生物`;
  }
  else if (subjectId === 'taoism') {
    title = `道法`;
  }
  else if (subjectId === 'physics') {
    title = `物理`;
  }
  else if (subjectId === 'chemical') {
    title = `化学`;
  }
  title += `(${publisher})`;

  return title;
};

onShareAppMessage(() => {
  return {
    title: '知识印记',
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
