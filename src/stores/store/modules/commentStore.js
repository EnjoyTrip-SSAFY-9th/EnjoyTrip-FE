// import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  getCommentList,
  writeComment,
  modifyComment,
  deleteComment,
} from "@/api/comment";
// import http from "@/api/http.js";
const commentStore = {
  namespaced: true,
  state: {
    comments: null,
    comment: null,
  },
  getters: {
    checkComments: function (state) {
      return state.comments;
    },
  },
  mutations: {
    SET_COMMENTS: (state, comments) => {
      state.comments = comments;
    },
    SET_BOARD: (state, comment) => {
      state.comment = comment;
    },
  },
  actions: {
    async getComments({ commit }, articleNo) {
      console.log(articleNo);
      await getCommentList(
        articleNo,
        ({ data }) => {
            if(data.message == "success"){
                commit("SET_COMMENTS", data.list);
            }
          console.log("3. getComments data >> ", data);
        },
        async (error) => {
          console.log("getcomments() error code [] ::: ", error.response.status);
        }
      );
    },
    async write({ commit, dispatch }, comment) {
      // let decodeToken = jwtDecode(token);
      console.log("댓글 작성중");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(comment);
      await writeComment(
        comment,
        async ({ data }) => {
            await dispatch("getComments", comment.articleNo);
        },
        async (error) => {
          console.log(
            "writeComment() error code [] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async modify({ commit, dispatch }, comment) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(comment);
      await modifyComment(
        comment,
        async ({ data }) => {
            console.log(data);
            await dispatch("getComments", comment.articleNo);
        },
        async (error) => {
          console.log(
            "modifyComment() error code [] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async deleteC({ commit, dispatch }, param) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(param);
      await deleteComment(
        param,
        async ({ data }) => {
            await dispatch("getComments", param.articleNo); // 삭제 후 댓글 목록 다시 불러옴
        },
        async (error) => {
          console.log(
            "delete Comment () error code [] ::: ",
            error.response.status
          );
        }
      );
    },
  },
};

export default commentStore;
