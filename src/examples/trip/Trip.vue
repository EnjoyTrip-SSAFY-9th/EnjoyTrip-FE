<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import TripMap from "./TripMap.vue";
import TripSearch from "./TripSearch.vue";
import TripDetailList from "./TripDetailList.vue";

const select = ref({
  sido: "",
  gugun: "",
  type: "",
  search: "",
});

const totalPage = ref(1);
const page = ref(1);
const perPage = 12;

const changeSido = (sido) => {
  select.value.sido = sido;
  page.value = 1;
};
const changeGugun = (gugun) => {
  select.value.gugun = gugun;
  page.value = 1;
};
const changeType = (type) => {
  select.value.type = type;
  page.value = 1;
};

const sidocode = computed(() => select.value?.sido);
const guguncode = computed(() => select.value?.gugun);
const typecode = computed(() => select.value?.type);
const search = computed(() => select.value?.search);
const enabled = computed(
  () =>
    (!!select.value?.sido && !!select.value?.gugun && !!select.value?.type) ||
    (!!select.value?.search && select.value?.search.length >= 2)
);

const { data: list } = useQuery({
  queryKey: ["attraction", sidocode, guguncode, typecode, search, page],
  queryFn: () =>
    fetchAttraction(
      sidocode.value,
      guguncode.value,
      typecode.value,
      search.value,
      page.value
    ),
  enabled,
});

// 공공데이터 서비스 키
const serviceKey =
  "MsJ8m3KE1BZRPPU4a%2B4glQobhuo6032W3s7fL90AnUrHal0TqMrveuvQyEEs%2FP9VexVGAo%2BvJSn%2B1RtSF2DBFQ%3D%3D";

// // 공공데이터 여행지 호출
async function fetchAttraction(
  areaCode,
  gugunCode,
  contentTypeId,
  keyword,
  page
) {
  let searchUrl = keyword
    ? `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${gugunCode}&MobileOS=ETC&MobileApp=TestApp&_type=json&numOfRows=${perPage}&keyword=${keyword}&pageNo=${page}`
    : `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${serviceKey}&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${gugunCode}&MobileOS=ETC&MobileApp=TestApp&_type=json&numOfRows=${perPage}&pageNo=${page}`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  const item = await data.response.body.items.item;
  totalPage.value = ((await data.response.body.totalCount) - 1) / perPage + 1;
  if (!item || item.length == 0) return [];
  return data.response.body.items.item;
}

const mytriplist = ref([]);
const max = ref(0);
const addMytriplist = (value) => {
  console.log(value);
  mytriplist.value.push(value);
};

const initMytriplist = () => {
  mytriplist.value = [];
};

const changeMax = (value) => {
  max.value = value;
};
</script>
<template>
  <div class="trip-container">
    <h3 class="mt-3" id="tripSearchTitle">지역별 관광정보</h3>
    <TripSearch
      :select="select"
      @changeSido="changeSido"
      @changeGugun="changeGugun"
      @changeType="changeType"
    />
    <TripMap
      :list="list"
      :mytriplist="mytriplist"
      @addMytriplist="addMytriplist"
      @initMytriplist="initMytriplist"
      @changeMax="changeMax"
    />
    {{ totalCount }}
    <div class="paging">
      <v-pagination
        v-model="page"
        :length="totalPage"
        :total-visible="4"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
    <div>
      <v-card-title
        :class="['text-h6', `bg-white-lighten-2`]"
        v-if="list == undefined || list?.length === 0"
      >
        검색 결과가 없습니다
      </v-card-title>
      <TripDetailList
        :list="list"
        :max="max"
        @addMytriplist="addMytriplist"
        v-if="list?.length !== 0"
      />
    </div>
  </div>
</template>
<style scoped>
.trip-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10vh;
}

.paging {
  margin-top: 30px;
}
</style>
