import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

//Stilovi
import "./assets/less/home.less";
import "./assets/less/receivers.less";
import "./assets/less/style.less";
import "./assets/less/uplatnica.less";
import "./assets/less/login.less";

const app = createApp(App);

app.use(store).use(router);

app.mount("#app");
