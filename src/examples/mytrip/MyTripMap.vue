<script setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import http from "../../api/http.js";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["changeTrip"]);

// 공공데이터 서비스 키
const serviceKey =
  "MsJ8m3KE1BZRPPU4a%2B4glQobhuo6032W3s7fL90AnUrHal0TqMrveuvQyEEs%2FP9VexVGAo%2BvJSn%2B1RtSF2DBFQ%3D%3D";

let map = null;
let markers = [];

const list = computed(() => {
  return props.list;
});

watch(list, (newValue) => {
  if (newValue.length > 0) {
    markMyTrip(newValue);
  }
});

function markMyTrip(trips) {
  const points = trips.map((trip) => ({
    latlng: new window.kakao.maps.LatLng(trip.latitude, trip.longitude),
    title: trip.title,
    addr1: trip.addr1,
    firstimage: trip.first_image,
  }));

  // 지도에 표시할 선을 생성합니다
  let polyline = new window.kakao.maps.Polyline({
    path: points.map((p) => p.latlng), // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FFAE00", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });

  // 지도에 선을 표시합니다
  polyline.setMap(map);

  displayMarker(points);
}

function setMarkers(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function displayMarker(positions) {
  setMarkers(null);
  // 마커 이미지의 이미지 주소입니다
  let imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  const points = [];

  for (let i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    let imageSize = new window.kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커를 표시할 위치
      title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });

    markers.push(marker);

    points.push(positions[i].latlng);
  }

  const bounds = new window.kakao.maps.LatLngBounds();

  for (let i = 0; i < points.length; i++) {
    //LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(points[i]);
  }

  setBounds(bounds);
}

function setBounds(bounds) {
  // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
  // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
  map.setBounds(bounds);
}

const loadScript = () => {
  const script = document.createElement("script");
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=2168f8187d3c5ba4db3b7767e3ef83ce&autoload=false";
  script.onload = () => window.kakao.maps.load(loadMap);
  document.head.appendChild(script);
};

const loadMap = () => {
  const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    loadMap();
  } else {
    loadScript();
  }
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 80vw;
  height: 50vh;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: auto;
}
</style>
