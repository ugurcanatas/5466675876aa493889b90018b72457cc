<template>
  <div class="crumb-wrapper hairline bottom">
    <div class="crumbs">
      <div
        :class="`crumb ${currentCrumbIndex === i ? 'active' : 'not-active'}`"
        v-for="(crumb, i) in crumbData"
        :key="i"
      >
        <a class="white--text crumb-text"><span>Adım</span> {{ i + 1 }}</a>
      </div>
    </div>
    <div>
      <h2 class="crumb-prompt">{{ crumbData[currentCrumbIndex].prompt }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Required true since we need that crumbs array to render
    crumbData: {
      type: Array,
      required: true
    },
    //Defaults to index 0
    currentCrumbIndex: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    getCardIcon: function() {
      return require("../assets/card-icon.svg");
    }
  }
};
</script>

<style lang="sass" scoped>
$crumbs-bg: #C2C4ED
$crumbs-active: #3139F0
$base-button-hover: #BBFFA4
$base-button-hover-text: #3139F0

@mixin breakpoint($width)
  @if $width == mobile
    @media (max-width: 600px)
      @content
  @else if $width == small
    @media (max-width:900px)
      @content

.crumb-wrapper
  display: flex
  flex-direction: row
  justify-content: space-between
  align-self: stretch
  align-items: center
  padding: 24px
  @include breakpoint(mobile)
    padding: 12px
  @include breakpoint(small)
    flex-direction: column

.crumbs
  display: flex
  height: 48px
  background-color: $crumbs-bg
  clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0% 100%, 0% 50%, 0% 0%)
  border-radius: 8px
  @include breakpoint(mobile)
    height: 36px

.crumb
  @include breakpoint(mobile)
    font-size: .9em
  transition: .2s ease-in-out
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
    @include breakpoint(mobile)
      line-height: 36px

.crumb-prompt
  @include breakpoint(mobile)
    font-size: 1.2em
    margin-top: 8px
  font-weight: medium
  text-transform: lowercase
  font-size: 1.8em
  &:first-letter
    text-transform: uppercase

.crumb-text
  margin: 32px
  @include breakpoint(mobile)
    margin: 20px
  &>span
    @include breakpoint(mobile)
      display: none
</style>