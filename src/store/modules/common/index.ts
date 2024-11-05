import { defineStore } from 'pinia';
import type { CommonState } from './types';

const useCommonStore = defineStore('common', {
  state: (): CommonState => ({
    gradeIndex: 0,
    isAduit: 0,
  }),
  getters: {
    commonValue(state: CommonState): CommonState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setCommonValue(partial: Partial<CommonState>) {
      this.$patch(partial);
    },
  },
  persist: true,
});

export default useCommonStore;
