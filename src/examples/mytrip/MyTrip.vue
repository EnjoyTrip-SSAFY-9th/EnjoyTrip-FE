<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import MyTripMap from "./MyTripMap.vue";

const list = ref([]);

const changeTrip = (trip) => {
  list.value = [...trip];
};
</script>
<template>
  <div class="trip-container">
    <h3 class="mt-3" id="tripSearchTitle">나의 여행계획</h3>
    <MyTripMap :list="list" @changeTrip="changeTrip" />
    <!-- <div>
      <TripDetailList :list="list" />
    </div> -->
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
