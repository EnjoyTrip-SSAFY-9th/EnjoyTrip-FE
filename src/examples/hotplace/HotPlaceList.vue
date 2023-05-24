<script setup>
import { ref } from "vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import MaterialButton from "@/components/MaterialButton.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import HotPlaceDetail from "./HotPlaceDetail.vue";
import http from "@/api/http.js";

const router = useRouter();
const store = useStore();
const backend_base_url = import.meta.env.VITE_BACKEND_BASE_URL;
//검색에 필요한 pgno, key, word
const selectedItem = reactive({
  sort: "기본",
  pgno: "1",
  key: "",
  word: "",
});
const sortValue = ref({
  기본: "hotplace_no",
  추천수: "recommendation",
  작성일: "date",
});
const keyValue = ref({
  장소: "title",
  작성자: "username",
  내용: "content",
});
const sortItems = ref(["기본", "추천수", "작성일"]);
const searchItems = ref(["장소", "작성자", "내용"]);

// getUsers로 받은 데이터 맵
// const map = ref("");
const navigation = computed(() => store.state.hotplaceStore.navigation);
const articles = computed(() => store.state.hotplaceStore.hotplaces);
// const showTime = computed(() => map.users.user);
// getUsers();
// //회원 목록 가져오는 함수
// async function getUsers() {
//   console.log(search);
//   await http.get(/admin/users, search).then(({ data }) => {
//     map = data;
//     console.log(map.navigation.navigator);
//   });
// }

//한글 입력 바인딩 처리
function changeWord(e) {
  selectedItem.word = e.target.value;
  console.log(selectedItem);
}
// 회원 검색
async function searchHotPlace() {
  // search.sort = sortValue.value[search.sort];
  // if (search.key != "") search.key = keyValue.value[search.key];
  const search = {
    sort: sortValue.value[selectedItem.sort],
    pgno: selectedItem.pgno,
    key: keyValue.value[selectedItem.key],
    word: selectedItem.word,
  };
  if (search.key == undefined) search.key = "";
  console.log(search);
  await store.dispatch("hotplaceStore/gethotplaces", { search });
}
//게시글 상세보기
async function detail(articleNo) {
  console.log(articleNo);
  await store.dispatch("hotplaceStore/gethotplace", articleNo);
  router.push("/hotplace/detail");
}
//페이지 이동
async function pageClick(pgno, key) {
  console.log(pgno, key);
  console.log(navigation.value.startRange);
  if (key == "before") {
    if (navigation.value.startRange) {
      pgno = 1;
    } else pgno = pgno - 1;
  }
  if (key == "next") {
    if (!navigation.value.endRange) {
      pgno = pgno + 1;
    }
  }
  selectedItem.pgno = pgno;
  console.log(selectedItem);
  const search = {
    sort: sortValue.value[selectedItem.sort],
    pgno: selectedItem.pgno,
    key: keyValue.value[selectedItem.key],
    word: selectedItem.word,
  };
  if (search.key == undefined) search.key = "";
  console.log(search);
  await store.dispatch("hotplaceStore/gethotplaces", { search });
}
//글작성
function writeHotPlace() {
  router.push("/hotplace/write");
}
//핫플 글 삭제
async function deleteEvent(hotplaceNo) {
  await store.dispatch("hotplaceStore/deleteH", hotplaceNo);
}
//핫플 글 추천
async function recommendEvent(hotplaceNo) {
  await store.dispatch("hotplaceStore/recommend", hotplaceNo);
}
</script>

<template>
  <!-- <img
    :src="
      'http://localhost:80/resources/upload/' +
      article.saveFolder +
      '/' +
      article.saveFile
    "
  /> -->
  <div class="container" data-aos="fade-up">
    <div class="row no-gutters" style="background-color: white">
      <div class="p-5 text-center">
        <h3 class="my-5 fw-bold">핫플레이스</h3>
        <!-- <div>
          <hr class="border border-primary" />
          <h4>인기 핫플레이스 TOP 3</h4>
          <hr class="border border-primary" />
        </div>
        <div class="row">
          <HotPlaceDetail
            v-for="(article, index) in hotTop3"
            :key="article.commentNo"
            :article="article"
            :index="index"
            :backend_base_url="backend_base_url"
            :user-id="store.state.userStore.userInfo.id"
            @delete-event="deleteEvent"
            @recommend-event="recommendEvent"
          ></HotPlaceDetail>
        </div> -->
        <div class="row">
          <div class="col-lg-2" v-if="store.state.userStore.isLogin">
            <button
              id="btn-search"
              class="btn btn-primary"
              type="button"
              v-on:click="writeHotPlace"
            >
              등록
            </button>
          </div>
          <div class="col-lg-3"></div>
          <div class="col-lg-7 align-self-end">
            <div class="row">
              <div class="col-lg-3 m-0 p-0">
                <v-select
                  v-model="selectedItem.sort"
                  :items="sortItems"
                  label="정렬 기준"
                  required
                  @input="searchHotPlace"
                ></v-select>
              </div>
              <div class="col-lg-3 m-0 p-0">
                <v-select
                  v-model="selectedItem.key"
                  :items="searchItems"
                  label="검색 조건"
                  required
                ></v-select>
              </div>
              <div class="col-lg-6">
                <form
                  class="d-flex justify-content-center"
                  id="form-search"
                  @submit.prevent
                >
                  <!-- <input type="hidden" name="pgno" value="1" /> -->
                  <!-- <select
                    v-model="search.key"
                    id="key"
                    class="form-select form-select-sm mr-5 w-20"
                    aria-label="검색조건"
                  >
                    <option selected>검색조건</option>
                    <option value="title">장소</option>
                    <option value="username">작성자</option>
                    <option value="content">내용</option>
                  </select> -->
                  <div
                    class="input-group input-group-sm justify-conent-center"
                    style="width: 300px"
                  >
                    <input
                      type="text"
                      :value="selectedItem.word"
                      @input="changeWord"
                      id="word"
                      class="form-control border border-dark"
                      placeholder="검색어..."
                    />
                    <v-btn
                      color="pink-darken-1"
                      class="mx-3"
                      v-on:click="searchHotPlace()"
                    >
                      검색
                    </v-btn>
                    <!-- <button
                  id="btn-search"
                  class="btn btn-primary"
                  type="button"
                  v-on:click="searchHotPlace()"
                >
                  검색
                </button> -->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr class="border border-dark" />
        <div class="container">
          <div class="row">
            <HotPlaceDetail
              v-for="(article, index) in articles"
              :key="article.commentNo"
              :article="article"
              :index="index"
              :backend_base_url="backend_base_url"
              :user-id="store.state.userStore.userInfo.id"
              @delete-event="deleteEvent"
              @recommend-event="recommendEvent"
            ></HotPlaceDetail>
          </div>
        </div>
        <hr class="border border-dark m-0" />
      </div>
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a href="#" class="page-link" v-on:click="pageClick('1', 'first')"
            >최신</a
          >
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            v-on:click="pageClick(navigation.navigator[0], 'before')"
            >이전</a
          >
        </li>
        <li
          v-for="(page, index) in navigation.navigator"
          :key="index"
          class="page-item"
        >
          <a
            href="#"
            class="page-link bg-danger"
            v-on:click="pageClick(page, '')"
            v-if="page == navigation.currentPage"
            >{{ page }}</a
          >
          <a
            href="#"
            class="page-link"
            v-on:click="pageClick(page, '')"
            v-if="page != navigation.currentPage"
            >{{ page }}</a
          >
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            v-on:click="
              pageClick(
                navigation.navigator[navigation.navigator.length - 1],
                'next'
              )
            "
            >다음</a
          >
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            v-on:click="pageClick(navigation.totalPageCount, 'last')"
            >마지막</a
          >
        </li>
      </ul>
      <!-- <div v-html="navigation.navigator"></div> -->
    </div>
  </div>
  <!-- <form id="form-param" method="get" action="">
    <input type="hidden" name="pgno" id="pgno" :value="search.pgno" />
    <input type="hidden" name="key" :value="search.key" />
    <input type="hidden" name="word" :value="search.word" />
  </form> -->
  <!-- <form id="form-no-param" method="get">
    <input type="hidden" name="pgno" id="pgno" :value="search.pgno" />
    <input type="hidden" name="key" :value="search.key" />
    <input type="hidden" name="word" :value="search.word" />
    <input type="hidden" id="userid" name="userId" value="" />
  </form> -->
</template>
<style scoped>
img {
  width: 300px;
  height: 300px;
}
</style>
