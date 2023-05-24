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
const article = reactive({
  articleNo: store.state.boardStore.board.articleNo,
  subject: store.state.boardStore.board.subject,
  content: store.state.boardStore.board.content,
  isnotice: store.state.boardStore.board.isnotice,
  userId: store.state.userStore.userInfo.id,
});
function setType() {
  if (article.isnotice == 0) article.isnotice = 1;
  else article.isnotice = 0;
}
function updateSubject(e) {
  article.subject = e.target.value;
  console.log(article);
}
function updateContent(e) {
  article.content = e.target.value;
  console.log(article);
}
//글수정 완료
async function modify() {
  console.log(article);
  await store.dispatch("boardStore/modify", article);
  router.push("/board/detail");
}
//글수정 취소
function stop() {
  router.push("/board/detail");
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
        <div class="p-5">
          <!-- ===== update start ===== -->
          <div class="modal-header mb-3">
            <h4 class="modal-title">
              <label class="fw-bold border-bottom border-warning border-5"
                >글 수정</label
              >
            </h4>
          </div>
          <div>
            <form
              role="form"
              id="contact-form"
              method="post"
              autocomplete="off"
              @submit.prevent
            >
              <div class="mb-3">
                <label for="id" class="form-label">작성자:</label>
                <input
                  type="text"
                  class="form-control"
                  id="id"
                  :value="article.userId"
                  name="userId"
                  readonly="readonly"
                />
              </div>
              <!-- <div class="mb-3" v-if="store.state.userStore.userInfo.isAdmin">
                <input type="checkbox" name="isnotice" @click="setType"/>
      			<label for="isnotice">공지</label>
              </div> -->
              <div class="mb-3">
                <label for="subject" class="form-label">제목:</label>
                <!-- <input type="text" class="form-control" id="subject" name="subject" :value="article.sub
                " @input="updateSubject" /> -->
                <input
                  type="text"
                  class="form-control"
                  name="subject"
                  :value="article.subject"
                  v-on:keyup="updateSubject"
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">내용:</label>
                <textarea
                  class="form-control"
                  rows="10"
                  name="content"
                  :value="article.content"
                  @input="updateContent"
                ></textarea>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  id="btn-register"
                  class="btn btn-outline-primary btn-sm me-1"
                  v-on:click="modify"
                >
                  수정하기
                </button>
                <button
                  type="button"
                  id="btn-register"
                  class="btn btn-outline-danger btn-sm me-1"
                  v-on:click="stop"
                >
                  취소
                </button>
                <!-- <button type="button" id="btn-list" class="btn btn-outline-dark btn-sm">
              목록으로이동
            </button> -->
              </div>
            </form>
          </div>
        </div>
        <!-- update end -->
      </div>
    </div>
  </section>
</template>
