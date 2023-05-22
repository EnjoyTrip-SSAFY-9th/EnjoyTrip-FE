<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import TripDetail from "./TripDetail.vue";
const props = defineProps({
  select: {
    type: Object,
    default: () => ({
      sido: "",
      gugun: "",
      type: "",
    }),
  },
});

const select = ref(props.select);

const sidocode = computed(() => select.value?.sido);
const guguncode = computed(() => select.value?.gugun);
const typecode = computed(() => select.value?.type);
const enabled = computed(
  () => !!select.value?.sido && !!select.value?.gugun && !!select.value?.type
);

const { data: list } = useQuery({
  queryKey: ["attraction2", sidocode, guguncode, typecode],
  queryFn: () =>
    fetchAttraction(sidocode.value, guguncode.value, typecode.value),
  enabled,
});

// 공공데이터 서비스 키
const serviceKey =
  "MsJ8m3KE1BZRPPU4a%2B4glQobhuo6032W3s7fL90AnUrHal0TqMrveuvQyEEs%2FP9VexVGAo%2BvJSn%2B1RtSF2DBFQ%3D%3D";

// // 공공데이터 여행지 호출
async function fetchAttraction(areaCode, gugunCode, contentTypeId) {
  let searchUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${serviceKey}&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${gugunCode}&MobileOS=ETC&MobileApp=TestApp&_type=json&numOfRows=20`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  return data.response.body.items.item;
}
</script>
<template>
  <div class="container">
      <TripDetail v-for="info in list" :key="info.contentid" :info="info" />
  </div>
</template>
<style scoped>
.container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
