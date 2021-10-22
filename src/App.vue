<template>
  <v-app>
    <fixed-toolbar />
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar v-model="show" :timeout="visibleFor" :color="color">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import store from "./store/index";
export default {
  name: "App",
  data: () => ({
    show: false,
    message: "",
    visibleFor: 5000,
    color: "neutural",
    unsubscribe: null
  }),
  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  },
  created() {
    this.unsubscribe = store.subscribe(this.subscribeHandler);
  },
  methods: {
    subscribeHandler: function({ type, payload }) {
      switch (type) {
        case "hotelModule/setAppState":
          this.color = payload.type;
          this.message = payload.message;
          this.show = true;
          console.log("New Snackbar");
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="sass">
@import "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700;900&display=swap"

h1
h2
h3
h4
h5
h6
p
span
a
button
div
  font-family: "Source Sans Pro", sans-serif

.error
  background-color: 'red'
</style>
