// import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  getBoardList,
  showBoardDetail,
  writeBoard,
  modifyBoard,
  deleteBoard,
  recommendBoard,
  decreaseCommentCnt,
} from "@/api/board";
// import http from "@/api/http.js";
const boardStore = {
  namespaced: true,
  state: {
    type: "notice",
    pgno: "1",
    key: "",
    word: "",
    boards: null,
    board: null,
    now: null,
    navigation: null,
  },
  getters: {
    checkBoards: function (state) {
      return state.boards;
    },
  },
  mutations: {
    SET_TYPE: (state, type) => {
      state.type = type;
    },
    SET_PGNO: (state, pgno) => {
      state.pgno = pgno;
    },
    SET_KEY: (state, key) => {
      state.key = key;
    },
    SET_WORD: (state, word) => {
      state.word = word;
    },
    SET_BOARDS: (state, boards) => {
      state.boards = boards;
    },
    SET_BOARD: (state, board) => {
      state.board = board;
    },
    SET_NOW: (state, now) => {
      state.now = now;
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation;
    },
  },
  actions: {
    async getBoards({ commit }, { search }) {
      console.log(search);
      await getBoardList(
        { search },
        ({ data }) => {
          commit("SET_TYPE", data.type); // 공지사항인지 일반 게시글인지
          commit("SET_PGNO", data.pgno);
          commit("SET_KEY", data.key);
          commit("SET_WORD", data.word);
          commit("SET_BOARDS", data.list);
          commit("SET_NAVIGATION", data.navigation);
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log("getboards() error code [] ::: ", error.response.status);
        }
      );
    },
    async getBoard({ commit }, articleNo) {
      console.log(articleNo);
      await showBoardDetail(
        articleNo,
        ({ data }) => {
          commit("SET_BOARD", data.board);
          console.log("3. getBoard data >> ", data);
        },
        async (error) => {
          console.log("getboards() error code [] ::: ", error.response.status);
        }
      );
    },
    async write({ commit, dispatch }, board) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(board);
      await writeBoard(
        board,
        async ({ data }) => {
          if (data.message === "success") {
            await dispatch("getBoards");
            // commit("SET_USER_INFO", data.userInfo);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("게시판 글쓰기 불가능!!!!");
          }
        },
        async (error) => {
          console.log(
            "writeBoard() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async modify({ commit, dispatch }, board) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(board);
      await modifyBoard(
        board,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_BOARD", data.board);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "modifyBoard() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async deleteB({ state, commit, dispatch }, articleNo) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(articleNo);
      await deleteBoard(
        articleNo,
        async ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            commit("SET_BOARD", null);
            const search = {
              type: state.type,
              pgno: state.pgno,
              key: state.key,
              word: state.word,
            };
            await dispatch("getBoards", { search }); // 삭제 후 게시글 목록으로 이동
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(error);
          console.log(
            "delete Board() error code [] ::: "
            // error.response.status
          );
        }
      );
    },
    async recommend({ commit, dispatch }, { param }) {
      console.log(param);
      await recommendBoard(
        { param },
        async ({ data }) => {
          await await dispatch("getBoard", param.articleNo); // 게시글 다시 불러오기
          console.log("recommend Board>> ", param);
        },
        async (error) => {
          console.log(
            "recommend Board error code [] ::: ",
            error.response.status
          );
        }
      );
    },
    async decreaseComments({ commit, dispatch }, articleNo) {
      console.log(articleNo);
      await decreaseCommentCnt(
        articleNo,
        async ({ data }) => {
          await dispatch("getBoard", articleNo); // 게시글 다시 불러오기
          console.log("decrease comment >> ", articleNo);
        },
        async (error) => {
          console.log(
            "decrease comment error code [] ::: ",
            error.response.status
          );
        }
      );
    },
  },
};

export default boardStore;
