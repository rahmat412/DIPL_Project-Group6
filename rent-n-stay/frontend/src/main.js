import { createApp } from "vue";
import Swal from "@/plugins/useSwal.js";
import VCalendar from "v-calendar";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app
import App from "@/App.vue";

// router
import router from "@/routes/routes.js"

const app = createApp(App);

app.use(router);
app.use(Swal);
app.use(VCalendar);
app.mount("#app");