import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import userStore from "./modules/userStore.js";
import adminStore from "./modules/adminStore.js";
import boardStore from "./modules/boardStore.js";
import commentStore from "./modules/commentStore.js";
import hotplaceStore from "./modules/hotplaceStore.js";
const store = createStore({
  modules: {
    userStore,
    adminStore,
    boardStore,
    commentStore,
    hotplaceStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
export default store;
