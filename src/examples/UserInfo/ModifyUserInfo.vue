<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
// import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { computed } from "vue";
import { useStore } from "vuex";
//  material-input
import setMaterialInput from "@/assets/js/material-input";
import http from "@/api/http.js";

onMounted(() => {
  setMaterialInput();
});
const router = useRouter();
const store = useStore();

//사용자
const user = reactive({
  id: store.state.userStore.userInfo.id,
  name: store.state.userStore.userInfo.name,
  email: store.state.userStore.userInfo.email,
});
// const user = reactive({
//   id: "eunby",
//   name: "",
//   email: "",
// });
//에러 유형
const error = reactive({
  name: "",
  email: "",
});
//에러 메세지
const errorMSG = {
  name: {
    length: "이름은 2자 이상 6자 미만이어야 합니다.",
    type: "이름에 특수문자는 사용할 수 없습니다.",
  },
  email: {
    length: "이메일을 입력해주세요.",
    type: "이메일 양식이 잘못되었습니다.",
  },
};

//특수문자 사용 여부 확인하는 함수
function characterCheck(key) {
  var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  // 허용할 특수문자는 여기서 삭제하면 됨
  // 지금은 띄어쓰기도 특수문자 처리됨
  if (regExp.test(user[key])) {
    error[key] = "type";
  }
}

function updateData(key) {
  error[key] = "";
  console.log(user);
  console.log(key);
  //error 여부 검사
  if (user[key] == "") {
    // 비어있는 경우
    error[key] = "length";
  }
  if (key == "name") {
    if (user[key].length < 2 || user[key].length >= 6) {
      // 2자 이상 6자 미만이 아닌 경우
      error[key] = "length";
    }
  }
  if (key == "name") characterCheck(key); // 아이디, 이름 특수문자 사용여부 확인
  if (key == "email") {
    if (!/^[^@]+@\w+(\.\w+)+\w$/.test(user[key])) {
      error[key] = "type";
    }
  }
  // console.log(error)
  //   console.log(user);
}
//회원가입 유효 검사
function checkValid() {
  if (error.name == "" && error.email == "") return true;
  return false;
}

//회원 정보 수정
async function modify() {
  //양식에 맞게 작성하였는지 검사
  if (!checkValid()) {
    return;
  }
  //   let token = sessionStorage.getItem("access-token");
  console.log(user);
  await store.dispatch("userStore/modifyUserInfo", user);
  router.push({ name: "mypage" });
}
</script>
<template>
  <section>
    <div class="container mt-5">
      <h3 class="">회원 정보 수정</h3>
      <div class="row border border-dark">
        <div class="col-lg-7 d-flex justify-content-center flex-column">
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
                <td>{{ user.id }}</td>
              </tr>
              <tr>
                <td>이름</td>
                <td>
                  <input v-model="user.name" v-on:keyup="updateData('name')" />
                </td>
                <td>
                  <span v-if="error.name != ''" class="error-message">
                    {{ errorMSG.name[error.name] }}
                  </span>
                </td>
              </tr>
              <!-- <tr>
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
              </tr> -->
              <tr>
                <td>이메일</td>
                <td>
                  <input
                    v-model="user.email"
                    v-on:keyup="updateData('email')"
                  />
                </td>
                <td>
                  <span v-if="error.email != ''" class="error-message">
                    {{ errorMSG.email[error.email] }}
                  </span>
                </td>
              </tr>
            </tbody>
            <!-- </form> -->
          </table>
          <div class="col col-lg-3 text-center">
            <MaterialButton
              class="my-4 mb-2"
              variant="gradient"
              color="dark"
              fullWidth
              v-on:click="modify()"
              >회원 정보 수정</MaterialButton
            >
          </div>
        </div>
      </div>
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
