<template>
  <div class="">
    <section class="">
      <form @submit.prevent="register" class="">
        <div class="">
          <label for="register" class=""> Nome </label>
          <div class="">
            <input type="name" class="" v-model="name" id="name" />
          </div>
        </div>
        <div class="">
          <label for="register" class=""> Email </label>
          <div class="">
            <input type="email" class="" v-model="email" id="email" />
          </div>
        </div>
        <div class="">
          <label for="register" class=""> Senha </label>
          <div class="">
            <input type="password" class="" v-model="password" id="password" />
          </div>
        </div>
        <div class="">
          <label for="register" class=""> Confirme a senha </label>
          <div class="">
            <input type="password" class="" v-model="confirmPwd" id="password" />
          </div>
        </div>
        <div class="">
          <button class="" :class="isLoading ? 'is-loading' : ''" type="submit">Registrar</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { REGISTER_USER } from "@/store/types-action";
import { NOTIFICATE } from "@/store/types-mutations";
import { ref } from "vue";
import { NotificationType } from "@/interfaces/INotifications";

const store = useStore();

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPwd = ref(null);
const isLoading = ref(false);

async function register() {
  if (password.value === confirmPwd.value) {
    isLoading.value = true;
    store.dispatch(REGISTER_USER, {
      name: name.value,
      email: email.value,
      password: password.value,
      role: "ADMIN",
    }).finally(() => {
      isLoading.value = false;
    })
  } else {
    store.commit(NOTIFICATE, {
      title: 'Senhas difenrentes',
      text: 'A confirmação da senha e a senha devem ser iguais',
      type: NotificationType.FAIL,
    })
  }
}

</script>

<style lang="scss" scoped>
</style>
