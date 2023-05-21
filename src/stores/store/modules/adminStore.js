// import jwtDecode from "jwt-decode";
import router from "@/router";
import { getUsers } from "@/api/admin";
import { deleteUser } from "@/api/user";
// import http from "@/api/http.js";
const adminStore = {
  namespaced: true,
  state: {
    pgno: "",
    key: "",
    word: "",
    users: null,
    navigation: null,
  },
  getters: {
    checkUsers: function (state) {
      return state.users;
    },
  },
  mutations: {
    SET_PGNO: (state, pgno) => {
      state.pgno = pgno;
    },
    SET_KEY: (state, key) => {
      state.key = key;
    },
    SET_WORD: (state, word) => {
      state.word = word;
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation;
    },
  },
  actions: {
    async getUsersInfo({ commit }, { search }) {
      console.log(search);
      await getUsers(
        { search },
        ({ data }) => {
          console.log(data);
          commit("SET_PGNO", data.pgno);
          commit("SET_KEY", data.key);
          commit("SET_WORD", data.word);
          commit("SET_USERS", data.users);
          commit("SET_NAVIGATION", data.navigation);
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log(
            "getUsersInfo() error code [] ::: ",
            error.response.status
          );
        }
      );
    },
    async deleteUserByAdmin({ commit, dispatch }, { map }) {
      // let decodeToken = jwtDecode(token);
      console.log("회원 강제 탈퇴");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(map);
      const search = {
        pgno: map.pgno,
        key: map.key,
        word: map.word,
      };
      await deleteUser(
        map.userid,
        async ({ data }) => {
          await dispatch("getUsersInfo", { search }); // 유저 리스트를 다시 불러온다.
        },
        async (error) => {
          //왜 에러가 여기서 발생하지..
          await dispatch("getUsersInfo", { search }); // 유저 리스트를 다시 불러온다.

          console.log("deleteUserInfo() error code [] ::: ");
        }
      );
    },
  },
};

export default adminStore;
