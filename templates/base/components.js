const fs = require("fs").promises;
var _ = require("lodash")

exports.generate = async (componentsFolder, items) => {
  try {
    await fs.mkdir(`${componentsFolder}/navigation`, { recursive: true });
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let itemName = _.camelCase(item.text) 
      await fs.mkdir(`${componentsFolder}/${itemName}`, { recursive: true });
    }
  } catch (error) {
    console.log(error);
  }
};
