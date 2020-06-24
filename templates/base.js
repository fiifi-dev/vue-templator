var _ = require("lodash");
var fs = require("fs").promises;
var app = require("./base/app");
var components = require("./base/components");
var home = require("./base/home");
var navigation = require("./base/navigation");
var plugin = require("./base/plugin");
var router = require("./base/router");
var store = require("./base/store");
var views = require("./base/views");

exports.generate = async (theme, options, items) => {
  try {
    let mainFolder = options.location;
    let componentsFolder = `${mainFolder}/components`;
    let pluginFolder = `${mainFolder}/plugin`;
    let routerFolder = `${mainFolder}/router`;
    let storeFolder = `${mainFolder}/store`;
    let viewsFolder = `${mainFolder}/views`;
    let navigationFolder = `${mainFolder}/components/navigation`;

    await fs.mkdir(mainFolder, { recursive: true });
    await Promise.all([
      await fs.mkdir(componentsFolder, { recursive: true }),
      await fs.mkdir(pluginFolder, { recursive: true }),
      await fs.mkdir(routerFolder, { recursive: true }),
      await fs.mkdir(storeFolder, { recursive: true }),
      await fs.mkdir(viewsFolder, { recursive: true }),
    ]);
    await fs.mkdir(navigationFolder, { recursive: true });

    var appData = app.generate();
    await components.generate(componentsFolder, items.navItems);
    var homeData = home.generate();
    var navigationData = navigation.generate(options, items);
    var pluginData = plugin.generate(theme)
    var routerData = router.generate(items.navItems)
    var storeData = await store.generate(storeFolder,items.navItems)
    var viewsData = await  views.generate(viewsFolder,items.navItems)

    fs.writeFile(`${mainFolder}/App.vue`, appData);
    fs.writeFile(`${viewsFolder}/AppHome.vue`, homeData);
    fs.writeFile(`${navigationFolder}/AppNavigation.vue`, navigationData);
    fs.writeFile(`${pluginFolder}/vuetify.js`,pluginData)
    fs.writeFile(`${routerFolder}/index.js`,routerData)
    fs.writeFile(`${storeFolder}/index.js`,storeData)
    fs.writeFile(`${viewsFolder}/index.js`,viewsData)

    console.log("base template created successfully");
  } catch (error) {
    console.log(error);
  }
};
