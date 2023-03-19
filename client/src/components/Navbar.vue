<script setup lang="ts">
import router from '@/router'

</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand text-white" href="#">Lab-dev.app.br</a>
      <button class="navbar-toggler mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="rounded-circle bg-dark text-white p-2">LG</span>
            </a>
            <ul class="dropdown-menu  dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a
                  class="dropdown-item"
                  href="#" @click="router.push({ path: '/logout' })"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  background: linear-gradient(180deg, #e14a4f 2%, #ca4247 25%, #a8323a 100%);
  .nav-link {
    color: white;
  }
}
</style>
