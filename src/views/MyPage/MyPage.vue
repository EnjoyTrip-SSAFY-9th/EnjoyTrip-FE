<script setup>
import vueMkHeader from "@/assets/img/bg9.jpg";
</script>
<template>
  <Header>
    <div
      class="page-header min-vh-45"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              마이페이지
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <router-view></router-view>
</template>
<style scoped></style>
