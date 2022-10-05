import {createApp} from "vue";
import {createPinia} from "pinia";
import {createHead} from "@vueuse/head";

import App from "./App.vue";
import router from "./router";

import 'bootstrap';

import 'katex/dist/katex.css';
import 'highlight.js/styles/atom-one-dark-reasonable.css'

// fontawesome
import {dom, library} from "@fortawesome/fontawesome-svg-core";
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);
dom.watch();

createApp(App)
    .use(createPinia())
    .use(router)
    .use(createHead())
    .mount("#app");
