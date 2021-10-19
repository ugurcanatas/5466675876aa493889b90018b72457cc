<template>
  <div class="pa-4 stepper-main">
    <div class="stepper-wrapper">
      <div class="stepper-item ">
        <span class="span-circle  span-circle-passive pa-2">
          <img height="32px" width="32px" :src="getCardIcon" />
        </span>
        <div class="mb-0">Stepper text 1</div>
      </div>
      <div class="step-line "></div>
      <div class="stepper-item">
        <span class="span-circle span-circle-passive pa-2">
          <img height="32px" width="32px" :src="getCardIcon" />
        </span>
        <div class="mb-0">Stepper text 2</div>
      </div>
      <div class="step-line "></div>
      <div class="stepper-item">
        <span class="span-circle span-circle-active pa-2">
          <img height="32px" width="32px" :src="getCardIcon" />
        </span>
        <div class="mb-0">Stepper text 3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getCardIcon: function() {
      return require("../assets/card-icon.svg");
    }
  }
};
</script>

<style lang="sass" scoped>
$stepper-bg: navy
$circle-active: #33c47e
$circle-passive: #ffffff

.stepper-main
    background-color: $stepper-bg

.stepper-wrapper
    background-color: $stepper-bg
    align-items: stretch
    display: flex
    flex-wrap: wrap
    justify-content: space-between

.stepper-item
    display: flex
    flex-direction: column
    position: relative
    justify-content: center
    align-items: center

.stepper-active
    background-color: $circle-active

.stepper-passive
    background-color: $circle-passive

.step-line
    background-color: $circle-passive
    align-self: center
    display: block
    flex: 1 1 0px
    max-width: 100%
    height: 0
    border: solid white
    border-width: thin 0 0 0

.span-circle
    border-radius: 50%
    width: 48px
    height: 48px
    display: flex
    justify-content: center

    &-active
        background-color: $circle-active
    &-passive
        background-color: $circle-passive
</style>