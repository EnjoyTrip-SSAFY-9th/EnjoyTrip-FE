<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import http from "@/api/http.js";

const router = useRouter();
const store = useStore();
const userInfo = computed(() => store.state.userStore.userInfo);
//비밀번호 변경
function changePassword() {}
//회원정보 수정
function modifyUserInfo() {
  router.push({ name: "modify" });
}
//회원 탈퇴
function deleteUserInfo() {
  router.push({ name: "delete" });
}
</script>

<template>
  <div>
    <section class="section">
      <div class="container mt-5">
        <h3 class="mx-3">내 정보</h3>
        <div class="row justify-content-center">
          <!-- <div class="col-lg-3 text-center border border-dark mx-auto my-auto" ></div> -->
          <div class="col-lg-9 text-center border border-dark mx-auto my-auto">
            <table class="table">
              <tbody>
                <tr>
                  <td>아이디</td>
                  <td>{{ userInfo.id }}</td>
                </tr>
                <tr>
                  <td>이름</td>
                  <td>{{ userInfo.name }}</td>
                </tr>
                <tr>
                  <td>비밀번호</td>
                  <td>
                    <div class="row justify-content-center">
                      <div class="col col-lg-5">
                        <MaterialButton
                          class=""
                          variant="gradient"
                          color="dark"
                          fullWidth
                          v-on:click="changePassword()"
                          >비밀번호 변경</MaterialButton
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>이메일</td>
                  <td>{{ userInfo.email }}</td>
                </tr>
                <tr>
                  <td>가입일</td>
                  <td>{{ userInfo.joinDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row justify-content-center">
            <div class="col col-lg-3 text-center">
              <MaterialButton
                class="my-4 mb-2"
                variant="gradient"
                color="dark"
                fullWidth
                v-on:click="modifyUserInfo()"
                >회원 정보 수정</MaterialButton
              >
            </div>
            <div class="col col-lg-3 text-center">
              <MaterialButton
                class="my-4 mb-2"
                variant="gradient"
                color="danger"
                fullWidth
                v-on:click="deleteUserInfo()"
                >회원 탈퇴</MaterialButton
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
