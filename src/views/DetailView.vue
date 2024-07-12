<template>
  <div>
    <Header />
    <button @click="$router.back()">Back</button>
    <CountryDetail :country="country" v-if="country" />
    <template v-if="isLoading">
      <div class="skeleton-loader"></div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import CountryDetail from '@/components/CountryDetail.vue';
import type { Country } from '@/types/country';

export default defineComponent({
  components: {
    CountryDetail
  },
  setup() {
    const route = useRoute();
    const country = ref<Country | null>(null);
    const isLoading = ref(true);

    onMounted(() => {
      const countryCode = route.params.code;
      axios.get(`https://restcountries.com/v2/alpha/${countryCode}`).then(response => {
        country.value = response.data;
        isLoading.value = false;
      });
    });

    return {
      country,
      isLoading
    };
  }
});
</script>

<style scoped>
button {
  margin: 1rem 0;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.427);
}
button:hover {
  background-color: black;
  color: white;
}

.skeleton-loader {
  display: inline-block;
  width: 100%;
  height: 19rem; /* Adjust height according to your design */
  background-color: #f0f0f021;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.skeleton-loader::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
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

</style>
