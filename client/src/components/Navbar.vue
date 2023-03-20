<script setup lang="ts">
import { RoleEnum } from '@/interfaces/IUser';
import router from '@/router'
import { useStore } from "@/store";
import { computed } from "vue";

const store = useStore();
const user = computed(() => store.state.user.user);
const role = computed(() => {
  return store.state.user.user?.role === RoleEnum.ADMIN as unknown ? 'Adminstrador' : 'Colaborador'
});

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
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="rounded-circle bg-dark text-white p-2">LG</span>
            </a>
            <ul class="dropdown-menu  dropdown-menu-end">
              <li v-if="user" class="dropdown-item profile pb-2 text-truncate">
                {{ user?.name }} - {{ role }}
              </li>
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
  .dropdown-menu {
    width: 250px;
    .profile {
      cursor: default;
      &:hover{
        background-color: transparent;
        color: black;
      }
    }
  }
}
</style>
