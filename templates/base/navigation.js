let _ = require("lodash");

exports.generate = (options, items) => {
  return `
  <template>
    <div>
      <v-navigation-drawer v-model="drawer" app dark color="primary">
        <v-list color="primary darken-1 pb-10">
          <v-list-item>
            <v-list-item-action>
              <v-img
                height="24"
                width="24"
                contain
                src="@/assets/logo.png"
              ></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="overline">${_.startCase(
                options.name
              )}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-row>
            <v-col class="text-center">
              <div class="overline">
                Dickson Afful
              </div>
              <div class="caption">
                fiifi.dev@gmail.com
              </div>
              <div></div>
            </v-col>
          </v-row>
        </v-list>
        <v-list dense>
          <div class="text-center mt-n10">
            <v-responsive class="d-inline-flex align-center justify-center">
              <v-img
                height="80"
                width="80"
                contain
                :src="src"
                class="thickborder rounded-circle"
              ></v-img>
            </v-responsive>
          </div>

          <v-subheader class="text-uppercase">Main</v-subheader>
          <v-list-item
            link
            v-for="item in navItems"
            :key="item.text"
            :to="item.to"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content class="overline">
              {{ item.text }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app light color="white" dense class="app-boxshadow">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="overline">
          Dashboard
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text small>
            <v-badge overlap content="1" color="error">
              <v-icon>mdi-forum-outline</v-icon>
            </v-badge>
          </v-btn>
          <v-menu offset-y tile>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" small>
                <v-img
                  height="30"
                  width="30"
                  contain
                  :src="src"
                  class="rounded-circle mr-3"
                ></v-img>
                Dickson
                <v-icon right dark>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                v-for="(item, index) in dropdownItems"
                :key="index"
                link
                :to="item.to"
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-app-bar>
    </div>
  </template>

  <script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      src: "https://picsum.photos/200",
      navItems: ${JSON.stringify(items.navItems) },
      dropdownItems: ${JSON.stringify(items.dropdownItems)},
    }),
  };
  </script>
  <style lang="scss"></style>
`;
};
