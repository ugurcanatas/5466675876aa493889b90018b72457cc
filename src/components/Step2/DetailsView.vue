<template>
  <div class="middle-container align-self-stretch flex-grow-1 ">
    <v-row no-gutters class="align-center pa-4 sticky-top hairline bottom">
      <v-col class="col-sm-6 col-12">
        <h2 class="default-header small text-center text-sm-start">Between:</h2>
        <v-row no-gutters class="mb-4 justify-center justify-sm-start">
          <div class="date-tag mr-2">
            <span>{{ getFormData["FORM_1"].data.date_arrival }}</span>
          </div>
          <div class="date-tag ml-2">
            <span>{{ getFormData["FORM_1"].data.date_departure }}</span>
          </div>
        </v-row>
        <v-row no-gutters class="align-center justify-center justify-sm-start">
          <div class="hotel-name mr-2">{{ selectedHotel.hotel_name }}</div>
          -
          <div class="hotel-city ml-2">{{ selectedHotel.city }}</div>
        </v-row>
      </v-col>
      <v-col class="col-sm-6 col-12">
        <v-row no-gutters class="justify-center justify-sm-end">
          <span class="info-text mr-2"
            >{{ getFormData["FORM_1"].data.adult_size }}x adults</span
          >
          <span class="info-text ml-2"
            >{{ getFormData["FORM_1"].data.child_size }}x children</span
          >
        </v-row>
        <div class="my-2" />
        <v-row no-gutters class="justify-center justify-sm-end">
          <div class="total-price">₺ {{ calculatePrice() }}</div>
        </v-row>
      </v-col>
    </v-row>

    <div>
      <h2 class="default-header pt-4 text-center">Select Room Type</h2>
      <div class="room-type-main">
        <div
          v-for="(item, i) in selectedHotel.room_type"
          :key="item.id"
          class="pa-4"
        >
          <v-card
            @click="selectRoom(i, item)"
            :class="
              `flex-item-card pa-0 ${
                room_type && room_type.id === item.id ? 'selected' : ''
              }`
            "
          >
            <img :src="item.photo" class="img-room" />
            <div class="item-row">
              <div class="room-title">{{ item.title }}</div>
              <div class="room-pricing">
                <span>₺ {{ item.price }}</span>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <div>
      <h2 class="default-header pt-4 text-center">Select View Type</h2>
      <div class="room-type-main">
        <div
          v-for="(item, i) in selectedHotel.room_scenic"
          :key="item.id"
          class="pa-4"
        >
          <v-card
            @click="selectView(i, item)"
            :class="
              `flex-item-card pa-0 ${
                room_scenic && room_scenic.id === item.id ? 'selected' : ''
              }`
            "
          >
            <img :src="item.photo" class="img-room" />
            <div class="item-row">
              <div class="room-title">{{ item.title }}</div>
              <div class="room-pricing">
                <span>+{{ item.price_rate }}%</span>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    selectedHotel: {
      type: Object
    }
  },
  data() {
    return {
      //default is 0
      selectedRoomType: -1,
      selectedRoomScenic: -1,
      room_type: null,
      room_scenic: null
    };
  },
  computed: {
    ...mapGetters({
      getFormData: "hotelModule/getFormData"
    })
  },
  created() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    console.log("DETAILS CREATED CALL", this.getFormData["FORM_2"]);
    if (formData["FORM_2"]) {
      const {
        data: { room_scenic, room_type }
      } = formData["FORM_2"];
      console.log("FORM 2 data", formData["FORM_2"]);
      this.room_type = room_type;
      this.room_scenic = room_scenic;
    }
  },
  methods: {
    ...mapActions({
      actionPushFormData: "hotelModule/actionPushFormData"
    }),
    calculatePrice: function() {
      if (this.selectedRoomScenic === -1 || this.selectedRoomType === -1) {
        return 0;
      }
      const {
        FORM_1: {
          data: { adult_size }
        }
      } = this.getFormData;
      const { room_type, room_scenic } = this.selectedHotel;
      console.log("SELECTED HOTEL", this.selectedHotel);
      let room_price = room_type[this.selectedRoomType]["price"] * adult_size;
      const { price_rate } = room_scenic[this.selectedRoomScenic];
      console.log("Room price", room_price);
      console.log("Room price", price_rate);
      room_price += (room_price * price_rate) / 100;
      return room_price;
    },
    validateDetailsForm: function() {
      if (this.selectedRoomScenic === -1 || this.selectedRoomType === -1) {
        return false;
      }
      this.actionPushFormData({
        data: {
          room_type: this.room_type,
          room_scenic: this.room_scenic,
          price: this.calculatePrice()
        },
        type: "FORM_2"
      });
      return true;
    },
    selectRoom: function(i, item) {
      this.selectedRoomType = i;
      this.room_type = item;
    },
    selectView: function(i, item) {
      this.selectedRoomScenic = i;
      this.room_scenic = item;
    }
  }
};
</script>

<style lang="sass">
@mixin breakpoint($width)
  @if $width == mobile
    @media (max-width: 600px)
      @content
  @else if $width == small
    @media (min-width:600px) and (max-width:960px)
      @content
  @else if $width == medium
    @media (min-width:960px) and (max-width:1264px)
      @content
  @else if $width == large
    @media (min-width:1264px) and (max-width:1904px)
      @content
  @else if $width == xlarge
    @media (min-width:1904px)
      @content

.middle-container
  overflow-y: scroll

.date-tag
  background-color: #C2C4ED
  border-radius: 8px
  padding: 8px 12px
  >span
    color: #3139F0
    font-size: 1em
    font-weight: 600
.hotel-name
  font-size: 1.6em
  font-weight: 500
.hotel-city
  font-size: 1.3em
  font-weight: 600
  font-variant: small-caps
  &:first-letter
    font-size: .8em
.info-text
  font-size: 1.1em
  font-weight: 600

.room-type-main
  display: flex
  flex-wrap: nowrap
  flex: 1 1 auto
  justify-content: center
  @include breakpoint(mobile)
    flex-direction: column
  >.flex-item-card
    flex: 33%
    @include breakpoint(mobile)
      flex: 100%
    @include breakpoint(small)
      flex: 100%
  .img-room
    width: 100%
    height: 200px
    object-fit: cover
    @include breakpoint(mobile)
      height: 150px
    @include breakpoint(small)
      height: 150px
    @include breakpoint(medium)
      height: 200px
    @include breakpoint(large)
      height: 275px

.item-row
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding: 8px 12px

.flex-item-card
  transition: background-color .2s ease-in-out
  &.selected
    background-color: aquamarine

.room-title
  font-size: 1em
  font-weight: 500

.room-pricing
  font-size: 1em
  font-weight: 600
  padding: 4px 8px
  background-color: #EFFFF5
  border-radius: 6px
  >span
    color: #38d672

.total-price
  font-size: 1.8em
  font-weight: 600
  background-color: #EFFFF5
  padding: 4px 8px
  color: #38d672
  border-radius: 6px

.default-header
  font-size: 1.4em
  font-weight: 500
  color: black
  &.small
    font-size: 1.2em
  &.large
    font-size: 1.6em

.sticky-top
  position: sticky
  top: 0
  background: white
  z-index: 2
</style>