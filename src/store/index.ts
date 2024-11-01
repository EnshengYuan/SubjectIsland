import { createPinia } from 'pinia';
import type { App } from 'vue';
// 数据持久化
import { createPersistedState } from 'pinia-plugin-persistedstate';

// 导入子模块
import useAppStore from './modules/app';
import useCommonStore from './modules/common';
import useUserStore from './modules/user';

// 安装pinia状态管理插件
function setupStore(app: App) {
  const store = createPinia();

  const piniaPersist = createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  });
  store.use(piniaPersist);

  app.use(store);
}

// 导出模块
export { useAppStore, useCommonStore, useUserStore };
export default setupStore;
