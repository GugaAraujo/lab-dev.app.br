<template>
   <CardForm
      viewPathRedirect="login"
      askRedirect="Já possui conta?"
      labelRedirect="Login"
      buttonTitle="Cadastrar"
      :disabled="isLoading"
      @clicked="register"
      @keyup.enter="register"
    >
      <form>
        <div class="form-floating">
          <input type="text" name="name-register" v-model="name" class="form-control" id="floatingInput" placeholder="Nome">
          <label for="floatingInput">Nome</label>
        </div>
        <div class="form-floating">
          <input type="email" name="email-register" v-model="email" class="form-control" id="floatingInput" placeholder="Email">
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
          <input type="password" name="password-register" v-model="password" class="form-control" id="floatingPassword" placeholder="Senha">
          <label for="floatingPassword">Senha</label>
        </div>
        <div class="form-floating">
          <input type="password" name="confirm-password-register" v-model="confirmPwd" class="form-control" id="floatingPassword" placeholder="Senha">
          <label for="floatingPassword">Confirme a senha</label>
        </div>
      </form>
    </CardForm>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { REGISTER_USER } from "@/store/types-action";
import { NOTIFICATE } from "@/store/types-mutations";
import { ref } from "vue";
import { NotificationType } from "@/interfaces/INotifications";
import CardForm from "@/components/CardForm.vue";

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
