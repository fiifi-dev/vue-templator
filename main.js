var { base } = require("./generators/base");

(function () {
  let argv = require("yargs")
    .command("base", "create the base navigation template", {
      name: {
        describe: "Name of base template",
        demand: true,
        alias: "n",
      },
    })
    .help().argv;

  let command = argv._[0];

  if (command === "base") {
    base();
  }
})();
