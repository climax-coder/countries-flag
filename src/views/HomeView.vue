<template>
  <div>
    <HeaderNav />
    <div class="filters">
      <input
        type="text"
        class="input-search"
        v-model="searchQuery"
        placeholder="Search for a country..."
      />
      <div class="navbar-options">
        <select v-model="selectedRegion" class="filter">
          <option value="">Filter by Region</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
        <select v-model="sortOption" class="sort">
          <option value="">Sort</option>
          <option value="name">Country Name</option>
          <option value="population">Population</option>
        </select>
      </div>
    </div>
    <div class="countries">
      <template v-if="isLoading">
        <div v-for="index in 8" :key="index" class="skeleton-loader"></div>
      </template>
      <CountryCard
        v-for="country in filteredCountries"
        :key="country.alpha3Code"
        :country="country"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import CountryCard from '@/components/CountryCard.vue'
import HeaderNav from '@/components/Header-nav.vue'
import type { Country } from '@/types/country'
import { useRouter, useRoute } from 'vue-router'

function getLevenshteinDistance(a: string, b: string) {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        )
      }
    }
  }

  return matrix[b.length][a.length]
}


export default defineComponent({
  components: {
    CountryCard,
    HeaderNav
  },
  setup() {
    const countries = ref<Country[]>([])
    const searchQuery = ref<string>('')
    const selectedRegion = ref<string>('')
    const sortOption = ref<string>('')
    const regions = ref<string[]>(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'])
    const isLoading = ref<boolean>(true)
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
      axios.get('https://restcountries.com/v2/all').then((response) => {
        countries.value = response.data
        isLoading.value = false
        syncQueryParams()
      })
    })

    watch(
      () => route.query,
      () => {
        syncFiltersFromQuery()
      }
    )

    const syncFiltersFromQuery = () => {
      const { search, region, sort } = route.query
      searchQuery.value = search ? String(search) : ''
      selectedRegion.value = region ? String(region) : ''
      sortOption.value = sort ? String(sort) : ''
    }

    // Function to sync URL query params with current filters
    const syncQueryParams = () => {
      const query: any = {}
      if (searchQuery.value) query.search = searchQuery.value
      if (selectedRegion.value) query.region = selectedRegion.value
      if (sortOption.value) query.sort = sortOption.value
      router.replace({ query })
    }

    const filteredCountries = computed(() => {
      let result = countries.value

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter((country) => {
          const countryName = country.name.toLowerCase()
          return (
            countryName.includes(query) ||
            getLevenshteinDistance(countryName, query) <= 2
          )
        })
      }

      if (selectedRegion.value) {
        result = result.filter((country) => country.region === selectedRegion.value)
      }

      if (sortOption.value) {
        result.sort((a, b) => {
          if (sortOption.value === 'name') {
            return a.name.localeCompare(b.name)
          } else if (sortOption.value === 'population') {
            return b.population - a.population
          }
          return 0
        })
      }
      
      return result
    })

    return {
      searchQuery,
      selectedRegion,
      sortOption,
      regions,
      filteredCountries,
      isLoading
    }
  }
})
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 80px;
}

.countries {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.input-search {
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  outline: none;
  width: 40%;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.416);
}

.filter {
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.416);
}

.skeleton-loader {
  display: inline-block;
  width: 100%;
  height: 21rem;
  background-color: #f0f0f088;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 2px 0px 0px rgba(128, 128, 128, 0.538);
}

.navbar-options {
  display: flex;
}

.skeleton-loader::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgb(235, 235, 235), transparent);
  animation: skeleton-loading 1.5s infinite linear;
}

@keyframes skeleton-loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@media (max-width: 724px) {
  .filters {
    display: block;
  }
  .input-search {
    margin-bottom: 10px;
    width: 50%;
  }
  .filter {
    width: 63%;
  }
}

.sort {
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.416);
  margin-left: 10px;
}

</style>
