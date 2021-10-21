<template>
  <div :class="`pagin-btns ${showButtons ? 'show-btn' : 'hide-btn'}`">
    <button @click="$emit('previousForm')">
      <v-icon>mdi-chevron-left</v-icon>
      Previous
    </button>
    <v-btn @click="$emit('nextForm')">
      Next
      <v-icon color="white">mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    showButtons: Boolean,
    backEnabled: Boolean,
    nextEnabled: Boolean
  }
};
</script>

<style lang="sass">
.pagin-btns
  display: flex
  width: 100%
  justify-content: space-between
  padding: 16px
  background-color: #e6e7ff

.btn-pgn
  background-color: #467ee3
  padding: 12px
  color: white
  border-radius: 8px
  transition: all .4s ease-in-out
  font-size: 1.2em
  &:active
    transform: scale(1.05)
    &:hover
      background-color: #1459d9
</style>