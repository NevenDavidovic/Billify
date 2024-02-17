import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrganizationView from "@/views/OrganizationView.vue";
import BarcodeGenerator from "@/views/BarcodeGenerator.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
