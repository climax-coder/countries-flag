<template>
  <header>
    <h3>Where in the world?</h3>
    <button @click="toggleTheme" :class="currentTheme === 'Dark' ? 'dark-button' : 'light-button'">
      <img
        v-if="currentTheme === 'Dark'"
        src="../assets/images/mode.jpeg"
        class="image-mode"
        alt="Dark Mode"
      />
      <img
        v-if="currentTheme === 'Light'"
        src="../assets/images/mode.jpeg"
        class="image-mode"
        alt="Light Mode"
      />
      <span class="text-button">
        {{ currentTheme }} Mode
      </span>
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      currentTheme: 'Light'
    }
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'Light' ? 'Dark' : 'Light'
      document.body.classList.toggle('dark-mode', this.currentTheme === 'Dark')
      document.body.classList.toggle('light-mode', this.currentTheme === 'Light')
      localStorage.setItem('theme', this.currentTheme)
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.currentTheme = savedTheme
    } else {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.currentTheme = prefersDarkMode ? 'Dark' : 'Light'
      }
    }
    document.body.classList.toggle('dark-mode', this.currentTheme === 'Dark')
    document.body.classList.toggle('light-mode', this.currentTheme === 'Light')
  }
})
</script>

<style scoped>
header {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.378);
}

.dark-mode {
  background-color: #333;
  color: white;
}

.light-mode {
  background-color: white;
  color: #333;
}
.dark-button {
  color: white;
  font-weight: 600;
  border: none;
  padding: 0.5rem 1rem;
  background-color: transparent;
  cursor: pointer;
  margin: 0px 20px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 25%;
}

.light-button {
  color: #333;
  border: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  margin: 0px 20px;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 25%;
}
.image-mode {
  width: 10%;
  background-color: white;
  border-radius: 50%;
  margin: 0px 5px;
}
@media (max-width: 724px) {
  .text-button {
    display: none;
  }
  .image-mode {
    width: 50%;
  }
}
</style>
