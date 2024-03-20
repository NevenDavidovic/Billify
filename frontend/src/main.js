import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import Particles from "vue3-particles";

//Stilovi
import "./assets/less/home.less";
import "./assets/less/receivers.less";
import "./assets/less/style.less";
import "./assets/less/uplatnica.less";
import "./assets/less/login.less";

const app = createApp(App);

app.use(store).use(router).use(Particles);

app.mount("#app");
