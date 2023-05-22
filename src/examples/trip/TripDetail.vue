<script setup>
import { ref } from "vue";

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});

const typelist = [
  { code: "12", name: "관광지" },
  { code: "14", name: "문화시설" },
  { code: "15", name: "축제공연행사" },
  { code: "25", name: "여행코스" },
  { code: "28", name: "레포츠" },
  { code: "32", name: "숙박" },
  { code: "38", name: "쇼핑" },
  { code: "39", name: "음식점" },
];
</script>
<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        :src="
          props.info.firstimage ||
          'https://images.unsplash.com/photo-1622998182589-f74aa3835777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
        "
        cover
      >
        <v-card-title>{{ props.info.title }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        {{
          typelist.filter((el) => el.code == props.info.contenttypeid)[0].name
        }}
      </v-card-subtitle>

      <v-card-text>
        <div>{{ props.info.addr1 }}</div>

        <div>{{ props.info.addr2 }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange"> Share </v-btn>

        <v-btn color="orange"> Explore </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style></style>
