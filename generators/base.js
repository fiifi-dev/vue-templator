var { generate } = require("../templates/base");

exports.base = async () => {
  try {
    let theme = {
      primary: "#526766",
      secondary: "#b0bec5",
      accent: "#8c9eff",
      error: "#b71c1c",
    };
    let items = {
      navItems: [
        { text: "HOME", icon: "mdi-home-outline", to: "" },
        { text: "SETTINGS", icon: "mdi-cog-outline", to: "" },
        { text: "PROFILE", icon: "mdi-account-circle-outline", to: "" },
        { text: "LOGOUT", icon: "mdi-power", to: "" },
      ],
      dropdownItems: [
        { text: "HOME", icon: "mdi-home-outline", to: "" },
        { text: "SETTINGS", icon: "mdi-cog-outline", to: "" },
        { text: "PROFILE", icon: "mdi-account-circle-outline", to: "" },
        { text: "LOGOUT", icon: "mdi-power", to: "" },
      ],
    };
    let options = {
      name: "AG Central",
      location: "./output",
    };
   await generate(theme, options, items);
  } catch (error) {
    console.log(error.message);
  }
};
