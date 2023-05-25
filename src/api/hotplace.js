import http from "./http.js";

const api = http;

async function gethotplaceList({ search }, success, fail) {
  await api
    .get(`/hotplace/`, {
      params: {
        sort: search.sort,
        pgno: search.pgno,
        key: search.key,
        word: search.word,
      },
    })
    .then(success)
    .catch(fail);
}

async function getRecommendhotplaceList(userId, success, fail) {
  await api.get(`/hotplace/list/recommend/${userId}`).then(success).catch(fail);
}

async function showhotplaceDetail(hotplaceNo, success, fail) {
  await api.get(`/hotplace/${hotplaceNo}`).then(success).catch(fail);
}

async function writehotplace(hotplace, success, fail) {
  await api.post(`/hotplace/`, hotplace).then(success).catch(fail);
}
async function writehotplaceFile(formData, success, fail) {
  await api
    .post(`/hotplace/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

async function modifyhotplace(hotplace, success, fail) {
  await api.put(`/hotplace/`, hotplace).then(success).catch(fail);
}

async function deletehotplace(hotplaceNo, success, fail) {
  await api.delete(`/hotplace/${hotplaceNo}`).then(success).catch(fail);
}

async function recommendhotplace({ param }, success, fail) {
  await api
    .get(`/hotplace/recommend/${param.hotplaceNo}`, {
      params: { userId: param.userId, hotplaceNo: param.hotplaceNo },
    })
    .then(success)
    .catch(fail);
}

export {
  gethotplaceList,
  getRecommendhotplaceList,
  showhotplaceDetail,
  writehotplace,
  modifyhotplace,
  deletehotplace,
  recommendhotplace,
  writehotplaceFile,
};
