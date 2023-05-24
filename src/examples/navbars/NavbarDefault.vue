<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";

import { computed } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import downArrow from "@/assets/img/down-arrow.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import { useRouter } from "vue-router";

const router = useRouter();
// import userStore from "../../stores/modules/userStore";

const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "/pages/landing-pages/basic",
      color: "bg-gradient-success",
      label: "로그인",
    }),
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);
const store = useStore();

// const userInfo = computed(() => store.state.userStore.userInfo);
const isLogin = computed(() => store.state.userStore.isLogin);

async function logout() {
  console.log("로그아웃 -> " + store.state.userStore.userInfo.id);
  await store.dispatch(
    "userStore/userLogout",
    store.state.userStore.userInfo.id
  );
  toast.success("로그아웃 완료", {
    autoClose: 2000,
  });
  router.push({ name: "presentation" }); // 메인 페이지로 이동
}
//회원 관리 페이지로 이동
async function admin() {
  await store.dispatch("adminStore/getUsersInfo", "1", "", "");
  router.push("/admin");
}
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-dark font-weight-bolder ms-sm-3'
            : 'text-white font-weight-bolder ms-sm-3',
        ]"
        :to="{ name: 'presentation' }"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        🛫Wanderlustify🛬
      </RouterLink>
      <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        to="/"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        🛫Wanderlustify🛬
      </RouterLink>

      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >dashboard</i
              >
              여행지
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <RouterLink
                        :to="{ name: 'trip' }"
                        class="dropdown-item border-radius-md"
                      >
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          지역별 관광지
                        </h6>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'mytrip' }"
                        class="dropdown-item border-radius-md"
                      >
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          여행 계획
                        </h6>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <RouterLink
                  :to="{ name: 'trip' }"
                  class="dropdown-item border-radius-md"
                >
                  <h6
                    class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                  >
                    지역별 관광지
                  </h6>
                </RouterLink>

                <RouterLink
                  :to="{ name: 'mytrip' }"
                  class="dropdown-item border-radius-md"
                >
                  <h6
                    class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                  >
                    여행 계획
                  </h6>
                </RouterLink>
              </div>
            </div>
          </li>

          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuDocs"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >article</i
              >
              여행 정보
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md mt-0 mt-lg-3 p-3 border-radius-lg"
              aria-labelledby="dropdownMenuDocs"
            >
              <div class="d-none d-lg-block">
                <ul class="list-group">
                  <RouterLink
                    :to="{ name: 'board' }"
                    class="dropdown-item border-radius-md"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      정보 공유
                    </h6>
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'hotplace' }"
                    class="dropdown-item border-radius-md"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      핫플레이스
                    </h6>
                  </RouterLink>
                </ul>
              </div>
              <div class="row d-lg-none">
                <div class="col-md-12 g-0">
                  <RouterLink
                    :to="{ name: 'board' }"
                    class="dropdown-item border-radius-md"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      정보 공유
                    </h6>
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'hotplace' }"
                    class="dropdown-item border-radius-md"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      핫플레이스
                    </h6>
                  </RouterLink>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2" v-if="isLogin">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuDocs"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="material-icons me-2 text-md" :class="getTextColor()"
                >face</i
              >
              {{ store.state.userStore?.userInfo?.name }}님
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md mt-0 mt-lg-3 p-3 border-radius-lg"
              aria-labelledby="dropdownMenuDocs"
            >
              <div class="d-none d-lg-block">
                <ul class="list-group">
                  <li class="nav-item list-group-item border-0 p-0">
                    <router-link
                      to="/mypage"
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      ><h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        마이페이지
                      </h6></router-link
                    >
                  </li>

                  <li
                    class="nav-item list-group-item border-0 p-0"
                    v-if="
                      store.state.userStore.userInfo != null &&
                      store.state.userStore.userInfo.isAdmin
                    "
                  >
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="#"
                      v-on:click="admin()"
                    >
                      <h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        회원 관리
                      </h6>
                    </a>
                  </li>

                  <li class="nav-item list-group-item border-0 p-0">
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="#"
                      v-on:click="logout()"
                    >
                      <h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        로그아웃
                      </h6>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row d-lg-none">
                <div class="col-md-12 g-0">
                  <ul class="list-group">
                    <li class="nav-item list-group-item border-0 p-0">
                      <router-link
                        to="/mypage"
                        class="dropdown-item py-2 ps-3 border-radius-md"
                        ><h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          마이페이지
                        </h6></router-link
                      >
                    </li>

                    <li
                      class="nav-item list-group-item border-0 p-0"
                      v-if="
                        store.state.userStore.userInfo != null &&
                        store.state.userStore.userInfo.isAdmin
                      "
                    >
                      <a
                        class="dropdown-item py-2 ps-3 border-radius-md"
                        href="#"
                        v-on:click="admin()"
                      >
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          회원 관리
                        </h6>
                      </a>
                    </li>

                    <li class="nav-item list-group-item border-0 p-0">
                      <a
                        class="dropdown-item py-2 ps-3 border-radius-md"
                        href="#"
                        v-on:click="logout()"
                      >
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          로그아웃
                        </h6>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul
          class="navbar-nav d-lg-block d-none"
          v-if="!store.state.userStore.isLogin"
        >
          <li class="nav-item">
            <a
              :href="action.route"
              class="btn btn-sm mb-0"
              :class="action.color"
              onclick="smoothToPricing('pricing-soft-ui')"
              >{{ action.label }}</a
            >
          </li>
        </ul>
        <ul
          class="navbar-nav d-lg-none offset-10"
          v-if="!store.state.userStore.isLogin"
        >
          <li class="nav-item">
            <a
              :href="action.route"
              class="btn btn-sm mb-0"
              :class="action.color"
              onclick="smoothToPricing('pricing-soft-ui')"
              >{{ action.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
