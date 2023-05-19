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
    async deleteUserByAdmin({ commit, dispatch }, userid) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(userid);
      await deleteUser(
        userid,
        async ({ data }) => {
          if (data.message === "success") {
            await dispatch("getUsersInfo", this.pgno, this.key, this.word); // 유저 리스트를 다시 불러온다.
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "modifyUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
  },
};

export default adminStore;
