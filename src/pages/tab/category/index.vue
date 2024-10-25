<template>
  <view class="flex">
    <view class="w-180rpx">
      <view v-for="(item, index) in formationList" :key="index" class="h-112rpx">
        {{ item.subjectTitle }}
      </view>
    </view>
    <view class="bg-white">
      <view v-for="(item, index) in formationList[currenSubjectIndex].semester" :key="index" class="flex flex-col items-center">
        <view>{{ item. semesterTitle }}</view>
        <view class="mt-8rpx w-750rpx bg-white pb-24rpx pt-24rpx">
          <u-grid
            :border="false"
            col="3"
          >
            <u-grid-item
              v-for="(subjectItem, subjectIndex) in item.SubjectList"
              :key="subjectIndex"
            >
              <image :src="subjectItem.icon" width="80rpx" height="80rpx" class="h-120rpx w-120rpx" />
              <text class="grid-text">
                {{ subjectItem.title }}
              </text>
            </u-grid-item>
          </u-grid>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// import { ISubjectType } from './type.js';

const currenSubjectIndex = ref(0);

const formationList: any[] = [
  {
    subjectTitle: '一年级',
    semester: [
      {
        semesterTitle: '一年级上',
        SubjectList: [
          {
            title: '语文',
            iconType: 0,
          },
          {
            title: '数学',
            iconType: 1,
          },
          {
            title: '英语',
            iconType: 2,
          },

        ],
      },
      {
        semesterTitle: '一年级下',
        SubjectList: [
          {
            title: '语文',
            iconType: 0,
          },
          {
            title: '数学',
            iconType: 1,
          },
          {
            title: '英语',
            iconType: 2,
          },

        ],
      },
    ],
  },
  {
    subjectTitle: '二年级',
    semester: [
      {
        semesterTitle: '二年级上',
        SubjectList: [
          {
            title: '语文',
            iconType: 0,
          },
          {
            title: '数学',
            iconType: 1,
          },
          {
            title: '英语',
            iconType: 2,
          },

        ],
      },
      {
        semesterTitle: '二年级下',
        SubjectList: [
          {
            title: '语文',
            iconType: 0,
          },
          {
            title: '数学',
            iconType: 1,
          },
          {
            title: '英语',
            iconType: 2,
          },

        ],
      },
    ],
  },
];
</script>
