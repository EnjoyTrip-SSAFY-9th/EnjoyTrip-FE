<script setup>
import ExampleCard from "../Components/ExampleCard.vue";

// images
import boardpage from "@/assets/img/boardpage.png";
import mytrippage from "@/assets/img/mytrippage.png";
import hotplacepage from "@/assets/img/hotplacepage.png";
import trippage from "@/assets/img/trippage.png";
import mainpage from "@/assets/img/mainpage.mp4";
</script>
<template>
  <section class="py-5">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <div class="row mt-4">
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                class="shadow-lg"
                title="지역별 관광지"
                :image="trippage"
                route="trip"
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                class="shadow-lg"
                title="여행 계획"
                :image="mytrippage"
                route="mytrip"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                classes="mt-5"
                title="여행 정보 공유"
                :image="boardpage"
                route="board"
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="핫플레이스"
                :image="hotplacepage"
                route="hotplace"
              />
            </div>
          </div>
        </div>
        <div class="col-md-3 mx-auto mt-md-0 mt-3">
          <!-- <div class="position-sticky" style="top: 100px !important">
            <h3 style="margin-top: 20px">
              일상의 틀을 깨고 즐거움으로 가득한 여행을 경험하세요.
            </h3>
          </div> -->
          <div style="display: flex; justify-content: center; height: 600px">
            <video muted autoplay loop style="border-radius: 30px">
              <source :src="mainpage" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
