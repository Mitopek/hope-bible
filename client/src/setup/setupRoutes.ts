import { createMemoryHistory, createRouter } from 'vue-router'

import BibleView from "../views/BibleView.vue";

const routes = [
  { path: '/', component: BibleView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router