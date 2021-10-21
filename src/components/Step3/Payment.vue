<template>
  <div class="middle-container align-self-stretch flex-grow-1 ">
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters class="justify-center">
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
                  formModel["cardnumber"] !== ""
                    ? formModel["cardnumber"]
                    : "1234 5678 9101 1121"
                }}
              </div>
            </div>
            <div class="default-row ">
              <div class="username">
                {{
                  formModel["cardholder"] !== ""
                    ? formModel["cardholder"]
                    : "Cardholder Name"
                }}
              </div>
              <div class="cvv-exp">
                <span>{{
                  formModel["month"] !== ""
                    ? String(formModel["month"]).length === 1
                      ? `0${formModel["month"]}`
                      : formModel["month"]
                    : "**"
                }}</span>
                <span>/</span>
                <span>{{
                  formModel["year"] !== ""
                    ? String(formModel["year"]).slice(2, 4)
                    : "**"
                }}</span>
                <span class="mx-1" />
                <span>{{
                  formModel["card_cvv"] !== "" ? formModel["card_cvv"] : "***"
                }}</span>
              </div>
            </div>
          </div>
        </v-row>
        <v-col class="py-4 px-16">
          <h2 class="default-header py-2 hairline bottom">
            Card Information
          </h2>
          <v-row no-gutters>
            <v-text-field
              v-model="formModel['cardholder']"
              label="Cardholder Name"
            />
            <span class="mx-sm-2" />
            <v-text-field
              label="Card Number"
              v-model="formModel['cardnumber']"
            />
          </v-row>
          <v-row no-gutters>
            <v-select
              v-model="formModel['month']"
              label="Expiration Month"
              :items="months"
            />
            <span class="mx-sm-2" />
            <v-select
              label="Expiration Year"
              v-model="formModel['year']"
              :items="years"
            />
            <span class="mx-sm-2" />
            <v-text-field label="CVV" v-model="formModel['card_cvv']" />
          </v-row>
        </v-col>
      </v-col>
      <v-col>
        Right Side
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formModel: {
        cardholder: "",
        cardnumber: "",
        month: "",
        year: "",
        card_cvv: ""
      },
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      years: []
    };
  },
  created() {
    this.years = Array.from(
      {
        length: 20
      },
      (_, i) => i + 2021
    );
  }
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600&display=swap')
$default_font: 'Inconsolata', monospace

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

.credit-card
    width: 300px
    height: 178px
    background-size: 100%
    background-image: url("~@/assets/sample-card.png")
    border-radius: 16px
    margin: 12px 64px
    display: flex
    flex-direction: column
    justify-content: space-between

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
    >.username
        color: white
        font-size: 1.1em
        font-weight: 600
        font-family: $default_font !important
        border-radius: 4px
    >.number
        color: white
        font-size: 1.4em
        font-weight: 600
        font-family: $default_font !important
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
</style>