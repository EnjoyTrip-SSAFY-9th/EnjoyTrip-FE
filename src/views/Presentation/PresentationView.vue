<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
//import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import FilledInfoCard from "../../examples/cards/infoCards/FilledInfoCard.vue";

//Vue Material Kit 2 components
import MaterialSocialButton from "@/components/MaterialSocialButton.vue";

// sections
import PresentationCounter from "./Sections/PresentationCounter.vue";
import PresentationPages from "./Sections/PresentationPages.vue";
import PresentationExample from "./Sections/PresentationExample.vue";
import data from "./Sections/Data/designBlocksData";
import BuiltByDevelopers from "./Components/BuiltByDevelopers.vue";
import PresentationTestimonials from "./Sections/PresentationTestimonials.vue";
import PresentationInformation from "./Sections/PresentationInformation.vue";

//images
import vueMkHeader from "@/assets/img/mainImage.jpg";
import wavesWhite from "@/assets/img/waves-white.svg";
import logoBootstrap from "@/assets/img/logos/bootstrap5.jpg";
import logoTailwind from "@/assets/img/logos/icon-tailwind.jpg";
import logoVue from "@/assets/img/logos/vue.jpg";
import logoAngular from "@/assets/img/logos/angular.jpg";
import logoReact from "@/assets/img/logos/react.jpg";
import logoSketch from "@/assets/img/logos/sketch.jpg";
import HotPlaceDetail from "@/examples/hotplace/HotPlaceDetail.vue";
//hooks
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
const backend_base_url = import.meta.env.VITE_BACKEND_BASE_URL;
const hotTop3 = computed(() => store.state.hotplaceStore.hotTop3);
</script>

<template>
  <Header>
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              Wanderlustify
            </h1>
            <h3 class="text-white">좋아하는 여행지를 찾다</h3>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              이야기의 장소를 찾아, 새로운 이야기를 써나가는 여행을 함께
              합시다.<br />
              꿈꾸던 여정을 현실로, 어디든 떠나는 당신을 응원합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <PresentationInformation />
    <div>
      <div class="text-center">
        <h3 class="mb-5">인기 핫플레이스 <br />TOP 3</h3>
      </div>
      <div class="row">
        <HotPlaceDetail
          v-for="(article, index) in hotTop3"
          :key="article.commentNo"
          :article="article"
          :index="index"
          :backend_base_url="backend_base_url"
        ></HotPlaceDetail>
      </div>
    </div>
    <PresentationPages />
  </div>
  <DefaultFooter />
</template>
