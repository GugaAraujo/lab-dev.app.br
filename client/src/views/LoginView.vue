<script setup lang="ts">
import CardForm from "@/components/CardForm.vue";
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

<template>
  <CardForm
    viewPathRedirect="register"
    askRedirect="Não possui conta?"
    labelRedirect="Cadastre-se"
    buttonTitle="Entrar"
    :disabled="isLoading"
    @clicked="login"
    @keyup.enter="login"
  >
    <form>
      <div class="form-floating">
        <input type="email" name="email-login" v-model="email" class="form-control" id="floatingInput" placeholder="Email">
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <input type="password" name="password-login" v-model="password" class="form-control" id="floatingPassword" placeholder="Senha">
        <label for="floatingPassword">Senha</label>
      </div>
    </form>
  </CardForm>
</template>

<style lang="scss" scoped>
</style>
