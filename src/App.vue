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
<style >
/* @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,700;1,900&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700;900&display=swap");

h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
a,
button,
div {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
