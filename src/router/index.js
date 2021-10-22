import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Reservations from "../views/Reservations.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reservations",
    name: "Reservations",
    component: Reservations,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
