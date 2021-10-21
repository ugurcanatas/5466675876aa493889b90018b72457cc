<template>
  <div :class="`sidebar-main ${showSidebar ? 'show' : 'hide'}`">
    <div class="bottom-side">
      <div class="top-side">
        <div class="top-side-row">
          <h2 class="white--text">
            {{ singleHotelInfo.hotel_name }}
          </h2>
          <v-btn @click="emitCloseEvent" icon color="pink">
            <v-icon size="32">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <div class="row no-gutters  mt-2 ml-2">
          <div
            v-for="(possibility, i) in singleHotelInfo['possibilities']"
            :key="i"
            class="chip-item ma-2"
          >
            <p class="mb-0 pa-2">{{ possibility }}</p>
          </div>
        </div>
      </div>
      <MglMap
        class="map"
        :accessToken="ACCESS_TOKEN"
        mapStyle="mapbox://styles/mapbox/streets-v10"
        :center="
          showSidebar
            ? coordinates.filter(v => v.city === singleHotelInfo.city)[0].coords
            : [0, 0]
        "
        :zoom="12"
      >
      </MglMap>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
export default {
  props: {
    singleHotelInfo: {
      type: Object,
      required: false,
      default: () => {}
    },
    showSidebar: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MglMap
  },
  data() {
    return {
      ACCESS_TOKEN: process.env.VUE_APP_MAPBOX_KEY,
      mapbox: Mapbox,
      coordinates: [
        {
          city: "İstanbul",
          coords: [29.05508, 40.988939] // should be lng lat for mapbox
        },
        {
          city: "Antalya",
          coords: [30.854402, 36.86359] // should be lng lat for mapbox
        },
        {
          city: "İzmir",
          coords: [26.350493, 38.301292] // should be lng lat for mapbox
        },
        {
          city: "Muğla",
          coords: [27.395264, 37.033186] // should be lng lat for mapbox
        },
        {
          city: "Çanakkale",
          coords: [26.465388, 40.326606] // should be lng lat for mapbox
        }
      ]
    };
  },
  methods: {
    emitCloseEvent: function() {
      this.$emit("closeSidebar");
    }
  }
};
</script>

<style lang="sass">
.sidebar-main
    position: fixed
    right: 0
    top: 0
    height: 100vh
    width: 480px
    background-color: #d6e7ff
    z-index: 2
    display: flex
    flex-direction: column
    transform: translateX(480px)
    transition: transform 1s ease-in-out
    &.show
        transform: translateX(0px)
    &.hide
        transform: translateX(480px)

.top-side
    display: flex
    flex-direction: column
    width: 100%
    position: absolute
    z-index: 2
    >.top-side-row
        flex-direction: row
        display: flex
        justify-content: space-between
        padding: 16px
        background-color: rgba(0, 0, 0, .25)
        backdrop-filter: blur(5px)

.bottom-side
    flex: 1

.chip-item
    background-color: #f0f6ff
    border-radius: 8px
    border: thin solid #2145c6
    cursor: pointer
    >p
        color: #2145c6
        font-size: .9em
        font-weight: bold
</style>