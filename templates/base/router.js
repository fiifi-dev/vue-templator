var _ = require("lodash");

exports.generate = (items) => {
  let vImports = [];
  let vRoutes = [];
  vImports.push("AppHome");
  vImports.push("AppLogin");

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemComponent = `App${_.capitalize(item.text)}`;
    vImports.push(itemComponent);
    let itemPath = `${item.text.toLowerCase()}`;
    vRoutes.push(`{
      name: "${itemPath}",
      path: "/${itemPath}",
      component: ${itemComponent},
      meta: {
        requiresAuth: true,
      },
    }`);
  }

  let output = `
  import Vue from "vue";
  import VueRouter from "vue-router";
  Vue.use(VueRouter);
  import { getCurrentUser, auth } from "../plugins/db";
  
  import { ${vImports.join()} } from "../views/index.js";

  const routes = [
      {
        name: "",
        path: "",
        redirect: { name: "login" },
      },
      {
        name: "login",
        path: "/login",
        component: AppLogin,
      },
      {
        path: "/home",
        component: AppHome,
        meta: {
          requiresAuth: true,
        },
        children: [${vRoutes.join()}],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// async function isAdmin() {
//   try {
//     let idTokenResult = await auth.currentUser.getIdTokenResult();
//     if (idTokenResult.claims.admin) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// }

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !(await getCurrentUser())) {
    next("login");
  } else {
    next();
  }
});

export default router;`;

  return output;
};
