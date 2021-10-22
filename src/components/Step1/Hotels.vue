<template>
  <div class="align-self-stretch flex-grow-1 middle-container">
    <div class="sticky-filter hairline bottom">
      <hotels-filter
        ref="formRef"
        @limitChecker="filterHotels"
        :form-model="formModel"
      />
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
import HotelsFilter from "./HotelsFilter.vue";
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
      formModel: {
        adult: 1,
        child: 0
      },
      selectedItem: -1,
      singleHotelInfo: {},
      showSidebar: false,
      filterOnCreated: false,
      selectedHotelObject: {}
    };
  },
  computed: {
    ...mapGetters({
      getMergedHotels: "hotelModule/getMergedHotels",
      getFormData: "hotelModule/getFormData"
    })
  },
  watch: {
    /**
     * When created lifecycle gets called, we are setting the formModel prop
     * but updated data does not trigger input events in HotelsFilter component.
     * In order to get around this issue, let's deep watch the formModel object and
     * whenever formModel updates on first created lifecycle, we are going to call our filter method,
     * thus we will achive default filter on refresh or returning to the previous form component.
     */
    formModel: {
      deep: true,
      handler: function(v) {
        const { adult, child } = v;
        console.log("Deep Watch", v);
        if (this.filterOnCreated) {
          this.filterHotels({ child, adult });
        }
      }
    }
  },
  created() {
    /**
     * If we have a stored form data on localStorage, let's extract and parse it first
     * and then pass it to the formModel prop on HotelsFilter component in order to
     * return to the last saved state
     */
    if (this.getFormData !== null) {
      const { data } = this.getFormData["FORM_1"];
      console.log("FORM 1 data", data);
      this.formModel = data;
      this.filterOnCreated = true;
    }
  },
  methods: {
    ...mapActions({
      actionPushFiltered: "hotelModule/actionPushFiltered",
      actionPushFormData: "hotelModule/actionPushFormData",
      actionHotelSelected: "hotelModule/actionHotelSelected"
    }),
    filterHotels: function({ child, adult }) {
      //When manually filtering/searching, disable filterOnCreated
      //We don't want to call filterHotels back to back
      this.filterOnCreated = false;
      //This disables items that does not match current conditions
      this.selectedItem = -1;
      this.$emit("hideButtons");
      let filteredHotels = this.hotelsWithDetails.map(hotel => {
        const { max_adult_size, child_status } = hotel;
        let isDisabled = false;
        if ((!child_status && child > 0) || max_adult_size < adult) {
          isDisabled = true;
        } else if (child === 0 && adult === 1) {
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
    validateHotelForm: function() {
      if (
        !this.$refs.formRef.$refs.nestedRef.validate() ||
        this.selectedItem === -1
      ) {
        return false;
      }
      localStorage.getItem("formData") && localStorage.removeItem("formData");
      this.actionPushFormData({
        data: {
          ...this.formModel,
          hotel_id: this.selectedHotelObject.id
        },
        type: "FORM_1"
      });
      return true;
    },
    selectCard: function({ itemIndex, item }) {
      if (this.$refs.formRef.$refs.nestedRef.validate()) {
        console.log("Card Clicked", this.formModel);
        this.selectedItem = itemIndex;
        this.selectedHotelObject = item;
        this.actionHotelSelected(item);
        //this.$emit("cardSelected", item);
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