exports.generate = () => {
    return `
    <template>
    <div>
      <app-navigation></app-navigation>
      <v-main>
        <v-container fluid>
          <v-scroll-y-transition mode="out-in">
            <router-view></router-view>
          </v-scroll-y-transition>
        </v-container>
      </v-main>
    </div>
  </template>
  
  <script>
  import AppNavigation from "../components/navigation/AppNavigation.vue";
  
  export default {
    components: {
      AppNavigation,
    },
  };
  </script>  
  `;
  };
  