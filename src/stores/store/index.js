import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import userStore from './modules/userStore.js';

const store =  createStore({
  modules: {
    userStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
export default store;