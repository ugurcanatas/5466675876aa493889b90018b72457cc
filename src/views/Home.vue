<template>
  <v-container
    fluid
    fill-height
    class="justify-space-between align-self-stretch d-flex flex-column pa-0"
  >
    <crumbs :crumbData="crumbData" :currentCrumbIndex="currentCrumbIndex" />
    <!-- make hairline css global -->
    <div class="hairline"></div>
    <hotels
      :hotelsWithDetails="isFiltered ? filteredHotels : hotelsWithDetails"
    />
  </v-container>
</template>

<script>
import store from "../store/index";
import { mapActions } from "vuex";
import Crumbs from "../components/Crumbs.vue";
import Hotels from "../components/Hotels.vue";
/*eslint-disable */
export default {
  name: "Home",
  components: {
    Crumbs,
    Hotels
  },
  data() {
    return {
      unsubscribe: null,
      hotels: [],
      hotelsWithDetails: [],
      filteredHotels: [],
      isFiltered: false,
      completedCrumbs: [0],
      currentCrumbIndex: 0,
      activeTitle: "",
      crumbData: [
        {
          icon: "mdi-calendar",
          prompt: "Otel ve tarih seçimi"
        },
        {
          icon: "mdi-bed",
          prompt: "Otel tipi ve manzara"
        },
        {
          icon: "mdi-credit-card",
          prompt: "Önizleme ve ödeme"
        }
      ]
    };
  },
  beforeDestroy() {
    //unsub from store subscription
    this.unsubscribe && this.unsubscribe();
  },
  // Fetch hotels with promise.all in component created lifecycle hook
  async created() {
    this.unsubscribe = store.subscribe(this.subscribeHandler);

    try {
      const promises = [
        process.env.VUE_APP_ENDPOINT_HOTEL_LIST,
        process.env.VUE_APP_ENDPOINT_HOTEL_DETAILS
      ].map(async url => await this.fetchGet(url));

      const resolved = (await Promise.all(promises)).map(data => data);
      //const [hotels, hotelsWithDetails] = resolved;
      //this.actionPushHotels(hotels); //we don't need this action.
      this.actionMerge(resolved);
    } catch (error) {
      console.log("Some Error", error);
    }
  },
  methods: {
    ...mapActions({
      actionPushHotels: "hotelModule/actionPushHotels",
      actionPushHotelsWithDetails: "hotelModule/actionPushHotelsWithDetails",
      actionMerge: "hotelModule/actionMerge"
    }),
    subscribeHandler: function({ type, payload }) {
      console.log("Listening store events", type, payload);
      switch (type) {
        case "hotelModule/pushHotels":
          this.hotels = payload;
          break;
        case "hotelModule/pushMerged":
          this.hotelsWithDetails = payload;
          break;
        case "hotelModule/pushFiltered":
          this.filteredHotels = payload;
          this.isFiltered = true;
          break;
        default:
          break;
      }
    },
    fetchGet: async function(URL) {
      const res = await fetch(URL, {
        method: "GET"
      });

      return res.json();
    }
  }
};
</script>
<style lang="sass">
.hairline
  &.top
    border-top: thin solid rgba(0,0,0,.05)
  &.bottom
    border-bottom: thin solid #efefef
</style>
