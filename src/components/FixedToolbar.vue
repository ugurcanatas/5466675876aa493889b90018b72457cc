<template>
  <div class="fixed-toolbar px-6 py-1">
    <div class="pa-0">
      <picture>
        <source :srcset="requireLogo" media="(min-width: 1000px)" />
        <source :srcset="requireLogo" media="(max-width: 1000px)" />
        <img width="36px" :srcset="requireLogo" />
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
$toolbar-color: #3139f0

.fixed-toolbar

  background-color: $toolbar-color
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
</style>