<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import kakaoInfowindow from "@/assets/img/kakaoInfowindow.jpg";

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
  max: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["addMytriplist"]);

const router = useRouter();
const store = useStore();
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
async function addHotPlace() {
  const hotplace = {
    title: props.info.title,
    address: props.info.addr1,
  };
  await store.commit("hotplaceStore/SET_HOTPLACE", hotplace);
  router.push("/hotplace/write");
}

const userInfo = computed(() => store.state.userStore.userInfo);

const handleClick = () => {
  const data = {
    content_id: props.info.contentid,
    user_id: userInfo.value.id,
    user_mytrip_no: props.max + 1,
    title: props.info.title,
  };
  console.log(data);
  emit("addMytriplist", data);
};
</script>
<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        :src="props.info.firstimage || kakaoInfowindow"
        cover
      >
      </v-img>
      <v-card-title>{{ props.info.title }}</v-card-title>
      <v-card-subtitle>
        {{
          typelist.filter((el) => el.code == props.info.contenttypeid)[0].name
        }}
      </v-card-subtitle>

      <v-card-text>
        <div>{{ props.info.addr1 }}</div>

        <div>{{ props.info.addr2 }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" @click="handleClick"> 여행게획 추가 </v-btn>

        <v-btn color="orange" class="font-weight-bold" @click="addHotPlace"
          >핫플레이스 등록
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style></style>
