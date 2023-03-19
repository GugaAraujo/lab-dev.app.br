<script setup lang="ts">
defineProps({
  buttonTitle: String,
  disabled: Boolean,
  askRedirect: String,
  labelRedirect: String,
  viewPathRedirect: String,
})

</script>

<template>
  <div class="container">
    <main class="form-signin w-100 m-auto text-center">
      <h1 class="h3 mb-3">Lab-dev.app.br</h1>
      <slot></slot>
      <button
        @click="$emit('clicked')"
        :disabled="disabled"
        class="w-100 btn btn-lg text-white btn-background"
        type="submit"
      >
        <span v-if="disabled" class="spinner-border text-white"></span>
        <span v-else>{{ buttonTitle }}</span>
      </button>
      <div class="mt-5" >
        <p class="mb-1">
          {{ askRedirect }}
        </p>
        <router-link
          class="text-white"
          v-if="labelRedirect && viewPathRedirect && askRedirect"
          :to="viewPathRedirect"
        >
          {{ labelRedirect }}
        </router-link>
      </div>
      <p class="mt-5 mb-3 text-muted">
        <a href="https://www.guga-araujo.dev.br" target="_blank" class="text-reset">
          Guga Araújo
        </a> - 2023
      </p>
    </main>
  </div>
</template>

<style lang="scss">
.btn-background{
  background: linear-gradient(180deg, #e14a4f 2%, #ca4247 25%, #a8323a 100%);
}

label {
  color: #635d5f;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  padding-top: 65px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[name="name-register"],
.form-signin input[name="email-login"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[name="password-register"],
.form-signin input[name="email-register"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[name="confirm-password-register"],
.form-signin input[name="password-login"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
