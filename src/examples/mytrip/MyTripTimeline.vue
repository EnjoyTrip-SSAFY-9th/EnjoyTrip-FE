<script setup>
import { computed } from "vue";
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  color: {
    type: Object,
    default: () => ({}),
  },
});

const colorName = computed(() => `bg-${props.color}`);
const overview = computed(
  () =>
    props.item.overview.replaceAll(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "..."
);

const handleClick = (url) => {
  let hrefRegex = /<a\s+href=["']([^"']+)["']/;
  let hrefMatch = url.match(hrefRegex);
  if (hrefMatch) {
    let hrefValue = hrefMatch[1];
    window.open(hrefValue, "_blank");
  }
};
</script>
<template>
  <v-timeline-item
    :dot-color="props.color.color"
    :icon="props.color.icon"
    fill-dot
  >
    <v-card>
      <v-card-title :class="['text-h6', `bg-${props.color.color}`]">
        {{ props.item.title }}
      </v-card-title>
      <v-card-text class="bg-white text--primary">
        <p>
          {{ overview }}
        </p>
        <v-btn
          v-if="props.item.homepage"
          :color="props.color.color"
          variant="outlined"
          @click="handleClick(props.item.homepage)"
        >
          홈페이지
        </v-btn>
      </v-card-text>
    </v-card>
  </v-timeline-item>
</template>
<style></style>
