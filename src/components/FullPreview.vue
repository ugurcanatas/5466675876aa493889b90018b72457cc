<template>
  <div class="preview-main">
    <div class="pb-4 hairline bottom">
      <!-- {{ getFullPreview }} -->
      <div class="pb-4">
        <span class="smallcap">hotel</span>
        <div
          style="display:flex; align-items:center; justify-content:flex-start;"
        >
          <div class="hotel-name mr-2">{{ getFullPreview.hotel }}</div>
          -
          <div class="hotel-city ml-2">{{ getFullPreview.city }}</div>
        </div>
      </div>
      <div class="pb-4">
        <span class="smallcap">dates</span>
        <div
          style="display:flex; align-items:center; justify-content:flex-start;"
        >
          <div class="date-tag mr-2">
            <span>{{ getFullPreview.start }}</span>
          </div>
          <div class="date-tag ml-2">
            <span>{{ getFullPreview.end }}</span>
          </div>
        </div>
      </div>
      <div class="pb-4">
        <span class="smallcap">selected room & view</span>
        <div
          style="display:flex; align-items:center; justify-content:flex-start;"
        >
          <div class="hotel-name mr-2">
            {{ getFullPreview.room.title }} / {{ getFullPreview.scenic.title }}
          </div>
        </div>
      </div>
      <div class="pb-4">
        <span class="smallcap">attendents</span>
        <div
          style="display:flex; align-items:center; justify-content:flex-start;"
        >
          <div class="text-value mr-2" style="display:flex; align-items:center">
            <v-icon>mdi-baby-carriage</v-icon
            >{{ getFullPreview.adult }} children
          </div>
          <div class="text-value ml-2" style="display:flex; align-items:center">
            <v-icon>mdi-account</v-icon>{{ getFullPreview.child }} adult
          </div>
        </div>
      </div>
    </div>
    <slot name="coupon"></slot>
    <slot name="price"></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    info: Object
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getFullPreview: "hotelModule/getFullPreview"
    })
  },
  methods: {}
};
</script>

<style lang="sass">
.preview-main

.text-value
  font-size: 1.3em

.smallcap
  font-variant: small-caps
  font-size: 1.1em
  &.large
    font-size: 1.6em
    font-weight: bold
</style>