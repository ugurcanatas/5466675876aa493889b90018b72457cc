<template>
  <v-app>
    <fixed-toolbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import FixedToolbar from "./components/FixedToolbar.vue";

export default {
  name: "App",

  data: () => ({
    FixedToolbar //
  })
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
a {
  font-family: "Roboto Mono", monospace !important;
}
</style>
