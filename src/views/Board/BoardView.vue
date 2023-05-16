<template>
    <div>
        <TabsSimple />
        <router-view></router-view>
    </div>
</template>
<script setup>
import { onMounted } from "vue";


// Nav tabs page components
import TabsSimple from "@/layouts/sections/navigation/nav-tabs/components/TabsSimple.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

//hook
onMounted(() => {
  setNavPills();
});
</script>