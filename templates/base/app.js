exports.generate = () => {
  return `
<template>
  <v-fade-transition mode="out-in">
    <router-view></router-view>
  </v-fade-transition>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
`;
};
