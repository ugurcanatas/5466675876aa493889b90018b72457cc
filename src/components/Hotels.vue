<template>
  <div class="align-self-stretch flex-grow-1 middle-container">
    <div class="sticky-filter hairline bottom">
      <hotels-filter ref="formRef" @limitChecker="filterHotels" />
    </div>
    <v-row class="no-gutters pa-6">
      <v-col
        v-for="(item, i) in hotelsWithDetails"
        :key="i"
        class="rounded-md col-md-6 col-lg-4 col-xl-3 col-sm-6 col-12 pa-4"
      >
        <card-item
          :item-index="i"
          :selected-item-index="selectedItem"
          :item="item"
          @showDetails="showDetails"
          @selectCard="selectCard"
        />
      </v-col>
    </v-row>
    <sidebar
      @closeSidebar="closeSidebar"
      :showSidebar="showSidebar"
      :singleHotelInfo="singleHotelInfo"
    />
  </div>
</template>

<script>
import HotelsFilter from "../components/HotelsFilter.vue";
import { mapActions, mapGetters } from "vuex";
import CardItem from "./CardItem.vue";

export default {
  props: {
    hotelsWithDetails: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    HotelsFilter,
    CardItem
  },
  data() {
    return {
      formModel: {},
      selectedItem: -1,
      singleHotelInfo: {},
      showSidebar: false
    };
  },
  computed: {
    ...mapGetters({
      getMergedHotels: "hotelModule/getMergedHotels"
    })
  },
  watch: {
    formModel: {
      deep: true,
      handler: function(v) {
        console.log("Deep Watch Value", v);
      }
    }
  },
  mounted() {
    console.log("Refs", this.$refs.formRef.$children[0].validate());
  },
  methods: {
    ...mapActions({
      actionPushFiltered: "hotelModule/actionPushFiltered",
      actionPushFormData: "hotelModule/actionPushFormData"
    }),
    filterHotels: function({ child_size, adult_size }) {
      //This disables items that does not match current conditions
      this.selectedItem = -1;
      this.$emit("hideButtons");
      let filteredHotels = this.hotelsWithDetails.map(hotel => {
        const { max_adult_size, child_status } = hotel;
        let isDisabled = false;
        if ((!child_status && child_size > 0) || max_adult_size < adult_size) {
          isDisabled = true;
        } else if (child_size === 0 && adult_size === 1) {
          isDisabled = false;
        }
        return {
          ...hotel,
          isDisabled
        };
      });

      //This filters OUT items that does not match current conditions
      // let filteredHotels = this.getMergedHotels.filter(hotel => {
      //   const { max_adult_size, child_status } = hotel;
      //   if (child_size === 0 && adult_size !== 0) {
      //     if (max_adult_size >= adult_size) {
      //       return hotel;
      //     }
      //   }
      //   if (
      //     (child_size !== 0 && adult_size === 0) ||
      //     (child_size !== 0 && adult_size !== 0)
      //   ) {
      //     if (child_status && max_adult_size >= adult_size) {
      //       return hotel;
      //     }
      //   }
      //   if (child_size === 0 && adult_size === 0) {
      //     return hotel;
      //   }
      // });
      this.actionPushFiltered(filteredHotels);
    },
    returnFormData: function() {},
    selectCard: function(i) {
      if (this.$refs.formRef.$refs.nestedRef.validate()) {
        console.log("Card Clicked");
        this.selectedItem = i;
        this.$emit("showButtons");
      }
    },
    showDetails: function(item) {
      console.log("Show details clicked");
      this.singleHotelInfo = item;
      this.showSidebar = true;
    },
    closeSidebar: function() {
      //this.singleHotelInfo = {};
      this.showSidebar = false;
    }
  }
};
</script>

<style lang="sass">
$rating-low: #FF5555
$rating-moderate: #F1C219
$rating-mid: #418AF8
$rating-high: #48E073

.middle-container
  height: 0px
  overflow-y: scroll

.sticky-filter
  position: sticky
  top: 0
  z-index: 2
  background-color: white

.hotel-card
  background-color: white
  transition: background-color .2s ease-in-out
  &.selected
    background-color: aquamarine

.card-img
  width: 100%
  object-fit: cover

.item-header
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  > .hotel-name
    font-size: 1.2em
    font-weight: 500
  > .hotel-city
    font-size: 1.2em
    font-weight: 600
    font-variant: small-caps
    &:first-letter
      font-size: .8em

.rating
  font-weight: 600
  color: white
  font-size: .9em
  border-radius: 6px
  padding: 4px 12px
  margin: 0px 8px
  &.low
    background-color: $rating-low
  &.moderate
    background-color: $rating-moderate
  &.mid
    background-color: $rating-mid
  &.high
    background-color: $rating-high

.icon-more-detail
  font-size: .9em
  font-weight: medium

.icon-possibility
  border-radius: 8px
  background-color: #f0f6ff

.more-options
  background-color: #f0f6ff
  transition: max-width .25s ,background-color .25s ease-in-out
  padding: 6px 10px
  border-radius: 4px
  display: flex
  &:hover
    background-color: #2145C6
    transition: background-color .25s,color .25s ease-in-out
    >.text-2,>.text-1
      color: white

  &:hover > .text-2
    max-width: 300px
  > .text-2
    transition: max-width .5s ease-in-out
    display: inline-block
    max-width: 0px
    overflow: hidden
    white-space: nowrap
    vertical-align: middle
</style>