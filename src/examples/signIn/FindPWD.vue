<script setup>
import MaterialInput from "@/components/MaterialInput.vue";
import { onMounted, reactive } from "vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import setMaterialInput from "@/assets/js/material-input";
import { toast } from "vue3-toastify";
import http from "@/api/http.js";

onMounted(() => {
  setMaterialInput();
});

const router = useRouter();
const store = useStore();

const confirm = reactive({
  password: "",
});
//사용자
const user = reactive({
  id: "",
});
const success = reactive({
  password: "",
});
//에러 유형
const error = reactive({
  password: "length",
});
//에러 메세지
const errorMSG = {
  password: {
    length: "아이디는 4자 이상 20자 미만이어야 합니다.",
    type: "비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다.",
  },
};

//한글 사용 여부 확인하는 함수
function koreanCheck(key) {
  var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 아이디, 비밀번호는 한글 불가능
  if (check.test(user[key])) {
    error[key] = "type";
  }
}
//비밀번호 일치 확인
function isSame() {
  // console.log(confirm.password);
  if (user.password === confirm.password) {
    success.password = "success";
    error.password = "";
  } else {
    success.password = "";
    error.password = "diff";
  }
}

function updateData(key) {
  // console.log(data, "  ", key);
  success[key] = "";
  error[key] = "";
  isSame();
  if (user[key] == "") {
    // 비어있는 경우
    error[key] = "length";
  }
  if (user[key].length < 4 || user[key].length >= 20) {
    // 4자 이상 20자 미만이 아닌 경우
    error[key] = "length";
  }
  koreanCheck(key);
}

// //유효 검사
// function checkValid() {
//   if (success.password == "success" && error.password == "") return true;
//   error.password = "diff";
//   return false;
// }
//비밀번호 변경
async function findPassword() {
  http.get(`/user/find/password/${user.id}`).then(({ data }) => {
    // 비밀번호 변경
    // console.log(" -> " + data);
    toast.success(
      "회원님의 아이디에 해당하는 이메일로 비밀번호 안내 메일을 드렸습니다.",
      {
        autoClose: 3000,
      }
    );
    router.push("/pages/landing-pages/basic"); // 로그인 페이지로 돌아가기
  });
}
</script>

<template>
  <section>
    <div class="m-5 p-5"></div>
    <div class="container mt-5">
      <div class="col col-lg-3 offset-lg-3">
        <h3>비밀번호 찾기</h3>
      </div>
      <div class="row justify-content-center">
        <div
          class="col col-lg-6 d-flex justify-content-center flex-column border border-dark"
        >
          <table class="table mt-3">
            <!-- <form
                role="form"
                id="contact-form"
                method="post"
                autocomplete="off"
                @submit.prevent
              > -->
            <tbody>
              <tr>
                <td>아이디</td>
                <td>
                  <input
                    type="text"
                    v-model="user.id"
                    v-on:keyup="updateData('id')"
                  />
                </td>
              </tr>
              <tr v-if="error.password != ''" class="error-message">
                <td></td>
                <td>
                  <span>
                    {{ errorMSG.password[error.password] }}
                  </span>
                </td>
              </tr>
            </tbody>
            <!-- </form> -->
          </table>
        </div>
      </div>
      <div class="col col-lg-2 offset-lg-7 text-center">
        <MaterialButton
          class="my-4 mb-2"
          variant="gradient"
          color="dark"
          fullWidth
          v-on:click="findPassword()"
          >비밀번호 찾기</MaterialButton
        >
      </div>
      <router-link
        to="/pages/landing-pages/basic"
        class="text-success text-gradient font-weight-bold"
        >로그인 페이지로 돌아가기</router-link
      >
    </div>
  </section>
</template>
<style scoped>
.success-message {
  color: rgba(57, 158, 240, 0.829);
  font-size: 14px;
}
.error-message {
  color: rgba(231, 78, 78, 0.829);
  font-size: 14px;
}
</style>
