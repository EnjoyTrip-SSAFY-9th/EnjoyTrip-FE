<script setup>
import { computed } from "vue";
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  color: {
    type: String,
    default: "",
  },
});

const colorName = computed(() => `bg-${props.color}`);
const overview = computed(
  () =>
    props.item.overview
      .replaceAll("<br />", "")
      .replaceAll("<br>", "")
      .slice(0, 150) + "..."
);
</script>
<template>
  <v-timeline-item :dot-color="props.color" fill-dot size="x-small">
    <v-card>
      <v-card-title :class="colorName">
        <h2 class="me-4 font-weight-light">{{ props.item.title }}</h2>
      </v-card-title>
      <v-card-text> {{ overview }}</v-card-text>
    </v-card>
    <v-btn :color="item.color" variant="outlined"> Button </v-btn>
  </v-timeline-item>
</template>
<style></style>
