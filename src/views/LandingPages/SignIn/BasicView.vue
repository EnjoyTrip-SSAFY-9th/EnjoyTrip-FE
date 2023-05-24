<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

import { toast } from "vue3-toastify";

onMounted(() => {
  setMaterialInput();
  getIDByCookie();
});
const router = useRouter();
const click = reactive({
  rememeberId: false,
});
const user = reactive({
  id: "",
  password: "",
});
const error = reactive({
  message: "",
});

function updateData(data, key) {
  console.log(click);
  user[key] = data;
  console.log(user);
}
//쿠키에서 저장된 아이디가 있으면 가져오는 함수
async function getIDByCookie() {
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");
  console.log(cookieArray);
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].split("=");
    const key = cookie[0];
    const value = cookie[1];

    if (key === "id") {
      user.id = value;
    }
  }
}

//아이디를 쿠키에 저장하는 함수
async function storeIDByCookie(id) {
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");
  document.cookie = `id=${id}`;
  // if (cookieArray.length == 0) {
  //   document.cookie = `id=${id}`;
  // } else {
  //   // 쿠키 배열에서 id 키를 찾음
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     const cookie = cookieArray[i].split("=");
  //     const cookieKey = cookie[0];

  //     if (cookieKey === "id") {
  //       const updatedCookie = `${cookieKey}=${id}`;
  //       document.cookie = updatedCookie; // 수정된 쿠키 값을 설정하여 업데이트
  //       break;
  //     }
  //   }
  // }
}

const store = useStore();
async function signIn() {
  console.log(user);
  await store.dispatch("userStore/userConfirm", user);
  let token = sessionStorage.getItem("access-token");
  console.log("1. confirm() token >> " + token);
  if (store.state.userStore.isLogin) {
    // 여기는 state commit 변경 사항이 잘 적용되는데..
    await store.dispatch("userStore/getUserInfo", token);
    // await this.getUserInfo(token);
    console.log("4. confirm() userInfo :: ", store.state.userStore.userInfo);
    if (store.state.userStore.userInfo.isAdmin) {
      toast.success(
        store.state.userStore.userInfo.id + "관리자 님 환영합니다!",
        {
          autoClose: 1000,
        }
      );
    } else {
      toast.success(store.state.userStore.userInfo.id + "님 환영합니다!", {
        autoClose: 1000,
      });
      // alert(store.state.userStore.userInfo.id + "님 환영합니다!");
    }
    if (click.rememeberId) {
      // 아이디 저장 필요함
      await storeIDByCookie(user.id);
      await getIDByCookie();
    }
    router.push({ name: "presentation" }); // 메인 페이지로 이동
  } else {
    error.message = "아이디 또는 비밀번호가 잘못되었습니다.";
  }
}
</script>
<template>
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1682936995637-51895022dcef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    로그인
                  </h4>
                  <!-- <div class="row mt-3">
                    <div class="col-2 text-center ms-auto">
                      <a class="btn btn-link px-3" href="javascript:;">
                        <i class="fa fa-facebook text-white text-lg"></i>
                      </a>
                    </div>
                    <div class="col-2 text-center px-1">
                      <a class="btn btn-link px-3" href="javascript:;">
                        <i class="fa fa-github text-white text-lg"></i>
                      </a>
                    </div>
                    <div class="col-2 text-center me-auto">
                      <a class="btn btn-link px-3" href="javascript:;">
                        <i class="fa fa-google text-white text-lg"></i>
                      </a>
                    </div>
                  </div> -->
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start" @submit.prevent>
                  <MaterialInput
                    id="id"
                    class="input-group-outline my-3 is-focused"
                    :label="{ text: 'id', class: 'form-label' }"
                    :user="user"
                    @updateData="updateData"
                    type="text"
                  />
                  <MaterialInput
                    id="password"
                    class="input-group-outline mb-3"
                    :label="{ text: 'password', class: 'form-label' }"
                    :user="user"
                    @updateData="updateData"
                    type="password"
                  />
                  <MaterialSwitch
                    class="d-flex align-items-center mb-3"
                    id="rememberMe"
                    labelClass="mb-0 ms-3"
                    @change="click.rememeberId = !click.rememeberId"
                    >아이디 저장</MaterialSwitch
                  >
                  <div class="error-message">
                    {{ error.message }}
                  </div>
                  <div class="offset-lg-8">
                    <router-link
                      to="/find/password"
                      class="text-success text-gradient font-weight-bold"
                      >비밀번호 찾기</router-link
                    >
                  </div>

                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      fullWidth
                      v-on:click="signIn()"
                      >로그인</MaterialButton
                    >
                  </div>
                  <p class="mt-4 text-sm text-center">
                    계정이 없으신가요?
                    <!-- <a
                      href="#"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</a
                    > -->
                    <router-link
                      to="/sections/input-areas/forms"
                      class="text-success font-weight-bold"
                      >회원가입</router-link
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div
                class="copyright text-center text-sm text-white text-lg-start"
              >
                © {{ new Date().getFullYear() }}, made with
                <i class="fa fa-heart" aria-hidden="true"></i> by
                <a
                  href="https://www.creative-tim.com"
                  class="font-weight-bold text-white"
                  target="_blank"
                  >Creative Tim</a
                >
                for a better web.
              </div>
            </div>
            <div class="col-12 col-md-6">
              <ul
                class="nav nav-footer justify-content-center justify-content-lg-end"
              >
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com"
                    class="nav-link text-white"
                    target="_blank"
                    >Creative Tim</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/presentation"
                    class="nav-link text-white"
                    target="_blank"
                    >About Us</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/blog"
                    class="nav-link text-white"
                    target="_blank"
                    >Blog</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/license"
                    class="nav-link pe-0 text-white"
                    target="_blank"
                    >License</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Header>
</template>
<style scoped>
.error-message {
  color: rgba(231, 78, 78, 0.829);
  font-size: 14px;
}
</style>
