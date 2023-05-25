<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { routerKey } from "vue-router";
import { useStore } from "vuex";
//검색에 필요한 pgno, key, word
const route = useRoute();
const router = useRouter();
const store = useStore();

const search = reactive({
  type: "notice",
  sort: "article_no",
  pgno: "1",
  key: "",
  word: "",
});
//공지 보기
async function notice() {
  search.type = "notice";
  await store.commit("boardStore/SET_TYPE", "notice");
  await store.commit("boardStore/SET_SORTNAME", "기본");
  await store.commit("boardStore/SET_SORT", "article_no");
  await store.commit("boardStore/SET_PGNO", "1");
  await store.commit("boardStore/SET_KEY", "");
  await store.commit("boardStore/SET_WORD", "");
  console.log(route.path);
  if (route.path != "/board/list") router.push("/board");
  // 글목록으로 이동
  else await store.dispatch("boardStore/getBoards", { search }); // 글만 다시 가져옴
}
//일반 여행 정보 공유 게시글 보기
async function board() {
  search.type = "board";
  await store.commit("boardStore/SET_TYPE", "board");
  await store.commit("boardStore/SET_SORTNAME", "기본");
  await store.commit("boardStore/SET_SORT", "article_no");
  await store.commit("boardStore/SET_PGNO", "1");
  await store.commit("boardStore/SET_KEY", "");
  await store.commit("boardStore/SET_WORD", "");
  console.log(route.path);
  if (route.path != "/board/list") router.push("/board");
  else await store.dispatch("boardStore/getBoards", { search });
}
</script>
<template>
  <section class="pt-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mx-auto">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill p-1" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link mb-0 px-0 py-1 active"
                  data-bs-toggle="tab"
                  href="#"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                  v-on:click="notice()"
                >
                  공지사항
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link mb-0 px-0 py-1"
                  data-bs-toggle="tab"
                  href="#"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                  v-on:click="board()"
                >
                  여행 정보
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
