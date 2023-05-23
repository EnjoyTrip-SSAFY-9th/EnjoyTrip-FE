import http from "./http.js";

const api = http;

async function getCommentList(articleNo, success, fail) {
  console.log(articleNo);
  await api.get(`/comment/${articleNo}`).then(success).catch(fail);
}

async function writeComment(comment, success, fail) {
  await api.post(`/comment/`, comment).then(success).catch(fail);
}

async function modifyComment(comment, success, fail) {
  await api.put(`/comment/`, comment).then(success).catch(fail);
}

// @RequestParam으로 어떻게 넘겨야 되는 걸까
async function deleteComment(param, success, fail) {
  await api.delete(`/comment/${param.commentNo}`).then(success).catch(fail);
}

export { getCommentList, writeComment, modifyComment, deleteComment };
