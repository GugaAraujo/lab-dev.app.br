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
  <div class="background">
    <Navbar v-if="user" />
    <notifications />
    <RouterView />
  </div>
</template>

<style scoped>
.background {
  background-color: #292b2c;
  color: #fff;
  height: 100vh;
}
</style>
