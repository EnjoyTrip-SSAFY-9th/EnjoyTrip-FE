<script setup>
import { onMounted } from "vue";

// Sections components
// Forms page components
import FormSimple from "./components/FormSimple.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

//hook
onMounted(() => {
  setNavPills();
});
//회원가입 
</script>
<template>
  <FormSimple />
</template>
