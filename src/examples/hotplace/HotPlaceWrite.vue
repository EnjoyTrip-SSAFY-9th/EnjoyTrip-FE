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

// 나중에 지역별 관광지->핫플 등록으로 넘어오는 경우 데이터 가져오는 작업 필요
const article = reactive({
  title: store.state.hotplaceStore.hotplace.title,
  content: "",
  address: store.state.hotplaceStore.hotplace.address,
  userId: store.state.userStore.userInfo.id,
});
const click = reactive({
  show: false,
});
const image = reactive({
  file: null,
  preview: null,
});
//이미지 파일 저장
function onInputImg(e) {
  image.file = e.target.files[0];
  image.preview = URL.createObjectURL(image.file);
  console.log(image);
}

function updateTitle(e) {
  article.title = e.target.value;
  console.log(article);
}
function updateContent(e) {
  article.content = e.target.value;
  console.log(article);
}
function updateAddress(e) {
  article.address = e.target.value;
  console.log(article);
}
//글쓰기 완료
async function write() {
  console.log(article);
  await store.dispatch("hotplaceStore/write", article);
  const formData = new FormData();
  formData.append("upfile", image.file);
  // formData.append('hotplaceDto', JSON.stringify(article));
  formData.append("hotplaceNo", store.state.hotplaceStore.hotplace.hotplaceNo);
  console.log(store.state.hotplaceStore.hotplace.hotplaceNo);
  await store.dispatch("hotplaceStore/writeFile", formData);
  router.push("/hotplace");
}
//등록 취소
async function handleReset() {
  const hotplace = {
    title: "",
    address: "",
  };
  await store.commit("hotplaceStore/SET_HOTPLACE", hotplace);
  router.push("/hotplace");
}
</script>

<template>
  <section
    id="about"
    class="about"
    style="background-color: #f5f9fc; padding-bottom: 60px"
  >
    <div class="m-5"></div>
    <div class="container p-5" data-aos="fade-up">
      <div class="row no-gutters" style="background-color: white">
        <div class="p-5">
          <!-- ===== update start ===== -->
          <div class="modal-header mb-3">
            <h4 class="modal-title">
              <h3 class="fw-bold border-bottom border-primary border-5">
                나만의 핫플레이스
              </h3>
            </h4>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <form @submit.prevent="submit">
                <v-text-field
                  :model-value="article.title"
                  :counter="50"
                  @input="updateTitle"
                  label="장소"
                ></v-text-field>

                <v-text-field
                  :model-value="article.address"
                  :counter="100"
                  @input="updateAddress"
                  label="주소"
                ></v-text-field>

                <v-textarea
                  :model-value="article.content"
                  @input="updateContent"
                  label="내용"
                ></v-textarea>
                <v-file-input
                  label="사진 등록"
                  @change="onInputImg"
                ></v-file-input>
                <v-btn
                  class="me-4"
                  type="button"
                  color="pink-darken-1"
                  @click="write"
                >
                  등록하기
                </v-btn>

                <v-btn color="red-lighten-1" @click="handleReset"> 취소 </v-btn>
              </form>
            </div>
            <div class="col-lg-6">
              <h4 class="offset-lg-3">미리보기</h4>
              <v-card class="mx-auto" max-width="344">
                <v-img
                  :src="image.preview"
                  height="200px"
                  cover
                  @click="test"
                ></v-img>

                <v-card-title> {{ article.title }} </v-card-title>

                <v-card-subtitle> {{ article.address }} </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange-lighten-2" variant="text">
                    {{ store.state.userStore.userInfo.name }} 님
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                    :icon="click.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="click.show = !click.show"
                  ></v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="click.show">
                    <v-divider></v-divider>

                    <v-card-text>
                      {{ article.content }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </div>
          </div>
        </div>
        <!-- update end -->
      </div>
    </div>
  </section>
</template>
