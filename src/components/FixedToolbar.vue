<template>
  <div class="fixed-toolbar">
    <div class="pa-0">
      <picture>
        <source :srcset="requireLogo" media="(min-width: 1000px)" />
        <source :srcset="requireLogo" media="(max-width: 1000px)" />
        <img width="50px" :srcset="requireLogo" />
      </picture>
    </div>
    <div>Search Bar</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    requireLogo: function() {
      return require("../assets/company-logo.svg");
    }
  }
};
</script>

<style lang="sass">
$toolbar-color: #3139F0

.fixed-toolbar

  background-color: $toolbar-color
  height: 80px
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
</style>