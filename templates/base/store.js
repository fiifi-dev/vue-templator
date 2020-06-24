var _ = require("lodash");
var fs = require("fs").promises;

exports.generate = async (storefolder, items) => {
  try {
    await fs.mkdir(`${storefolder}/modules`, { recursive: true });
    let vModules = [];
    let vImports = [];
    vModules.push("users");
    vImports.push('import users from "./modules/users";');

    await fs.writeFile(`${storefolder}/modules/users.js`, ``);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      itemName = _.camelCase(item.text);
      vImports.push(`import ${itemName} from "./modules/${itemName}";`);
      vModules.push(itemName);

      await fs.writeFile(`${storefolder}/modules/${itemName}.js`, ``);
    }
    let output = `
      import Vue from "vue";
      import Vuex from "vuex";
      import { vuexfireMutations } from "vuexfire";
      Vue.use(Vuex);
      ${vImports.join("\n")}
      
      export default new Vuex.Store({
          mutations: vuexfireMutations,
          actions: {},
          modules: {
              ${vModules.join()}
          },
        });`;

    return output;
  } catch (error) {
    console.log(error);
  }
};
