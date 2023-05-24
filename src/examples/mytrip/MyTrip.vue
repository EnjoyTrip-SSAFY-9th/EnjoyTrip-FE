<script setup>
import { ref, computed } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
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
const page = ref(0);

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
const enabled = computed(() => mytripNo.value !== undefined);
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
  // console.log(data.data);
  // return data.data;
  const trips = await fetchMyTrip(data.data);
  return Promise.all(trips);
};

const { data: list, isLoading } = useQuery({
  queryKey: ["mytrip", userInfo.value.id, mytripNo],
  queryFn: getMyTrip,
  enabled,
});

const color = [
  {
    color: "red-lighten-2",
    icon: "mdi-star",
  },
  {
    color: "purple-lighten-2",
    icon: "mdi-book-variant",
  },
  {
    color: "green-lighten-1",
    icon: "mdi-airballoon",
  },
  {
    color: "indigo-lighten-2",
    icon: "mdi-layers-triple",
  },
];
const queryClient = useQueryClient();
const { mutate } = useMutation({
  mutationFn: (value) =>
    http.delete(`/attraction/deleteMyTripAll/${value.id}/${value.no}`),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["mytripAll", userInfo.value.id],
    });
  },
});

function deleteMyTripAll() {
  mutate({ id: userInfo.value.id, no: mytripNo.value });
}
</script>
<template>
  <div class="trip-container">
    <div class="header">
      <h3 class="mt-3" id="tripSearchTitle">나의 여행계획</h3>
      <v-btn icon="mdi-delete-outline" @click="deleteMyTripAll"></v-btn>
    </div>

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

    <div>
      <v-progress-circular
        indeterminate
        color="black"
        style="margin-top: 10px"
        :size="70"
        :width="7"
        v-if="isLoading && page !== 0"
      ></v-progress-circular>

      <v-card-title
        :class="['text-h6', `bg-white-lighten-2`]"
        v-if="totalPage == undefined || totalPage === 0"
      >
        여행계획이 없습니다
      </v-card-title>
    </div>

    <v-timeline style="margin: 0px 20px">
      <MyTripTimeline
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :color="color[index % 4]"
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

.header {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>
