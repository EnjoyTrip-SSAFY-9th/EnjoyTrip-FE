<script>
export default {
  props: {
    article: null,
    index: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    backend_base_url: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    deleteHotPlace() {
      this.$emit("delete-event", this.article.hotplaceNo);
    },
    recommendHotPlace() {
      this.$emit("recommend-event", this.article.hotplaceNo);
    },
  },
  computed: {
    showTime() {
      return (v) => {
        return v.substring(0, 10);
      };
    },
  },
};
</script>
<template>
  <div class="col-4 mb-5">
    <v-card class="mx-auto" max-width="344">
      <v-img
        :src="
          backend_base_url +
          'resources/upload/' +
          article.saveFolder +
          '/' +
          article.saveFile
        "
        height="200px"
        cover
      ></v-img>

      <v-card-title> {{ article.title }} </v-card-title>

      <v-card-subtitle> {{ article.address }} </v-card-subtitle>
      <!-- <v-card-subtitle> {{ showTime(article.date) }} </v-card-subtitle> -->
      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text">
          {{ article.userName }} 님</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          size="small"
          color="red-lighten-1"
          variant="text"
          icon="mdi-heart"
          @click="recommendHotPlace"
        ></v-btn
        >{{ article.recommendation }}

        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="userId == article.userId"
              size="middle"
              color="grey-lighten-1"
              variant="text"
              icon="mdi-close"
              @click="deleteHotPlace"
            ></v-btn>
          </v-card-actions>

          <v-card-text>
            {{ article.content }}
          </v-card-text>
          <v-card-subtitle> {{ showTime(article.date) }} </v-card-subtitle>
          <v-divider color="transparent"></v-divider>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>
