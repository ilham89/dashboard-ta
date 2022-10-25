import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Aspiration from "../views/Aspiration.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/aspiration",
    name: "Aspiration",
    component: <Aspiration />,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
