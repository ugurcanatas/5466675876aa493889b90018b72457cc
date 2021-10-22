<template>
  <div class="middle-container align-self-stretch flex-grow-1 ">
    <div class="payment-col-container" no-gutters>
      <div class="left-hand-side">
        <div style="display:flex; justify-content:center">
          <div class="credit-card pa-2">
            <div class="default-row">
              <div class="bank"><span>DB Debit</span> Card</div>
              <div class="bank-logo" />
            </div>
            <div class="default-row">
              <div class="chip" />
              <div class="type" />
            </div>
            <div class="default-row">
              <!-- <div class="card-chip" /> -->
              <div class="number">
                {{
                  formModel["card_number"] !== ""
                    ? formModel["card_number"].length > 16
                      ? `Enter a valid card number`
                      : formModel["card_number"].match(/.{1,4}/g).join(" ")
                    : "1234 **** **** 3210"
                }}
              </div>
            </div>
            <div class="default-row ">
              <div class="username">
                {{
                  formModel["card_name"] !== ""
                    ? formModel["card_name"].length > 18
                      ? `${formModel["card_name"].slice(0, 18)}...`
                      : formModel["card_name"]
                    : "Cardholder Name"
                }}
              </div>
              <div class="cvv-exp">
                <span>{{
                  formModel["card_date_month"] !== ""
                    ? formModel["card_date_month"]
                    : "**"
                }}</span>
                <span>/</span>
                <span>{{
                  formModel["card_date_year"] !== ""
                    ? String(formModel["card_date_year"]).slice(2, 4)
                    : "**"
                }}</span>
                <span class="mx-1" />
                <span>{{
                  formModel["card_cvv"] !== "" ? formModel["card_cvv"] : "***"
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="py-4 flex-1">
          <h2 class="default-header py-2 hairline bottom">
            Card Information
          </h2>
          <v-form v-model="valid" ref="paymentForm">
            <v-row no-gutters>
              <v-text-field
                v-model="formModel['card_name']"
                label="Cardholder Name"
                required
                :rules="defaultRule"
              />
              <span class="mx-sm-2" />
              <v-text-field
                label="Card Number"
                v-model="formModel['card_number']"
                required
                :rules="cardNumberRules"
              />
            </v-row>
            <v-row no-gutters>
              <v-select
                v-model="formModel['card_date_month']"
                label="Expiration Month"
                :items="months"
                required
                :rules="defaultRule"
              />
              <span class="mx-sm-2" />
              <v-select
                label="Expiration Year"
                v-model="formModel['card_date_year']"
                :items="years"
                required
                :rules="defaultRule"
              />
              <span class="mx-sm-2" />
              <v-text-field
                label="CVV"
                v-model="formModel['card_cvv']"
                required
                :rules="defaultRule"
              />
            </v-row>
          </v-form>
        </div>
      </div>
      <div class="right-hand-side">
        <full-preview>
          <template v-slot:coupon>
            <div style="display:flex; flex-direction:row; align-items:center">
              <v-text-field
                v-model="formModel['coupon_code']"
                label="Enter Coupon Code"
              />
              <span class="mx-4" />
              <v-btn
                @click="useCode"
                color="#51FFB2"
                elevation="1"
                :disabled="discount.discountUsed"
              >
                Use Code</v-btn
              >
            </div>
          </template>
          <template v-slot:price>
            <div class="py-2 hairline bottom">
              <div
                style="display:flex; align-items:center; justify-content:space-between;"
              >
                <div class="smallcap mr-2">room price</div>
                <div class="text-value ml-2">₺ {{ getFullPreview.price }}</div>
              </div>
            </div>
            <div class="py-2 hairline bottom">
              <div
                style="display:flex; align-items:center; justify-content:space-between;"
              >
                <div class="smallcap mr-2">extras</div>
                <div class="text-value ml-2">
                  % {{ getFullPreview.scenic.price_rate }}
                </div>
              </div>
            </div>
            <div class="py-2 hairline bottom">
              <div
                style="display:flex; align-items:center; justify-content:space-between;"
              >
                <div class="smallcap mr-2">total stay</div>
                <div class="text-value ml-2">
                  ({{ getTotalStay }} days)
                  <span class="ml-4"
                    >₺ {{ getFullPreview.price * getTotalStay }}</span
                  >
                </div>
              </div>
            </div>
            <div v-if="discount.discountUsed" class="py-2 hairline bottom">
              <div
                style="display:flex; align-items:center; justify-content:space-between;"
              >
                <div class="smallcap mr-2">discount</div>
                <div class="text-value ml-2">
                  <span class="mr-4">({{ discount.code }})</span> -₺{{
                    discount.discount_ammount
                  }}
                </div>
              </div>
            </div>
            <div class="py-2 hairline bottom">
              <div
                style="display:flex; align-items:center; justify-content:space-between;"
              >
                <div class="smallcap large mr-2">total</div>
                <div class="text-value ml-2">
                  ₺ {{ getTotalPrice(discount.discountUsed) }}
                </div>
              </div>
            </div>
          </template>
        </full-preview>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//import router from "../../router/index";
import FullPreview from "../FullPreview.vue";
export default {
  components: {
    FullPreview
  },
  data() {
    return {
      formModel: {
        card_name: "",
        card_number: "",
        card_date_month: "",
        card_date_year: "",
        card_cvv: ""
      },
      months: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      years: Array.from(
        {
          length: 20
        },
        (_, i) => `${i + 2021}`
      ),
      valid: true,
      defaultRule: [v => !!v || "Card name is required"],
      cardNumberRules: [
        v => !!v || "Card number is required",
        v =>
          /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|↵(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))/.test(
            v
          ) || "Please enter a valid card number",
        v => v.length === 16 || "Card number is required"
      ],
      discount: {
        discountUsed: false,
        code: "",
        discount_ammount: 0,
        expiration_at: ""
      },
      lastPrice: 0
    };
  },
  computed: {
    ...mapGetters({
      getFullPreview: "hotelModule/getFullPreview",
      getActionType: "hotelModule/getActionType",
      getReservation: "hotelModule/getReservation"
    }),
    getTotalStay: function() {
      return (
        (new Date(this.getFullPreview.end).getTime() -
          new Date(this.getFullPreview.start).getTime()) /
        (1000 * 3600 * 24)
      );
    }
  },
  methods: {
    ...mapActions({
      actionSetReservation: "hotelModule/actionSetReservation",
      actionSetAppState: "hotelModule/actionSetAppState"
    }),
    updateReservation: async function() {},
    validatePaymentForm: async function() {
      console.log(
        "Validate Payment Called",
        this.formModel,
        this.$refs.paymentForm.validate(),
        this.getFullPreview,
        this.getActionType
      );
      if (!this.$refs.paymentForm.validate()) {
        return false;
      }

      const { FORM_1, FORM_2 } = JSON.parse(localStorage.getItem("formData"));
      //hotel id should be a nubmer
      const {
        data: { adult, child, end_date, start_date, hotel_id }
      } = FORM_1;
      const {
        data: {
          room_scenic: { id: room_type },
          room_scenic: { id: room_scenic }
        }
      } = FORM_2;

      let body = {
        hotel_id: Number(hotel_id),
        start_date,
        end_date,
        adult,
        child,
        room_type,
        room_scenic,
        price: this.lastPrice,
        coupon_code: this.discount.discountUsed ? this.discount.code : "",
        ...this.formModel
      };

      console.log("Full Data", body);
      try {
        const postresponse = await fetch(
          this.getActionType === "UPDATE"
            ? `${process.env.VUE_APP_ENDPOINT_RESERVATION_SINGLE}${this.getReservation.id}`
            : process.env.VUE_APP_ENDPOINT_RESERVATIONS,
          {
            method: this.getActionType === "UPDATE" ? "PUT" : "POST",
            body: JSON.stringify(body)
          }
        );

        const reservation = await postresponse.json();
        console.log("Reservation response", reservation);
        this.actionSetReservation(reservation).then(() => {
          this.actionSetAppState({
            type: "success",
            message:
              this.getActionType === "UPDATE"
                ? "Your reservation has been updated"
                : "Reservation created successfully"
          });
        });
        this.$router.replace({
          name: "Reservations",
          params: {
            reservation
          }
        });
        //return
      } catch (error) {
        this.actionSetAppState({
          type: "error",
          message: "An error occured"
        });
        return false;
      }
    },
    useCode: async function() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_ENDPOINT_COUPON_CODE}${this.formModel["coupon_code"]}`,
          {
            method: "GET"
          }
        );

        const result = await response.json();
        //check if there is a coupon code returned
        /* eslint-disable */
        if (result.length > 0) {
          const { code, discount_ammount, expiration_at } = result[0];
          if (new Date() < new Date(expiration_at)) {
            console.log("Yes this is a valid code");
            this.discount = {
              ...this.discount,
              discount_ammount,
              code,
              expiration_at,
              discountUsed: true
            };
          }
          console.log("COUPON RESULT", result);
          return;
        }
      } catch (error) {
        throw new Error(error.message);
      }
      this.discount["discountUsed"] = false;
    },
    getTotalPrice: function(isDiscounted) {
      this.lastPrice = isDiscounted
        ? this.getTotalStay * this.getFullPreview.price -
          this.discount.discount_ammount
        : this.getTotalStay * this.getFullPreview.price;
      return this.lastPrice;
    }
  }
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600&display=swap')
$default_font: 'Inconsolata', monospace

.middle-container
    overflow-y: scroll

.payment-col-container
    height: 100%
    display: flex
    flex-direction: row
    @include breakpoint(mobile)
        flex-direction: column
    @include breakpoint(small)
        flex-direction: column

.credit-card
    width: 300px
    height: 178px
    background-size: 100%
    background-image: url("~@/assets/sample-card.png")
    border-radius: 8px
    padding: 12px 64px
    display: flex
    flex-direction: column
    justify-content: space-between
    // box-shadow: 0px 0px 10px 5px rgba(255,74,155,0.25)
    box-shadow: 0px 0px 20px 3px rgba(49,57,240,0.3)
    @include breakpoint(mobile)
        padding: 16px 16px
    @include breakpoint(small)
        padding: 16px 16px

.default-row
    display: flex
    flex-direction: row
    justify-content: space-between
    space-between 
    align-items: center
    >.cvv-exp
        & span
            font-family: $default_font !important
            color: white
            text-shadow: 0px 1px 1px #000000
    >.username
        color: white
        font-size: 1.1em
        font-weight: 600
        font-family: $default_font !important
        border-radius: 4px
        text-shadow: 0px 1px 1px #000000
    >.number
        color: white
        font-size: 1.4em
        font-weight: 600
        font-family: $default_font !important
        text-shadow: 0px 3px 2px #000000
    >.type
        background-image: url("~@/assets/visa.svg")
        height: 48px
        width: 48px
        background-size: 100%
        background-position: center

    >.chip
        background-image: url("~@/assets/card-chip.svg")
        height: 36px
        width: 36px
        background-size: 100%
        background-position: center
    >.bank
        font-size: 1.2em
        color: white
        font-weight: medium
        & span
            font-style: italic
            font-weight: bold
    >.bank-logo
        background-image: url("~@/assets/deutsche-bank.svg")
        height: 36px
        width: 36px
        background-size: 100%
        background-position: center

.left-hand-side
    flex: 1
    padding: 16px 64px
    @include breakpoint(mobile)
        padding: 16px 16px
    @include breakpoint(small)
        padding: 16px 16px

.right-hand-side
    background-color: #f7f8ff
    padding: 16px 64px
    display: flex
    flex-direction: column
    flex: 1
    @include breakpoint(mobile)
        padding: 16px 16px
    @include breakpoint(small)
        padding: 16px 16px
</style>