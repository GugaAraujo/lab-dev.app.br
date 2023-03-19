<template>
  <div class="">
    <section class="">
      <form @submit.prevent="login" class="">
        <div class="">
          <label for="login" class=""> Email </label>
          <div class="">
            <input class="" v-model="email" type="email" placeholder="seu@email.com">
          </div>
        </div>
        <div class="">
          <label for="login" class=""> Senha </label>
          <div class="">
            <input class="" v-model="password" type="password" placeholder="********">
          </div>
        </div>
        <div class="">
          <button class="" :class="isLoading ? 'is-loading' : ''" type="submit">Entrar</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { LOGIN } from "@/store/types-action";
import { ref } from "vue";

const store = useStore();
const email = ref(null);
const password = ref(null);
const isLoading = ref(false);

async function login() {
  isLoading.value = true;
  store.dispatch(LOGIN, {
    email: email.value,
    password: password.value,
  }).finally(() => {
    isLoading.value = false;
  });
}

</script>

<style lang="scss" scoped>
.columns {
  margin-left: 0;
  margin-right: 0;

  @media screen and (min-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
