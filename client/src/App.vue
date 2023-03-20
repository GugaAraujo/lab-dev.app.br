<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notifications from "./components/Notifications.vue";
import Navbar from "@/components/Navbar.vue"
import { useStore } from "./store";
import { computed } from "vue";

const store = useStore();
const user = computed(() => store.state.user.user);

</script>

<template>
  <div class="background position-fixed overflow-auto">
    <div>
      <Navbar v-if="user" />
      <notifications />
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.background {
  background-color: #292b2c;
  color: #fff;
  width: 100%;
  height: 100vh;
}
</style>
