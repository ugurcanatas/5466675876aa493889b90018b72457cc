<template>
  <div class="align-self-stretch flex-grow-1 middle-container">
    <div class="sticky-filter hairline bottom">
      <hotels-filter @limitChecker="filterHotels" />
    </div>
    <v-row class="no-gutters pa-6">
      <v-col
        v-for="(item, i) in hotelsWithDetails"
        :key="i"
        class="rounded-md col-md-6 col-lg-4 col-xl-3 col-sm-6 col-12 pa-4"
      >
        <v-card
          active-class="none"
          :ripple="false"
          @click="selectCard(i)"
          :disabled="item.isDisabled"
          elevation="1"
          :class="
            `flex hotel-card pa-0 ${selectedItem === i ? 'selected' : ''}`
          "
        >
          <img
            class="card-img"
            height="200px"
            :src="item.room_scenic[0].photo"
          />
          <div class="item-header  px-4 pt-4 pb-2">
            <p class="hotel-name mb-0">{{ item.hotel_name }}</p>
            <p class="hotel-city mb-0">
              {{ item.city }}
            </p>
          </div>
          <div class="rating-row row no-gutters px-4 pt-2 pb-4">
            <div class="row no-gutters align-center">
              <v-icon size="18" color="#FDD33D">mdi-star</v-icon>
              <div :class="`${getRatingClass(item.rating, 'range')} rating`">
                {{ item.rating }}
              </div>
              <!-- <div>
                  {{ getRatingClass(item.rating, "emojis") }}
                </div> -->
            </div>
            <v-spacer />
            <div>Other Icons</div>
          </div>
          <div class="pa-4 row no-gutters align-center  hairline top">
            <div class="row no-gutters">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="pa-2 mr-4 icon-possibility"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="#2145C6" size="20">{{
                      getIcons(item.possibilities[0])
                    }}</v-icon>
                  </div>
                </template>
                <span>{{ item.possibilities[0] }}</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="pa-2 mr-4 icon-possibility"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="#2145C6" size="20">{{
                      getIcons(item.possibilities[1])
                    }}</v-icon>
                  </div>
                </template>
                <span>{{ item.possibilities[1] }}</span>
              </v-tooltip>
            </div>
            <v-card-actions>
              <button @click.stop="showDetails" class="more-options">
                <span class="text-1"
                  >+ {{ item.possibilities.length - 2 }}
                </span>
                <span class="text-2"> &nbsp;seçenek daha</span>
              </button>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HotelsFilter from "../components/HotelsFilter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    hotelsWithDetails: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    HotelsFilter
  },
  data() {
    return {
      formModel: {},
      selectedItem: -1
    };
  },
  computed: {
    ...mapGetters({
      getMergedHotels: "hotelModule/getMergedHotels"
    })
  },
  methods: {
    ...mapActions({
      actionPushFiltered: "hotelModule/actionPushFiltered"
    }),
    filterHotels: function({ child_size, adult_size }) {
      //This disables items that does not match current conditions
      this.selectedItem = -1;
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
    selectCard: function(i) {
      console.log("Card Clicked");
      this.selectedItem = i;
    },
    showDetails: function() {
      console.log("Show details clicked");
    },
    getRatingClass: function(rating, type) {
      let converted = Number(rating);
      switch (true) {
        case converted >= 0 && converted < 1.25:
          return type === "range" ? "low" : "🥶";
        case converted >= 1.25 && converted < 2.5:
          return type === "range" ? "moderate" : "🥲";
        case converted >= 2.5 && converted < 3.75:
          return type === "range" ? "mid" : "🙂";
        case converted >= 3.75 && converted <= 5:
          return type === "range" ? "high" : "🥳";
        default:
          break;
      }
    },
    getIcons: function(type) {
      switch (type) {
        case "Kapalı Yüzme Havuzu":
          return "mdi-pool";
        case "Açık Yüzme Havuzu":
        case "Açık yüzme havuzu":
          return "mdi-pool";
        case "SPA Salonu":
          return "mdi-spa";
        case "Spor Salonu":
          return "mdi-weight-lifter";
        case "Sauna":
          return "mdi-pot-steam";

        default:
          break;
      }
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