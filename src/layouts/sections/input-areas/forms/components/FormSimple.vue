<script setup>
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from 'vue-router'
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";

//  material-input
import setMaterialInput from "@/assets/js/material-input";
import http from "@/api/http.js";

const router = useRouter();
onMounted(() => {
  setMaterialInput();
});
const user = reactive({
  id:"",
  password:"",
  name:"",
  email:"",
});

function updateData (data, key) {
  console.log(data, "  ", key);
  user[key] = data;
  console.log(user);
}
function signUp(){
  console.log("누름")
  http
  .post(`/user/`, user)
  .then(({data})=>{
    // 회원 가입 성공 -> 로그인으로 넘어가기?
    console.log("회원가입 -> "+data);
    router.push(`/pages/landing-pages/basic`);
  })
}
</script>
<template>
  <section>
    <div class="container py-7">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <h3 class="text-center">회원가입</h3>
          <form role="form" id="contact-form" method="post" autocomplete="off">
            <div class="card-body">
              <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'id', class: 'form-label' }"
                  type="text"
                  name = "id"
                  :user="user"
                  @updateData="updateData"
                />
                <span  class="error-message">
                  다시 입력해주세요
                </span>
              </div>
              <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'password', class: 'form-label' }"
                  :user="user"
                  @updateData="updateData"
                  type="password"
                />
                <span class="error-message">
                  다시 입력해주세요
                </span>
              </div>
              <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'name', class: 'form-label' }"
                  :user="user"
                  @updateData="updateData"

                  type="name"
                />
                <span class="error-message">
                  다시 입력해주세요
                </span>
              </div>
              <!-- <div class="row">
                <div class="col-md-6">
                  <MaterialInput
                    class="input-group-dynamic mb-4"
                    :label="{ text: 'First Name', class: 'form-label' }"
                    type="text"
                  />
                </div>
                
                <div class="col-md-6 ps-2">
                  <MaterialInput
                    class="input-group-dynamic"
                    :label="{ text: 'Last Name', class: 'form-label' }"
                    type="text"
                  />
                </div>
              </div> -->
              <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'Email Address', class: 'form-label' }"
                  :user="user"
                  @updateData="updateData"

                  type="email"
                />
                <span class="error-message">
                  다시 입력해주세요
                </span>
              </div>
              <!-- <MaterialTextArea
                class="input-group-static mb-4"
                id="message"
                :rows="4"
                >Your message</MaterialTextArea
              > -->
            </div>
            <div class="row">
              <div class="col-md-12">
                <!-- <MaterialSwitch
                  class="mb-4 d-flex align-items-center"
                  id="flexSwitchCheckDefault"
                  checked
                  labelClass="ms-3 mb-0"
                >
                  I agree to the
                  <a href="javascript:;" class="text-dark"
                    ><u>Terms and Conditions</u></a
                  >.
                </MaterialSwitch> -->

                <div class="col-md-12">
                  <MaterialButton
                    type="button"
                    variant="gradient"
                    color="dark"
                    fullWidth
                    @submit.prevent
                    v-on:click="signUp()"
                    >가입하기</MaterialButton
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.error-message {
  color : rgba(231, 78, 78, 0.829);
  font-size : 14px
}
</style>
