<script setup>
import RotatingCard from "../../../examples/cards/rotatingCards/RotatingCard.vue";
import RotatingCardFront from "../../../examples/cards/rotatingCards/RotatingCardFront.vue";
import RotatingCardBack from "../../../examples/cards/rotatingCards/RotatingCardBack.vue";
import DefaultInfoCard from "../../../examples/cards/infoCards/DefaultInfoCard.vue";
import mainCard1 from "@/assets/img/mainCard1.jpg";
import mainCard2 from "@/assets/img/mainCard2.jpg";
import mainCard3 from "@/assets/img/mainCard3.jpg";
import mainCard4 from "@/assets/img/mainCard4.jpg";
import mainCard5 from "@/assets/img/mainCard5.jpg";
import mainCard6 from "@/assets/img/mainCard7.jpg";
</script>
<template>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              :image="mainCard1"
              title="경복궁 향원정"
              description="향원정 연못 한가운데 인공의 섬을 만들고 그 위에 육각형 정자를 지어서 ‘향기가 멀리 퍼져나간다’는 향원정이라 불렀다."
            />

            <RotatingCardBack
              :image="mainCard4"
              title="남산골 한옥마을"
              description="남산골 서울시 민속자료 한옥 다섯 채를 이전, 복원하고 이 한옥에 살았던 사람들의 신분 성격에 걸맞은 가구 등을 배치하였다. "
            />
          </RotatingCard>
        </div>
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              :image="mainCard2"
              title="설악산"
              description="설악산은 동물과 식물 자원이 풍부하고, 경치가 매우 아름다워 고고학적으로도 보존의 가치가 매우 큰 곳이다."
            />

            <RotatingCardBack
              :image="mainCard3"
              title="제주도 성산일출봉"
              description="성산일출봉은 제주도의 다른 오름들과는 달리 마그마가 물속에서 분출하면서 만들어진 수성화산체다."
            />
          </RotatingCard>
        </div>
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              :image="mainCard5"
              title="팔당호"
              description="팔당호는 광주시 퇴촌면과 남종면에 걸쳐있는 인공호수로 팔당댐 완공 이후, 2억 5천만톤의 물을 저수하고 있다."
            />

            <RotatingCardBack
              :image="mainCard6"
              title="순천만"
              description="순천만은 여수반도와 고흥반도를 양옆에 끼고 순천시를 향해 깊숙하게 들어와 있으며 39.8km의 해안선으로 둘러싸여 있다"
            />
          </RotatingCard>
        </div>
      </div>
    </div>
  </section>
</template>
