<script setup lang="ts">
import Pagination from "@/components/Pagination.vue"
import http from '@/http'
import { onMounted, ref } from 'vue'

const filter = ref(null)
const companies = ref([])

onMounted(async () => {
  await getCompanies()
})

const search = async () => {
  await getCompanies(filter.value)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
}

const getCompanies = async (companyName = null) => {
  let query = ''
  if (companyName) {
    query = `?name=${companyName}`
  }
  await http.get(`/company${query}`)
    .then((results: any) => {
      companies.value = results.data
    })
}

</script>

<template>
  <main class="container w-75 ">
    <div class="d-flex my-4 mx-auto">
      <input
        class="form-control"
        v-model="filter"
        type="search"
        @input="search"
        @keyup.enter="search"
        placeholder="Busque empresas pelo nome"
      >
    </div>

    <div v-for="company in companies" :key="(company as any).id">
      <div class="bg-light my-2 p-4 text-black d-flex flex-collumn rounded">
        <div class="col-6">
          <p class="fs-5 text">
            <span class="me-2">Empresa:</span>
            <span>{{ (company as any)?.name }}</span>
          </p>
          <p>
            <span class="me-2">Endereço:</span>
            <span>{{ (company as any)?.address }}</span>
          </p>
          <p>
            <span class="me-2">Criado em:</span>
            <span>{{ formatDate((company as any)?.createdAt) }}</span>
          </p>
        </div>
        <div class="col-6">
          <p class="fs-5 text me-2">Domínios:</p>
          <ul v-for="domain in (company as any)?.domains" :key="domain">
            <li><a :href="domain" target="_blank">{{ domain }}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
