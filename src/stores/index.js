import { defineStore } from "pinia";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
// import userStore from "@/store/modules/userStore.js";
// import { createPersistedState } from "pinia-plugin-persist";

export const useAppStore = defineStore("storeId", {
  state: () => ({
    bootstrap,
  }),
});

// import { createApp } from 'vue';
// import { createStore } from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
// import boardStore from './boardStore';
// import houseStore from './houseStore';
// import memberStore from './memberStore';
// import todoStore from './todoStore';

// const store = createStore({
//   modules: {
//     boardStore,
//     houseStore,
//     memberStore,
//     todoStore,
//   },
//   plugins: [
//     createPersistedState({
//       storage: sessionStorage,
//     }),
//   ],
// });
