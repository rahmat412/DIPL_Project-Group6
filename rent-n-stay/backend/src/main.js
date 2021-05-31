import { createApp } from "vue";
//import bootstrap from "@/plugins/bootstrap.js"

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// router

import router from "@/routes/routes.js"

// Vue.config.ClientionTip = false

createApp(App).use(router).mount("#app");