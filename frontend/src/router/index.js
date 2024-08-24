import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "../views/HomeView.vue";
import OrganizationView from "@/views/OrganizationView.vue";
import BarcodeGenerator from "@/views/BarcodeGenerator.vue";
import ReceiversView from "@/views/ReceiversView.vue";
import StatsView from "@/views/StatsView.vue";
import PaymentView from "@/views/PaymentView.vue";
import LoginForm from "@/views/LoginForm.vue";
import SignupForm from "@/views/SignupForm.vue";
import AboutView from "@/views/AboutView.vue";
import SettingsView from "@/views/SettingsView.vue";
import RequestPasswordReset from "@/views/RequestPasswordReset.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/organization",
    name: "organization",
    component: OrganizationView,
    meta: { requiresAuth: true },
  },
  {
    path: "/barcode-generator",
    name: "BarcodeGenerator",
    component: BarcodeGenerator,
    props: (route) => ({ user: route.query.user }),
    meta: { requiresAuth: true },
  },
  {
    path: "/receiver",
    name: "receiver",
    component: ReceiversView,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-slip-generator",
    name: "PaymentView",
    component: PaymentView,
    meta: { requiresAuth: true },
  },
  {
    path: "/statistics",
    name: "statistics",
    component: StatsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/register",
    name: "register",
    component: SignupForm,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: RequestPasswordReset,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
