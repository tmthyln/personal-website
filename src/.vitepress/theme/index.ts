// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './styles.scss'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  Layout,
  enhanceApp({app}) {
      app.component('FontAwesomeIcon', FontAwesomeIcon)
  },
} satisfies Theme
