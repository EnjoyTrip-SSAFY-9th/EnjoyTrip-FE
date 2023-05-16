<template>
  <div>
    <section
      id="about"
      class="about"
      style="background-color: #f5f9fc; padding-bottom: 60px"
    >
      <div class="container" data-aos="fade-up">
        <!-- <div class="container row align-self-center">
          <div class="row">
            <div class="col-3 m-0 p-0 bg-light">
              <div class="m-0 bg-dark">
                <a
                  class="p-2 text-light"
                  href="${root}/board/board?isnotice=1"
                  style="text-decoration: none"
                  >공지사항</a
                >
              </div>
            </div>
            <div class="col-1 m-0 p-0 bg-light">
              <div class="m-0 bg-light"></div>
            </div>
            <div class="col-3 m-0 p-0 bg-light">
              <div class="m-0 bg-dark">
                <a
                  class="p-2 text-light"
                  href="${root}/board/board?isnotice=0"
                  style="text-decoration: none"
                  >공유게시판</a
                >
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="row no-gutters" style="background-color: white">
        <div class="p-5 text-center">
          <h3 class="my-5 fw-bold">여행정보공유</h3>
          <div class="w-75 mx-auto mb-3 row">
            <div class="col-md-5 ps-0">
              <button
                type="button"
                id="btn-mv-register"
                class="btn btn-outline-dark btn-sm float-start"
              >
                글쓰기
              </button>
            </div>
            <div class="col-md-7 pe-0">
              <form
                class="d-flex justify-content-center"
                id="form-search"
                action=""
              >
                <input type="hidden" name="pgno" value="1" />
                <select
                  name="key"
                  id="key"
                  class="form-select form-select-sm ms-5 me-1 w-50"
                  aria-label="검색조건"
                >
                  <option selected>검색조건</option>
                  <option value="subject">제목</option>
                  <option value="userid">작성자</option>
                  <option value="content">내용</option>
                </select>
                <div
                  class="input-group input-group-sm justify-conent-center"
                  style="width: 300px"
                >
                  <input
                    type="text"
                    name="word"
                    id="word"
                    class="form-control"
                    placeholder="검색어..."
                  />
                  <button id="btn-search" class="btn btn-dark" type="button">
                    검색
                  </button>
                </div>
              </form>
            </div>
          </div>
          <table class="table w-75 m-auto mb-3">
            <thead class="table-dark">
              <tr>
                <th>글번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody id="articleinfo">
              <c:forEach var="board" items="${boards}" varStatus="vs">
                <tr>
                  <td>${vs.count}</td>
                  <td>
                    <a
                      href="#"
                      class="article-title link-dark"
                      data-no="${board.articleNo}"
                      style="text-decoration: none"
                      >${board.subject}</a
                    >
                  </td>
                  <td>${board.userId}</td>
                  <td>${board.hit}</td>
                  <td>${board.date}</td>
                </tr>
              </c:forEach>
            </tbody>
          </table>
        </div>
        <div>${navigation.navigator}</div>
      </div>
      <form id="form-param" method="get" action="">
        <input type="hidden" name="pgno" id="pgno" value="${pgno}" />
        <input type="hidden" name="key" value="${key}" />
        <input type="hidden" name="word" value="${word}" />
      </form>
      <form id="form-no-param" method="get" action="${root}/board/detail">
        <input type="hidden" name="pgno" value="${pgno}" />
        <input type="hidden" name="key" value="${key}" />
        <input type="hidden" name="word" value="${word}" />
        <input type="hidden" id="articleno" name="articleno" value="" />
      </form>
    </section>
  </div>
</template>
<script>
// import { onMounted } from "vue";


// // Nav tabs page components
// import TabsSimple from "@/layouts/sections/navigation/nav-tabs/components/TabsSimple.vue";

// //nav-pills
// import setNavPills from "@/assets/js/nav-pills";

// //hook
// onMounted(() => {
//   setNavPills();
// });
// export default{
//     components:{
//         TabsSimple,
//   },
// }
//   let titles = document.querySelectorAll(".article-title");
//   titles.forEach(function (title) {
//     title.addEventListener("click", function () {
//       document.querySelector("#articleno").value = this.getAttribute("data-no");
//       document.querySelector("#form-no-param").submit();
//     });
//   });

//   document.querySelector("#btn-mv-register").addEventListener("click", function () {
// 	  let form = document.querySelector("#form-param");
//       form.setAttribute("action", "${root}/board/write");
//       form.submit();
//   });

//   document.querySelector("#btn-search").addEventListener("click", function () {
// 	  let form = document.querySelector("#form-search");
//       form.setAttribute("action", "${root}/board/board");
//       form.submit();
//   });

//   let pages = document.querySelectorAll(".page-link");
//   pages.forEach(function (page) {
//     page.addEventListener("click", function () {
//    	  document.querySelector("#pgno").value = this.parentNode.getAttribute("data-pg");
//       let form = document.querySelector("#form-param");
//       form.setAttribute("action", "${root}/board/board");
//       form.submit();
//     });
//   });
</script>
