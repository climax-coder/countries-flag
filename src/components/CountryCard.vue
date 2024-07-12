<template>
  <router-link :to="'/country/' + country.alpha3Code">
    <div class="country-card">
      <img :src="country.flag" alt="Flag of {{ country.name }}" />
      <h2>{{ country.name }}</h2>
      <p>Population: {{ country.population }}</p>
      <p>Region: {{ country.region }}</p>
      <p>Capital: {{ country.capital }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import type { Country } from '@/types/country'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    country: {
      type: Object as PropType<Country>,
      required: true
    }
  }
})
</script>

<style scoped>
.country-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  height: 19rem;
  overflow: hidden;
}
.country-card img {
  width: auto;
  height: 7.5rem;
  border-radius: 4px;
  margin: auto;
}
</style>
