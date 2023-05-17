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

onMounted(() => {
  setMaterialInput();
});
const router = useRouter();

//사용자 
const user = reactive({
  id:"",
  password:"",
  name:"",
  email:"",
});
//아이디 사용 가능 확인
const success = reactive({
  id: "",
})
//에러 유형
const error = reactive({
  id:"length",
  password:"length",
  name:"length",
  email:"length",
});
//에러 메세지
const errorMSG = {
  id:{
    length: "아이디는 4자 이상 10자 미만이어야 합니다.",
    type : "아이디는 영어 또는 숫자만 사용 가능합니다.",
    duplicated: "중복된 아이디입니다."
  },
  password:{
    length: "비밀번호는 4자 이상 20자 미만이어야 합니다.",
    type: "비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다.",
  },
  name:{
    length: "이름은 2자 이상 6자 미만이어야 합니다.",
    type: "이름에 특수문자는 사용할 수 없습니다."
  },
  email:{
    length: "이메일을 입력해주세요.",
    type: "이메일 양식이 잘못되었습니다."
  },
}

//특수문자 사용 여부 확인하는 함수
function characterCheck(data, key){
var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi; 
// 허용할 특수문자는 여기서 삭제하면 됨
// 지금은 띄어쓰기도 특수문자 처리됨
if( regExp.test(data) ){
  error[key] = "type";
}
}
//한글 사용 여부 확인하는 함수
function koreanCheck(data, key){
  var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;  // 아이디, 비밀번호는 한글 불가능
			if(check.test(user[key])){ 
				error[key]="type"; 
			} 
}
function updateData (data, key) {
  // console.log(data, "  ", key);
  error[key] = "";
  user[key] = data;
  //error 여부 검사
  if(key == "id"){
    success.id = "";
  }
  if(user[key] == ""){ // 비어있는 경우
    error[key] = "length";
  }
  if(key == "id" || key == "password"){
    if(user[key].length < 4 || user[key].length >= 20){ // 4자 이상 20자 미만이 아닌 경우
      error[key] = "length";
    }
    koreanCheck(data,key);
  }
  if(key == "name"){
    if(user[key].length < 2 || user[key].length >= 6){ // 2자 이상 6자 미만이 아닌 경우
      error[key] = "length";
    }
  }
  if(key == "id" || key == "name") characterCheck(data, key); // 아이디, 이름 특수문자 사용여부 확인
  if(key == "email"){
    if (!/^[^@]+@\w+(\.\w+)+\w$/.test(user[key])) {
        error[key] = "type";
    }
  }
  // console.log(error)
    console.log(user);
}
//회원가입 유효 검사
function checkValid(){
  if(success.id == ""){
    alert("아이디 중복 여부를 확인해주세요.");
  }
  if(error.id == "" && error.password == "" && error.name==""&&error.email=="" && success.id == "success") return true;
  return false;
}
//아이디 중복 체크
function idCheck(){
  if(error["id"] != ""){
    return;
  }
  http
  .get(`/user/check/${user.id}`)
  .then(({data})=>{
    console.log("아이디 중복 체크 -> "+data);
    if(data == 0){
      success.id = "success";
    }
    if(data == 1){
      error["id"] = "duplicated";
    }
  })
}

//회원가입
function signUp(){
  //회원가입 양식에 맞게 작성하였는지 검사
  if(!checkValid()){
    return;
  }
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
          <h3 class="text-center py-5">회원가입</h3>
          <form role="form" id="contact-form" method="post" autocomplete="off" @submit.prevent>
            <div class="card-body">
              <!-- <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'id', class: 'form-label' }"
                  type="text"
                  name = "id"
                  :user="user"
                  @updateData="updateData"
                />
                <span v-if="error.id != ''" class="error-message">
                  {{ errorMSG.id[error.id] }}
                </span>
              </div> -->
              <div class="row mb-3">
                <div class="col-md-8">
                  <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'id', class: 'form-label' }"
                  type="text"
                  name = "id"
                  :user="user"
                  @updateData="updateData"
                />
                <span v-if="success.id != ''" class="success-message">
                  사용 가능한 아이디입니다.
                </span>
                <span v-if="error.id != ''" class="error-message">
                  {{ errorMSG.id[error.id] }}
                </span>
                </div>
                <div class="col-md-4 ps-2">
                  <MaterialButton
                    variant="gradient"
                    color="dark"
                    fullWidth
                    v-on:click="idCheck()"
                    >중복확인</MaterialButton
                  >
                </div>
              </div> 
              <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'password', class: 'form-label' }"
                  :user="user"
                  @updateData="updateData"
                  type="password"
                />
                <span v-if="error.password != ''" class="error-message">
                  {{ errorMSG.password[error.password] }}
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
                <span v-if="error.name != ''" class="error-message">
                  {{ errorMSG.name[error.name] }}
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
                  :label="{ text: 'email', class: 'form-label' }"
                  :user="user"
                  @updateData="updateData"
                  type="email"
                />
                <span v-if="error.email != ''" class="error-message">
                  {{ errorMSG.email[error.email] }}
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
                    variant="gradient"
                    color="dark"
                    fullWidth
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
.success-message{
  color : rgba(57, 158, 240, 0.829);
  font-size : 14px
}
.error-message {
  color : rgba(231, 78, 78, 0.829);
  font-size : 14px
}
</style>
