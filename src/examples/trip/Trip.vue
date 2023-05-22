<script setup>
import { ref } from "vue";
import TripMap from "./TripMap.vue";
import TripSearch from "./TripSearch.vue";
import TripDetailList from "./TripDetailList.vue";

const select = ref({
  sido: "",
  gugun: "",
  type: "",
});

const enable = ref(false);

const changeSido = (sido) => {
  select.value.sido = sido;
};
const changeGugun = (gugun) => {
  select.value.gugun = gugun;
};
const changeType = (type) => {
  select.value.type = type;
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
    <TripMap :select="select" :enable="enable" />
    <div>
      <TripDetailList :select="select" />
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
</style>
