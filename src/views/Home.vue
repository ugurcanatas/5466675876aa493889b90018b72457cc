<template>
  <div
    class="justify-space-between align-self-stretch d-flex flex-column pa-0"
    style="height: 100%"
  >
    <crumbs :crumbData="crumbData" :currentCrumbIndex="currentCrumbIndex" />
    <hotels
      v-if="
        currentCrumbIndex === 0 &&
          (filteredHotels.length > 0 || hotelsWithDetails.length > 0)
      "
      ref="hotelRef"
      :hotelsWithDetails="isFiltered ? filteredHotels : hotelsWithDetails"
    />
    <details-view
      ref="detailsRef"
      v-else-if="currentCrumbIndex === 1"
      :selected-hotel="selectedHotel"
    />
    <payment v-else-if="currentCrumbIndex === 2" />

    <pagination-buttons
      @nextForm="nextFormEvent"
      @previousForm="previousFormEvent"
      :show-buttons="showButtons"
      :back-enabled="currentCrumbIndex === 0 ? false : true"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import store from "../store/index";
import { mapActions } from "vuex";
import Crumbs from "../components/Crumbs.vue";
import Hotels from "../components/Step1/Hotels.vue";
import DetailsView from "../components/Step2/DetailsView.vue";
import Payment from "../components/Step3/Payment.vue";

export default {
  name: "Home",
  components: {
    Crumbs,
    Hotels,
    DetailsView,
    Payment
  },
  data() {
    return {
      unsubscribe: null,
      hotels: [],
      hotelsWithDetails: [],
      filteredHotels: [],
      selectedHotel: {},
      isFiltered: false,
      completedCrumbs: [0],
      currentCrumbIndex: 0,
      activeTitle: "",
      crumbData: [
        {
          icon: "mdi-calendar",
          prompt: "Select Hotel & Date"
        },
        {
          icon: "mdi-bed",
          prompt: "Hotel & View Type"
        },
        {
          icon: "mdi-credit-card",
          prompt: "Preview & Payment"
        }
      ],
      showButtons: false,
      pagination: {
        paginationNextText: "Save & Continue",
        paginationPrevText: "Back",
        backDisabled: true,
        nextDisabled: false
      }
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
  watch: {
    currentCrumbIndex: function(v) {
      this.pagination = {
        ...this.pagination,
        backDisabled: v === 0,
        paginationNextText: v !== 2 ? "Save & Continue" : "Make Payment"
      };
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
        case "hotelModule/setSelectedHotel":
          this.selectedHotel = payload;
          //this.currentCrumbIndex = 1;
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
    },
    nextFormEvent: function() {
      if (
        this.currentCrumbIndex === 0 &&
        this.$refs.hotelRef.validateHotelForm()
      ) {
        console.log("Form is valid", this.$refs.hotelRef);
        this.currentCrumbIndex++;
      } else if (
        this.currentCrumbIndex === 1 &&
        this.$refs.detailsRef.validateDetailsForm()
      ) {
        console.log("Details Form Validated");
        this.currentCrumbIndex++;
      }
    },
    previousFormEvent: function() {
      this.currentCrumbIndex !== 0 && this.currentCrumbIndex--;
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
