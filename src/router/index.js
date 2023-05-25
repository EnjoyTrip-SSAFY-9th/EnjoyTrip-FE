import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import ContactView from "../views/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import SignInBasicView from "../views/LandingPages/SignIn/BasicView.vue";
import PageHeaders from "../layouts/sections/page-sections/page-headers/HeadersView.vue";
import PageFeatures from "../layouts/sections/page-sections/features/FeaturesView.vue";
import NavigationNavbars from "../layouts/sections/navigation/navbars/NavbarsView.vue";
import NavigationNavTabs from "../layouts/sections/navigation/nav-tabs/NavTabsView.vue";
import NavigationPagination from "../layouts/sections/navigation/pagination/PaginationView.vue";
import InputAreasInputs from "../layouts/sections/input-areas/inputs/InputsView.vue";
import InputAreasForms from "../layouts/sections/input-areas/forms/FormsView.vue";
import ACAlerts from "../layouts/sections/attention-catchers/alerts/AlertsView.vue";
import ACModals from "../layouts/sections/attention-catchers/modals/ModalsView.vue";
import ACTooltipsPopovers from "../layouts/sections/attention-catchers/tooltips-popovers/TooltipsPopoversView.vue";
import ElAvatars from "../layouts/sections/elements/avatars/AvatarsView.vue";
import ElBadges from "../layouts/sections/elements/badges/BadgesView.vue";
import ElBreadcrumbs from "../layouts/sections/elements/breadcrumbs/BreadcrumbsView.vue";
import ElButtons from "../layouts/sections/elements/buttons/ButtonsView.vue";
import ElButtonGroups from "../layouts/sections/elements/button-groups/ButtonGroupsView.vue";
import ElDropdowns from "../layouts/sections/elements/dropdowns/DropdownsView.vue";
import ElProgressBars from "../layouts/sections/elements/progress-bars/ProgressBarsView.vue";
import ElToggles from "../layouts/sections/elements/toggles/TogglesView.vue";
import ElTypography from "../layouts/sections/elements/typography/TypographyView.vue";
import BoardView from "../views/Board/BoardView.vue";
import BoardList from "../examples/Board/BoardList.vue";
import BoardDetail from "../examples/Board/BoardDetail.vue";
import BoardWrite from "../examples/Board/BoardWrite.vue";
import BoardUpdate from "../examples/Board/BoardUpdate.vue";

import MyPage from "../views/MyPage/MyPage.vue";
import UserInfo from "../examples/UserInfo/UserInfo.vue";
import ModifyUserInfo from "../examples/UserInfo/ModifyUserInfo.vue";
import DeleteUserInfo from "../examples/UserInfo/DeleteUserInfo.vue";
import ChangePassword from "../examples/UserInfo/ChangePassword.vue";
import UsersView from "../views/Admin/UsersView.vue";
import UserList from "../examples/admin/UserList.vue";
import store from "@/stores/store";
import Trip from "../examples/trip/Trip.vue";
import MyTrip from "../examples/mytrip/MyTrip.vue";
import HotPlaceView from "../views/HotPlace/HotPlaceView.vue";
import HotPlaceList from "../examples/hotplace/HotPlaceList.vue";
import HotPlaceWrite from "../examples/hotplace/HotPlaceWrite.vue";
import FindPWD from "../examples/signIn/FindPWD.vue";

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("userStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    store.commit("userStore/SET_IS_LOGIN", false);
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "signin-basic" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const getBoards = async (to, from, next) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const date = {
    year: year,
    month: month,
    day: day,
  };
  await store.commit("boardStore/SET_NOW", date);
  console.log(date);
  const search = {
    type: store.state.boardStore.type,
    sort: store.state.boardStore.sort,
    pgno: store.state.boardStore.pgno,
    key: store.state.boardStore.key,
    word: store.state.boardStore.word,
  };
  await store.dispatch("boardStore/getBoards", { search });
  next();
};

const getHotPlaces = async (to, from, next) => {
  // const search = {
  //   pgno: store.state.hotplaceStore.pgno,
  //   key: store.state.hotplaceStore.key,
  //   word: store.state.hotplaceStore.word,
  // };
  const search = {
    sort: "hotplace_no",
    pgno: "1",
    key: "",
    word: "",
  };
  await store.dispatch("hotplaceStore/gethotplaces", { search });
  next();
};

const getRecommendHotPlaces = async (to, from, next) => {
  // const search = {
  //   pgno: store.state.hotplaceStore.pgno,
  //   key: store.state.hotplaceStore.key,
  //   word: store.state.hotplaceStore.word,
  // };
  await store.dispatch(
    "hotplaceStore/getRecommendhotplaces",
    store.state.userStore.userInfo.id
  );
  next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      beforeEnter: getHotPlaces,
      component: PresentationView,
    },
    {
      path: "/find/password",
      name: "findpassword",
      component: FindPWD,
    },
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/pages/landing-pages/basic",
      name: "signin-basic",
      component: SignInBasicView, // 로그인
    },
    {
      path: "/sections/page-sections/page-headers",
      name: "page-headers",
      component: PageHeaders,
    },
    {
      path: "/sections/page-sections/features",
      name: "page-features",
      component: PageFeatures,
    },
    {
      path: "/sections/navigation/navbars",
      name: "navigation-navbars",
      component: NavigationNavbars,
    },
    {
      path: "/sections/navigation/nav-tabs",
      name: "navigation-navtabs",
      component: NavigationNavTabs,
    },
    {
      path: "/sections/navigation/pagination",
      name: "navigation-pagination",
      component: NavigationPagination,
    },
    {
      path: "/sections/input-areas/inputs",
      name: "inputareas-inputs",
      component: InputAreasInputs,
    },
    {
      path: "/sections/input-areas/forms",
      name: "inputareas-forms",
      component: InputAreasForms,
    },
    {
      path: "/sections/attention-catchers/alerts",
      name: "ac-alerts",
      component: ACAlerts,
    },
    {
      path: "/sections/attention-catchers/modals",
      name: "ac-modals",
      component: ACModals,
    },
    {
      path: "/sections/attention-catchers/tooltips-popovers",
      name: "ac-tooltips-popovers",
      component: ACTooltipsPopovers,
    },
    {
      path: "/sections/elements/avatars",
      name: "el-avatars",
      component: ElAvatars,
    },
    {
      path: "/sections/elements/badges",
      name: "el-badges",
      component: ElBadges,
    },
    {
      path: "/sections/elements/breadcrumbs",
      name: "el-breadcrumbs",
      component: ElBreadcrumbs,
    },
    {
      path: "/sections/elements/buttons",
      name: "el-buttons",
      component: ElButtons,
    },
    {
      path: "/sections/elements/button-groups",
      name: "el-button-groups",
      component: ElButtonGroups,
    },
    {
      path: "/sections/elements/dropdowns",
      name: "el-dropdowns",
      component: ElDropdowns,
    },
    {
      path: "/sections/elements/progress-bars",
      name: "el-progress-bars",
      component: ElProgressBars,
    },
    {
      path: "/sections/elements/toggles",
      name: "el-toggles",
      component: ElToggles,
    },
    {
      path: "/sections/elements/typography",
      name: "el-typography",
      component: ElTypography,
    },
    {
      path: "/board",
      name: "board",
      component: BoardView,
      redirect: "/board/list",
      children: [
        {
          path: "list",
          beforeEnter: getBoards,
          component: BoardList,
        },
        {
          path: "detail",
          beforeEnter: onlyAuthUser,
          component: BoardDetail,
        },
        {
          path: "write",
          beforeEnter: onlyAuthUser,
          component: BoardWrite,
        },
        {
          path: "update",
          beforeEnter: onlyAuthUser,
          component: BoardUpdate,
        },
      ],
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPage,
      beforeEnter: onlyAuthUser,
      redirect: "/mypage/info",
      children: [
        {
          beforeEnter: getRecommendHotPlaces,
          path: "info",
          component: UserInfo,
        },
        {
          beforeEnter: onlyAuthUser,
          path: "modify",
          component: ModifyUserInfo,
        },
        {
          beforeEnter: onlyAuthUser,
          path: "change/password",
          component: ChangePassword,
        },
        {
          beforeEnter: onlyAuthUser,
          path: "delete",
          component: DeleteUserInfo,
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: UsersView,
      redirect: "/admin/users",
      children: [
        {
          beforeEnter: onlyAuthUser,
          path: "users",
          name: "users",
          component: UserList,
        },
      ],
    },
    {
      path: "/trip",
      name: "trip",
      beforeEnter: onlyAuthUser,
      component: Trip,
    },
    {
      path: "/mytrip",
      name: "mytrip",
      beforeEnter: onlyAuthUser,
      component: MyTrip,
    },
    {
      path: "/hotplace",
      name: "hotplace",
      beforeEnter: onlyAuthUser,
      component: HotPlaceView,
      redirect: "/hotplace/list",
      children: [
        {
          path: "list",
          beforeEnter: getHotPlaces,
          component: HotPlaceList,
        },
        // {
        //   path: "detail",
        //   name: "detail",
        //   beforeEnter: onlyAuthUser,
        //   component: HotPlaceDetail,
        // },
        {
          path: "write",
          beforeEnter: onlyAuthUser,
          component: HotPlaceWrite,
        },
        // {
        //   path: "update",
        //   name: "update",
        //   beforeEnter: onlyAuthUser,
        //   component: hotplaceUpdate,
        // },
      ],
    },
  ],
});

export default router;
