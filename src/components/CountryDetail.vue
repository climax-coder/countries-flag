<template>
  <div class="country-detail">
    <img :src="country.flag" alt="Flag of {{ country.name }}" />
    <div class="container">
      <h1>{{ country.name }}</h1>
      <div class="detail">
        <div class="first-detail">
          <p><strong>Native Name:</strong> {{ country.nativeName }}</p>
          <p><strong>Population:</strong> {{ country.population }}</p>
          <p><strong>Region:</strong> {{ country.region }}</p>
          <p><strong>Sub Region:</strong> {{ country.subregion }}</p>
        </div>
        <div>
          <p><strong>Capital:</strong> {{ country.capital }}</p>
          <p><strong>Top Level Domain:</strong> {{ country.topLevelDomain.join(', ') }}</p>
          <p><strong>Currencies:</strong> {{ country.currencies.map((c) => c.name).join(', ') }}</p>
          <p><strong>Languages:</strong> {{ country.languages.map((l) => l.name).join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
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
.country-detail {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: start;
}
.country-detail img {
  width: 40%;
  height: auto;
  border-radius: 4px;
}
.container {
  padding: 2rem;
}

.detail {
  display: flex;
}

.first-detail {
  margin: 0px 20px;
}

@media (max-width: 724px) {
  .detail {
    display: block;
  }
  .first-detail {
    margin: 0px 0px;
  }
  .country-detail {
    display: block;
  }
  .country-detail img {
    width: 100%;
  }
}
</style>
