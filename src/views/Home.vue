<template>
  <v-container
    fluid
    fill-height
    class="justify-space-between align-self-stretch d-flex flex-column pa-0"
  >
    <div
      class="flex-row d-flex justify-space-between align-self-stretch align-center ma-6"
    >
      <div class="crumbs">
        <div
          :class="`crumb ${activeStepperIndex === i ? 'active' : 'not-active'}`"
          v-for="(crumb, i) in crumbData"
          :key="i"
        >
          <a class="ma-8 white--text crumb-text">Adım {{ i + 1 }}</a>
        </div>
      </div>
      <div>
        <h2>{{ crumbData[activeStepperIndex].prompt }}</h2>
      </div>
    </div>
    <div class="hairline"></div>
    <div class="align-self-stretch flex-grow-1">Part Form</div>

    <!-- <v-flex>
      <v-row v-for="item in hotels" :key="item.id">
        <p>{{ item }}</p>
      </v-row>
    </v-flex> -->
  </v-container>
</template>

<script>
import store from "../store/index";
import { mapActions } from "vuex";
import StepperWrapper from "../components/Stepper.vue";
import FormWrapper from "../components/FormComponent.vue";
/*eslint-disable */
export default {
  name: "Home",
  components: {
    StepperWrapper,
    FormWrapper
  },
  data() {
    return {
      unsubscribe: null,
      hotels: [],
      activeStepperIndex: 0,
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
    //unsub from store
    this.unsubscribe && this.unsubscribe();
  },
  created() {
    this.unsubscribe = store.subscribe(this.subscribeHandler);
  },
  // Fetch hotels lists async when component is mounted
  async mounted() {
    //uncomment later
    // const result = await fetch(process.env.VUE_APP_ENDPOINT_HOTEL_LIST, {
    //   method: "GET"
    // });
    // const data = await result.json();
    // console.log("Data", data);
    // this.actionPushHotels(data);
    setInterval(() => {
      if (this.activeStepperIndex === 2) {
        this.activeStepperIndex = 0;
        return;
      }
      this.activeStepperIndex++;
    }, 5000);
  },
  methods: {
    ...mapActions({
      actionPushHotels: "hotelModule/actionPushHotels"
    }),
    subscribeHandler: function({ type, payload }) {
      console.log("Listening store events", type, payload);
      switch (type) {
        case "hotelModule/pushHotels":
          this.hotels = payload;
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="sass">
$crumbs-bg: #C2C4ED
$crumbs-active: #3139F0

.crumbs
  display: flex
  height: 48px
  background-color: $crumbs-bg
  clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0% 100%, 0% 50%, 0% 0%)
  border-radius: 8px

.crumb
  transition: .2s cubic-bezier(.71,.7,.42,-0.14)
  border-radius: 8px
  background-color: white
  clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%)
  &:first-child
    clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)
  &.active
    background-color: $crumbs-active
  &.not-active
    background-color: $crumbs-bg
  > a
    font-weight: 600
    font-size: 1em
    line-height: 48px
    text-decoration: none

.hairline
  background: #efefef
  height: 1px
  width: 100%
</style>
