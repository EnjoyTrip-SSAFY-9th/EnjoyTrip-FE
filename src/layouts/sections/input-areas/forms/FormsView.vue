<script setup>
import { onMounted } from "vue";

// Sections components
import BaseLayout from "../../components/BaseLayout.vue";
import View from "../../components/View.vue";

// Forms page components
import FormSimple from "./components/FormSimple.vue";

// Forms page components codes
import { formSimpleCode } from "./components/codes";

import InputsView from "../inputs/InputsView.vue";

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
