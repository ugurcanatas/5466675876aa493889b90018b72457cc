<template>
  <v-card
    active-class="none"
    :ripple="false"
    @click="$emit('selectCard', { itemIndex, item })"
    :disabled="item.isDisabled"
    elevation="1"
    :class="
      `flex hotel-card pa-0 ${
        selectedItemIndex === itemIndex ? 'selected' : ''
      }`
    "
  >
    <img class="card-img" height="200px" :src="item.room_scenic[0].photo" />
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
            <div class="pa-2 mr-4 icon-possibility" v-bind="attrs" v-on="on">
              <v-icon color="#2145C6" size="20">{{
                getIcons(item.possibilities[0])
              }}</v-icon>
            </div>
          </template>
          <span>{{ item.possibilities[0] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="pa-2 mr-4 icon-possibility" v-bind="attrs" v-on="on">
              <v-icon color="#2145C6" size="20">{{
                getIcons(item.possibilities[1])
              }}</v-icon>
            </div>
          </template>
          <span>{{ item.possibilities[1] }}</span>
        </v-tooltip>
      </div>
      <v-card-actions>
        <button @click.stop="$emit('showDetails', item)" class="more-options">
          <span class="text-1">+ {{ item.possibilities.length - 2 }} </span>
          <span class="text-2"> &nbsp;seçenek daha</span>
        </button>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    itemIndex: Number,
    selectedItemIndex: Number
  },
  data() {
    return {};
  },
  methods: {
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
</style>