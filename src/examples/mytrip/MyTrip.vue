<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import MyTripMap from "./MyTripMap.vue";
import MyTripTimeline from "./MyTripTimeline.vue";
import http from "../../api/http.js";
import { useStore } from "vuex";

// const list = ref([]);

// const changeTrip = (trip) => {
//   list.value = [...trip];
// };

const store = useStore();
const userInfo = computed(() => store.state.userStore.userInfo);

const totalPage = ref(1);
const page = ref(1);

const getMyTripAll = async () => {
  const data = await (
    await http.get(`/attraction/getMyTripAll/${userInfo.value.id}`)
  ).data;

  totalPage.value = data.length;
  return data;
};

const { data: all } = useQuery({
  queryKey: ["mytripAll", userInfo.value.id],
  queryFn: getMyTripAll,
});

const mytripAll = computed(() => all || []);
const enabled = computed(() => mytripAll.value.length > 0);
const mytripNo = computed(() => all.value?.[page.value - 1]);

// 공공데이터 서비스 키
const serviceKey =
  "MsJ8m3KE1BZRPPU4a%2B4glQobhuo6032W3s7fL90AnUrHal0TqMrveuvQyEEs%2FP9VexVGAo%2BvJSn%2B1RtSF2DBFQ%3D%3D";

async function fetchMyTrip(data) {
  let url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1&contentId=`;
  const trips = data.map(async (id) => {
    const data = await (await fetch(url + id)).json();
    const item = await data.response.body.items.item[0];
    const trip = {
      ...item,
      latitude: item.mapy,
      longitude: item.mapx,
      title: item.title,
      addr1: item.addr1,
      first_image: item.firstimage,
    };

    return trip;
  });

  return trips;
}

const getMyTrip = async () => {
  const data = await http.get(
    `/attraction/getMyTrip/${userInfo.value.id}/${mytripNo.value}`
  );
  const trips = await fetchMyTrip(data.data);
  return Promise.all(trips);
};

const { data: list } = useQuery({
  queryKey: ["mytrip", userInfo.value.id, mytripNo],
  queryFn: getMyTrip,
  enabled: mytripNo.value !== undefined,
});

const color = [
  "purple-lighten-2",
  "amber-lighten-1",
  "cyan-lighten-1",
  "green-lighten-1",
  "red-lighten-1",
];
</script>
<template>
  <div class="trip-container">
    <h3 class="mt-3" id="tripSearchTitle">나의 여행계획</h3>
    <div class="paging">
      <v-pagination
        v-model="page"
        :length="totalPage"
        :total-visible="totalPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
    <MyTripMap :list="list" />

    <v-timeline>
      <MyTripTimeline
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :color="color[index % 6]"
      />
    </v-timeline>
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
