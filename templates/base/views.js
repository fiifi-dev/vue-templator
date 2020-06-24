var _ = require("lodash");
var fs = require("fs").promises;

exports.generate = async (viewsFolder, items) => {
  try {
    let vImports = [];
    let vExports = [];
    vImports.push('import AppHome from "./AppHome.vue";');
    vImports.push(`import AppLogin from "./AppLogin.vue";`);
    vExports.push("AppHome");
    vExports.push("AppLogin");
    await fs.writeFile(`${viewsFolder}/AppHome.vue`, "");
    await fs.writeFile(
      `${viewsFolder}/AppLogin.vue`,
      `
    <template>
      <div></div>
    </template>

    <script>
    export default {};
    </script>

    <style lang="scss" scoped></style>`
    );

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemName = `App${_.capitalize(item.text)}`;
      vImports.push(`import ${itemName} from "./${itemName}.vue";`);
      vExports.push(itemName);
      await fs.writeFile(
        `${viewsFolder}/${itemName}.vue`,
        `
      <template>
        <div></div>
      </template>

      <script>
      export default {};
      </script>

      <style lang="scss" scoped></style>`
      );
    }
    return `
    ${vImports.join("\n")}

    export {
     ${vExports.join()}
      };`;
  } catch (error) {
    console.log(error);
  }
};
