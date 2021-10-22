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
      <div style="height: 100%;">
        <iframe
          width="100%"
          height="100%"
          src="https://api.mapbox.com/styles/v1/telixtelemetry/ckv2valyl445f14o3uwgxbvai.html?title=false&access_token=pk.eyJ1IjoidGVsaXh0ZWxlbWV0cnkiLCJhIjoiY2t2MnY4c2JwMGNhbjJ1bzAzcGMwbmlsbiJ9.H697GUCGTUOv2e_a7iAmFw&zoomwheel=false#12/48.8665/2.3176"
          title="Basic"
          style="border:none;"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
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

  data() {
    return {
      staticMap: require("@/assets/staticmap.jpeg")
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
  @include breakpoint(mobile)
    width: 100%
    transform: translateX(100%)
  @include breakpoint(small)
    width: 100%
    transform: translateX(100%)
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