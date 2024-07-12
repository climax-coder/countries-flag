import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomeView.vue';
import DetailPage from '@/views/DetailView.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/country/:code', name: 'Country Detail', component: DetailPage, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
