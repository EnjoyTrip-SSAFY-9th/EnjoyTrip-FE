<script setup></script>
<template>
  <section class="pt-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mx-auto">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill p-1" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link mb-0 px-0 py-1 active"
                  data-bs-toggle="tab"
                  href="#profile-tabs-simple"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  공지사항
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link mb-0 px-0 py-1"
                  data-bs-toggle="tab"
                  href="#dashboard-tabs-simple"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  여행 정보
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
