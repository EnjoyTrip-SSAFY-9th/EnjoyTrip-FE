<script setup>
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

const props = defineProps({
  select: {
    type: Object,
    default: () => ({
      sido: "",
      gugun: "",
      type: "",
      search: "",
    }),
  },
});

const emit = defineEmits(["changeSido", "changeGugun", "changeType"]);

const select = ref(props.select);

const sidocode = computed(() => select.value?.sido);
const enabled = computed(() => !!select.value?.sido);

const { data: sidolist } = useQuery({
  queryKey: ["sido"],
  queryFn: fetchOption,
});

const { data: gugunlist } = useQuery({
  queryKey: ["gugun", sidocode],
  queryFn: () => fetchGuGunOption(sidocode.value),
  enabled,
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

// 공공데이터 서비스 키
const serviceKey =
  "MsJ8m3KE1BZRPPU4a%2B4glQobhuo6032W3s7fL90AnUrHal0TqMrveuvQyEEs%2FP9VexVGAo%2BvJSn%2B1RtSF2DBFQ%3D%3D";

// 지역코드
const areaUrl =
  "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=" +
  serviceKey +
  "&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";

// 공공데이터 시도 코드 호출
async function fetchOption() {
  const sidoUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
  const response = await fetch(sidoUrl);
  const data = await response.json();
  return data.response.body.items.item;
}

// 공공데이터 구군 코드 호출
async function fetchGuGunOption(areaCode) {
  const gugunUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=${areaCode}`;

  const response = await fetch(gugunUrl);
  const data = await response.json();
  return data.response.body.items.item;
}

const changeSido = (sido) => {
  emit("changeSido", sido);
};
const changeGugun = (gugun) => {
  emit("changeGugun", gugun);
};
const changeType = (type) => {
  emit("changeType", type);
};
</script>

<template>
  <div class="select-container">
    <input type="hidden" name="action" value="search" />
    <v-select
      :model-value="select.sido"
      @update:modelValue="changeSido"
      :items="sidolist"
      item-title="name"
      item-value="code"
      :rules="[(v) => !!v || 'sido is required']"
      label="시도"
      required
    ></v-select>
    <v-select
      :model-value="select.gugun"
      @update:modelValue="changeGugun"
      :items="gugunlist"
      item-title="name"
      item-value="code"
      :rules="[(v) => !!v || 'gugun is required']"
      label="구군"
      required
    ></v-select>

    <v-select
      :model-value="select.type"
      @update:modelValue="changeType"
      :items="typelist"
      item-title="name"
      item-value="code"
      :rules="[(v) => !!v || 'sido is required']"
      label="관광지유형"
      required
    ></v-select>

    <v-text-field v-model="select.search" label="검색어"></v-text-field>
  </div>
</template>
<style scoped>
.search-container {
  display: flex;
  gap: 10px;
}

.select-container {
  width: 70vw;
  display: flex;
  gap: 10px;
  margin: auto;
  margin-top: 30px;
}

.select-container > select {
  flex: 1 1 300px;
}

.search-form {
  width: 70vw;
  display: flex;
  gap: 10px;
  margin: auto;
  margin-top: 30px;
}
</style>
