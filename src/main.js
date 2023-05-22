import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import store from "./stores/store";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import materialKit from "./material-kit";
import { VueQueryPlugin } from "@tanstack/vue-query";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(store)
  .use(materialKit)
  .use(vuetify)
  .use(VueQueryPlugin)
  .mount("#app");
