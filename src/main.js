import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import "sweetalert2/dist/sweetalert2.min.css";

import App from "./App.vue";
import router from "./router/router";
import "./index.css"

const app = createApp(App);
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(router);
app.use(pinia);

app.mount("#app"); 