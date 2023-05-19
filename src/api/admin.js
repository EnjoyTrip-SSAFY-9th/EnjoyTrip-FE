import http from "./http.js";

const api = http;

// @RequestParams와 매핑하는 법 : 바깥에 객체로 한번더 감싸서 매개변수로 전달하기!!
async function getUsers({ search }, success, fail) {
  await api
    .get(`/admin/users`, {
      params: { pgno: search.pgno, key: search.key, word: search.word },
    })
    .then(success)
    .catch(fail);
}

export { getUsers };
