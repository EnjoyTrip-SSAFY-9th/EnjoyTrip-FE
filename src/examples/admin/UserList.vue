<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import MaterialButton from "@/components/MaterialButton.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import http from "@/api/http.js";

const router = useRouter();
const store = useStore();

//검색에 필요한 pgno, key, word
const search = reactive({
  pgno: "1",
  key: "",
  word: "",
});

// getUsers로 받은 데이터 맵
// const map = ref("");
const navigation = computed(() => store.state.adminStore.navigation);
const users = computed(() => store.state.adminStore.users);

// const showTime = computed(() => map.users.user);
// getUsers();
// //회원 목록 가져오는 함수
// async function getUsers() {
//   console.log(search);
//   await http.get(`/admin/users`, search).then(({ data }) => {
//     map = data;
//     console.log(map.navigation.navigator);
//   });
// }
//한글 입력 바인딩 처리
function changeWord(e) {
  search.word = e.target.value;
  console.log(search);
}
// 회원 검색
async function searchUser() {
  await store.dispatch("adminStore/getUsersInfo", { search });
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
  search.pgno = pgno;
  console.log(search);
  await store.dispatch("adminStore/getUsersInfo", { search });
}

//회원 강제 탈퇴 -> 로그인중인 유저를 강제 탈퇴 시키면 어떻게 되지?
async function deleteUser(id) {
  await store.dispatch("adminStore/deleteUserByAdmin", id);
}
</script>
<template>
  <div class="container" data-aos="fade-up">
    <div class="row no-gutters" style="background-color: white">
      <div class="p-5 text-center">
        <h3 class="my-5 fw-bold">회원목록</h3>
        <div class="w-75 mx-auto mb-3">
          <div class="col-md-7 offset-5">
            <form
              class="d-flex justify-content-center"
              id="form-search"
              @submit.prevent
            >
              <!-- <input type="hidden" name="pgno" value="1" /> -->
              <select
                v-model="search.key"
                id="key"
                class="form-select form-select-sm ms-5 me-1 w-50"
                aria-label="검색조건"
              >
                <option selected>검색조건</option>
                <option value="userName">이름</option>
                <option value="userId">아이디</option>
                <option value="email">이메일</option>
              </select>
              <div
                class="input-group input-group-sm justify-conent-center"
                style="width: 300px"
              >
                <input
                  type="text"
                  :value="search.word"
                  @input="changeWord"
                  id="word"
                  class="form-control"
                  placeholder="검색어..."
                />
                <button
                  id="btn-search"
                  class="btn btn-info"
                  type="button"
                  v-on:click="searchUser()"
                >
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>
        <table class="table table-hover w-75 m-auto mb-3">
          <thead class="table-info">
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>아이디</th>
              <th>이메일</th>
              <th>가입일자</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="userinfo">
            <tr v-for="(user, index) in users" :key="user.id">
              <td v-text="index + 1"></td>
              <td v-text="user.name"></td>
              <td v-text="user.id"></td>
              <td v-text="user.email"></td>
              <td>{{ user.joinDate }}</td>
              <td>
                <button
                  v-if="!user.isAdmin"
                  class="btn btn-outline-danger btn-sm"
                  id="btn-del"
                  v-on:click="deleteUser(user.id)"
                >
                  삭제
                </button>
              </td>
            </tr>
            <!-- <c:forEach var="user" items="${users}" varStatus="vs">
              <tr>
                <td>${vs.count}</td>
                <td>${user.name}</td>
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td>${user.joinDate}</td>
                <td>
                  <form id="form-del" method="get" @submit.prevent>
                    <input type="hidden" name="userId" value="${user.id}" /> -->
            <!-- <button
                      class="btn btn-outline-danger btn-sm"
                      id="btn-del"
                      v-on:click="deleteUser()"
                    >
                      삭제
                    </button>
                  </form> 
                </td>
              </tr>
            </c:forEach> -->
          </tbody>
        </table>
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
            class="page-link bg-info"
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
  <form id="form-param" method="get" action="">
    <input type="hidden" name="pgno" id="pgno" :value="search.pgno" />
    <input type="hidden" name="key" :value="search.key" />
    <input type="hidden" name="word" :value="search.word" />
  </form>
  <!-- <form id="form-no-param" method="get">
    <input type="hidden" name="pgno" id="pgno" :value="search.pgno" />
    <input type="hidden" name="key" :value="search.key" />
    <input type="hidden" name="word" :value="search.word" />
    <input type="hidden" id="userid" name="userId" value="" />
  </form> -->
</template>
