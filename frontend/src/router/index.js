import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrganizationView from "@/views/OrganizationView.vue";
import BarcodeGenerator from "@/views/BarcodeGenerator.vue";
import ReceiversView from "@/views/ReceiversView.vue";
import StatsView from "@/views/StatsView.vue";
import PaymentView from "@/views/PaymentView.vue";
import LoginForm from "@/views/LoginForm.vue";
import SignupForm from "@/views/SignupForm.vue";

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
  },
  {
    path: "/barcode-generator",
    name: "BarcodeGenerator",
    component: BarcodeGenerator,
    props: (route) => ({ user: route.query.user }),
  },
  {
    path: "/receiver",
    name: "receiver",
    component: ReceiversView,
  },
  {
    path: "/payment-slip-generator",
    name: "PaymentView",
    component: PaymentView,
  },
  {
    path: "/statistics",
    name: "statistics",
    component: StatsView,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
