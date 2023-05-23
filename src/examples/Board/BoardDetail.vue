<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import MaterialButton from "@/components/MaterialButton.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import CommentItem from "@/examples/Comment/CommentItem.vue";
import http from "@/api/http.js";

const router = useRouter();
const store = useStore();

//검색에 필요한 pgno, key, word
const search = {
  type: store.state.boardStore.type,
  pgno: store.state.boardStore.pgno,
  key: store.state.boardStore.key,
  word: store.state.boardStore.word,
};

// getUsers로 받은 데이터 맵
// const map = ref("");
const navigation = computed(() => store.state.boardStore.navigation);
const article = computed(() => store.state.boardStore.board);
const comments = computed(() => store.state.commentStore.comments);
const comment = reactive({
  userId: store.state.userStore.userInfo.id,
  articleNo: store.state.boardStore.board.articleNo,
  content: "",
});
const upVote = reactive({
  click: false,
});

//글목록으로 가기
function list() {
  router.push("/board/list");
}

//댓글 작성
async function writeComment() {
  console.log(comment);
  await store.dispatch("commentStore/write", comment); // 댓글 쓰기
  await store.dispatch(
    "boardStore/getBoard",
    store.state.boardStore.board.articleNo
  ); // 글 다시 불러오기
  comment.content = "";
}

//한글 입력 처리
function updateComment(e) {
  comment.content = e.target.value;
  console.log(comment);
}

//마우스 커서 바꾸기
function changeCursor() {
  document.body.style.cursor = "pointer";
}

function restoreCursor() {
  document.body.style.cursor = "auto";
}
//글 수정
function modify() {
  router.push("/board/update"); // 글 수정하는 페이지로 이동
}

//글 삭제
async function deleteB() {
  await store.dispatch(
    "boardStore/deleteB",
    store.state.boardStore.board.articleNo
  ); // 글 삭제
  router.push("/board"); // 글 목록으로 이동
}

//추천 누르기
async function recommend() {
  upVote.click = true;
  const param = {
    userId: store.state.userStore.userInfo.id,
    articleNo: store.state.boardStore.board.articleNo,
  };
  await store.dispatch("boardStore/recommend", { param }); // 글 추천 수 갱신
}
</script>

<template>
  <section
    id="about"
    class="about"
    style="background-color: #f5f9fc; padding-bottom: 60px"
  >
    <div class="container" data-aos="fade-up">
      <div class="row no-gutters" style="background-color: white">
        <div class="px-5 mb-3">
          <div class="row">
            <div class="col-lg-6 modal-header mb-3">
              <h4 class="modal-title">
                <label class="fw-bold border-bottom border-warning border-5"
                  >글 보기</label
                >
              </h4>
            </div>
            <div class="col-lg-6 d-flex justify-content-end mt-3 px-3">
              <button
                type="button"
                id="btn-list"
                class="btn btn-outline-dark btn-sm me-1"
                v-on:click="list"
              >
                글목록
              </button>
              <div v-if="store.state.userStore.userInfo.id == article.userId">
                <button
                  type="button"
                  id="btn-mv-modify"
                  class="btn btn-outline-success btn-sm"
                  v-on:click="modify"
                >
                  수정
                </button>
                <button
                  type="button"
                  id="btn-delete"
                  class="btn btn-outline-danger btn-sm ms-1"
                  v-on:click="deleteB"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>

          <div>
            <div class="mb-1">
              <div
                class="d-inline bg-danger opacity-8 px-1 py-2"
                v-if="article.isnotice"
              >
                <h5 class="d-inline text-white">공지</h5>
              </div>
              &nbsp;
              <h3 class="d-inline" v-text="article.subject"></h3>
            </div>
            <div class="">
              <img src="@/assets/img/user.png" class="w-5" />
              <div class="d-inline">
                <h5 class="d-inline">{{ article.userName }}</h5>
                &nbsp;
                <h6
                  class="d-inline text-secondary font-weight-light"
                  v-if="article.isnotice"
                >
                  관리자
                </h6>
              </div>
              <div>
                <label for="id" class="form-labe font-weight-light">{{
                  article.date
                }}</label>
                &nbsp;
                <label for="id" class="form-labe font-weight-light"
                  >조회 {{ article.hit }}</label
                >
              </div>
            </div>
            <hr class="m-0 bg-dark" />
            <div class="mb-3 row">
              <!-- <div class="col-md-6">
									<label for="hit" class="form-label">조회수:</label> <input
										type="text" class="form-control" id="hit" :value="article.hit"
										name="hit" readonly="readonly" />
								</div> -->
              <!-- <div class="col-md-6">
									<label for="hit" class="form-label">추천수:</label> <input
										type="text" class="form-control" id="recommendation" :value="article.recommendation"
										name="hit" readonly="readonly" />
								</div> -->
              <!-- <div class="col-md-6">
									<label for="date" class="form-label">작성일:</label> <input
										type="text" class="form-control" id="date"
										:value="article.date" name="date" readonly="readonly" />
								</div> -->
            </div>
            <div class="mb-4">
              <!-- <label for="content" class="form-label">내용:</label> -->
              <textarea
                class="form-control p-2"
                rows="10"
                name="content"
                readonly="readonly"
                >{{ article.content }}</textarea
              >
            </div>
            <div class="d-inline">
              <div class="d-inline">
                <!-- <img src="@/assets/img/heart6.png" class="w-2 mb-2" /> -->
                <v-btn
                  size="middle"
                  color="red-lighten-1"
                  variant="text"
                  icon="mdi-heart"
                  @click="recommend"
                  @mouseover="changeCursor"
                  @mouseout="restoreCursor"
                ></v-btn>
                <h6 class="d-inline font-weight-light">
                  좋아요&nbsp;{{ article.recommendation }}
                </h6>
              </div>
              &nbsp;
              <div class="d-inline">
                <img src="@/assets/img/comment1.png" class="w-2 mb-2" />
                <h6 class="d-inline px-1 font-weight-light">
                  댓글&nbsp;{{ article.comment }}
                </h6>
              </div>
            </div>
          </div>
          <hr class="bg-dark m-0" />
        </div>
        <div class="px-5">
          <h4>댓글</h4>
          <comment-item
            v-for="(comment, index) in comments"
            :key="comment.commentNo"
            :comment="comment"
          >
          </comment-item>
        </div>
        <div class="mt-1 px-5">
          <div class="border border-dark">
            <h5
              class="mt-1 px-2 font-weight-bold"
              v-text="store.state.userStore.userInfo.name"
            ></h5>
            <div>
              <textarea
                class="form-control mt-1 px-2"
                rows="2"
                placeholder="댓글을 남겨보세요"
                :value="comment.content"
                @input="updateComment"
              ></textarea>
            </div>
            <div class="col-lg-2 offset-lg-10 px-3">
              <MaterialButton
                class="my-4 mb-2"
                variant="gradient"
                color="dark"
                fullWidth
                v-on:click="writeComment(store.state.userStore.userInfo.id)"
                >등록</MaterialButton
              >
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-3 px-5">
          <button
            type="button"
            id="btn-list"
            class="btn btn-outline-dark btn-sm me-1"
            v-on:click="list()"
          >
            글목록
          </button>
          <div v-if="store.state.userStore.userInfo.id == article.userId">
            <button
              type="button"
              id="btn-mv-modify"
              class="btn btn-outline-success btn-sm"
              v-on:click="modify"
            >
              수정
            </button>
            <button
              type="button"
              id="btn-delete"
              class="btn btn-outline-danger btn-sm ms-1"
              v-on:click="deleteB"
            >
              삭제
            </button>
          </div>
        </div>
        <!-- update end -->
      </div>
    </div>
  </section>
</template>
<style scoped>
.name {
  width: 10px;
  height: 10px;
}
</style>
