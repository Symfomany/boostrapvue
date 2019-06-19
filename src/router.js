import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/location",
      name: "location",
      component: () => import("./views/Location.vue"),
      children: [
        {
          path: "search",
          component: () => import("./views/location/SearchLocation.vue")
        },
        {
          path: "view/:id",
          component: () => import("./views/location/ViewLocation.vue")
        },
        {
          path: "create",
          component: () => import("./views/location/CreateLocation.vue")
        }
      ]
    },
    {
      path: "/adhesion",
      name: "location",
      component: () => import("./views/Adhesion.vue")
    },
    {
      path: "/etablissement",
      name: "etablissement",
      component: () => import("./views/Etablissement.vue")
    },
    {
      path: "/promotion",
      name: "promotion",
      component: () => import("./views/Promotion.vue")
    },
    {
      path: "/impression",
      name: "impression",
      component: () => import("./views/Impression.vue")
    },
    {
      path: "/parametre",
      name: "parametre",
      component: () => import("./views/Parametre.vue")
    }
  ]
});

router.afterEach(to => {
  if (to.name != "login") {
    const connected = localStorage.getItem("connected");
    if (connected !== "true") {
      return router.push("/login");
    }
  }
});

export default router;
