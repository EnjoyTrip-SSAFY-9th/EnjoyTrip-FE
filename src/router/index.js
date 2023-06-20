import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import SignInBasicView from "../views/LandingPages/SignIn/BasicView.vue";
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
      path: "/pages/landing-pages/basic",
      name: "signin-basic",
      component: SignInBasicView, // 로그인
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
        {
          path: "write",
          beforeEnter: onlyAuthUser,
          component: HotPlaceWrite,
        },
      ],
    },
  ],
});

export default router;
