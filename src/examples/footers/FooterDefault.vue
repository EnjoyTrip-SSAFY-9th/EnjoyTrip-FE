<script setup>
import logoDark from "@/assets/img/travelling.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "Wanderlustify",
      logo: logoDark,
      route: "/",
    }),
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/Wanderlustify-SSAFY-9th",
      },
    ],
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String,
    },
    default: () => [
      {
        name: "여행지",
        items: [
          {
            name: "지역별 관광지",
            href: "/trip",
          },
          {
            name: "여행 계획",
            href: "/mytrip",
          },
          // {
          //   name: "premium tools",
          //   href: "https://www.creative-tim.com/templates/premium"
          // },
          // { name: "blog", href: "https://www.creative-tim.com/blog" }
        ],
      },
      {
        name: "여행 정보",
        items: [
          { name: "정보 공유", href: "/board" },
          {
            name: "핫플레이스",
            href: "/hotplace",
          },
          // {
          //   name: "affiliate program",
          //   href: "https://www.creative-tim.com/affiliates/new"
          // }
        ],
      },
      // {
      //   name: "help & support",
      //   items: [
      //     {
      //       name: "contact us",
      //       href: "https://www.creative-tim.com/contact-us"
      //     },
      //     {
      //       name: "knowledge center",
      //       href: "https://www.creative-tim.com/knowledge-center"
      //     },
      //     {
      //       name: "custom development",
      //       href: "https://services.creative-tim.com/"
      //     },
      //     {
      //       name: "sponsorships",
      //       href: "https://www.creative-tim.com/sponsorships"
      //     }
      //   ]
      // },
      // {
      //   name: "legal",
      //   items: [
      //     {
      //       name: "terms & conditions",
      //       href: "https://www.creative-tim.com/terms"
      //     },
      //     {
      //       name: "privacy policy",
      //       href: "https://www.creative-tim.com/privacy"
      //     },
      //     {
      //       name: "licenses (EULA)",
      //       href: "https://www.creative-tim.com/license"
      //     }
      //   ]
      // }
    ],
  },
});
</script>
<template>
  <footer class="footer pt-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 offset-lg-3 mb-4">
          <div>
            <a :href="brand.route">
              <img :src="brand.logo" class="mb-3 footer-logo" alt="main_logo" />
            </a>
            <h6 class="font-weight-bolder mb-4">{{ brand.name }}</h6>
          </div>
          <div>
            <ul class="d-flex flex-row ms-n3 nav">
              <li
                class="nav-item"
                v-for="{ icon, link } of socials"
                :key="link"
              >
                <a
                  class="nav-link pe-1"
                  :href="link"
                  target="_blank"
                  v-html="icon"
                >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-md-2 col-sm-6 col-6 mb-4"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <RouterLink class="nav-link" :to="item.href">
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              All rights reserved. Copyright ©
              {{ new Date().getFullYear() }}
              Wanderlustify by SSAFY 9th .
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
