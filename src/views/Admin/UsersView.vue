<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import MaterialButton from "@/components/MaterialButton.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();

//사용자
// const user = reactive({
//   id: store.state.userStore.userInfo.id,
//   name: store.state.userStore.userInfo.name,
//   email: store.state.userStore.userInfo.email,
// });
</script>

<template>
  <section
    id="about"
    class="about"
    style="background-color: #f5f9fc; padding-bottom: 60px"
  >
    <router-view></router-view>
  </section>
</template>
