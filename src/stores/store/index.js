import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import userStore from './modules/userStore.js';
import adminStore from './modules/adminStore.js';

const store =  createStore({
  modules: {
    userStore,
    adminStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
export default store;