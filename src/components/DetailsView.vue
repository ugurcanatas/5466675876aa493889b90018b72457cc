<template>
  <div>DetailsView</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    selectedHotel: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getFormData: "hotelModule/getFormData"
    })
  },
  created() {}
};
</script>

<style lang="sass">
</style>