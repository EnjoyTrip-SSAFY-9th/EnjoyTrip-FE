<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import MaterialButton from "@/components/MaterialButton.vue";

const router = useRouter();
const store = useStore();

async function deleteUser() {
  await store.dispatch(
    "userStore/deleteUser",
    store.state.userStore.userInfo.id
  );
  toast.success("탈퇴 완료", {
    autoClose: 3000,
  });
  router.push(`/`);
}
</script>
<template>
  <section>
    <div class="container mt-5">
      <h3 class="">회원 탈퇴</h3>
      <div class="row border border-dark">
        <div class="col-lg-7 d-flex justify-content-center flex-column">
          정말 탈퇴하시겠습니까? 탈퇴하시려면 아래 버튼을 클릭하세요.
          <div class="col col-lg-3 text-center">
            <MaterialButton
              class="my-4 mb-2"
              variant="gradient"
              color="danger"
              fullWidth
              v-on:click="deleteUser()"
              >탈퇴하기</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
