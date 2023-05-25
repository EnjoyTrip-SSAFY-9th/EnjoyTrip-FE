import http from "./http.js";

const api = http;

async function getBoardList({ search }, success, fail) {
  await api
    .get(`/board/`, {
      params: {
        type: search.type,
        sort: search.sort,
        pgno: search.pgno,
        key: search.key,
        word: search.word,
      },
    })
    .then(success)
    .catch(fail);
}

async function showBoardDetail(articleNo, success, fail) {
  await api.get(`/board/${articleNo}`).then(success).catch(fail);
}

async function writeBoard(board, success, fail) {
  await api.post(`/board/`, board).then(success).catch(fail);
}

async function modifyBoard(board, success, fail) {
  await api.put(`/board/`, board).then(success).catch(fail);
}

async function deleteBoard(articleNo, success, fail) {
  await api.delete(`/board/${articleNo}`).then(success).catch(fail);
}

async function recommendBoard({ param }, success, fail) {
  console.log(param);
  await api
    .get(`/board/recommend/${param.articleNo}`, {
      params: { userId: param.userId, articleNo: param.articleNo },
    })
    .then(success)
    .catch(fail);
}

async function decreaseCommentCnt(articleNo, success, fail) {
  await api.put(`/board/${articleNo}`).then(success).catch(fail);
}

export {
  getBoardList,
  showBoardDetail,
  writeBoard,
  modifyBoard,
  deleteBoard,
  recommendBoard,
  decreaseCommentCnt,
};
