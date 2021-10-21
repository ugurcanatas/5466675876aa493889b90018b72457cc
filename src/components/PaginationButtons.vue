<template>
  <div class="pagin-btns">
    <v-btn
      text
      @click="$emit('previousForm')"
      :disabled="pagination.backDisabled"
    >
      <v-icon>mdi-chevron-left</v-icon>
      {{ pagination.paginationPrevText }}
    </v-btn>
    <v-btn
      color="#3139F0"
      class="white--text"
      @click="$emit('nextForm')"
      :disabled="pagination.nextDisabled"
    >
      {{ pagination.paginationNextText }}
      <v-icon color="white">mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    showButtons: Boolean,
    backEnabled: Boolean,
    nextEnabled: Boolean,
    pagination: Object
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