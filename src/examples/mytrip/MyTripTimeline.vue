<script setup>
import { computed } from "vue";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import http from "../../api/http";
import { useStore } from "vuex";

const store = useStore();
const userInfo = computed(() => store.state.userStore.userInfo);
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

const queryClient = useQueryClient();
const { mutate } = useMutation({
  mutationFn: (value) => http.delete(`/attraction/deleteMyTrip/${value.no}`),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["mytrip", userInfo.value.id, props.item.mytrip_no],
    });
  },
});

function deleteMyTrip() {
  mutate({ no: props.item.no });
}
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
          icon="mdi-open-in-new"
          v-if="props.item.homepage"
          :color="props.color.color"
          variant="outlined"
          @click="handleClick(props.item.homepage)"
        ></v-btn>
        <v-btn
          icon="mdi-delete-outline"
          :color="props.color.color"
          variant="outlined"
          @click="deleteMyTrip"
        ></v-btn>
      </v-card-text>
    </v-card>
  </v-timeline-item>
</template>
<style></style>
