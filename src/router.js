import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
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
