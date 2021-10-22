<template>
  <div class="hotels-filter-wrapper">
    <v-form v-model="validForm" ref="nestedRef">
      <v-row no-gutters>
        <v-select
          label="Adult size"
          v-model="formModel['adult']"
          :items="adultSizes"
          @input="autoCompleteValidation"
          required
          :rules="[v => !!v || 'Adult size is required']"
        />
        <v-select
          label="Child size"
          v-model="formModel['child']"
          :items="childSizes"
          @input="autoCompleteValidation"
          required
        />
        <v-dialog
          width="290px"
          transition="scale-transition"
          :close-on-content-click="false"
          v-model="dialogModel['showArrival']"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="Pick an arrival date"
              v-model="formModel['start_date']"
              v-on="on"
              readonly
              prepend-icon="mdi-calendar"
              :rules="[v => !!v || 'Arrival date is required']"
            />
          </template>
          <v-date-picker v-model="formModel['start_date']"></v-date-picker>
        </v-dialog>

        <v-dialog
          width="290px"
          transition="scale-transition"
          :close-on-content-click="false"
          v-model="dialogModel['showDeparture']"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="Pick a departure date"
              v-model="formModel['end_date']"
              v-on="on"
              readonly
              prepend-icon="mdi-calendar"
              :rules="[v => !!v || 'Departure date is required']"
            />
          </template>
          <v-date-picker v-model="formModel['end_date']"></v-date-picker>
        </v-dialog>
        <v-btn @click="autoCompleteValidation">Search</v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    formModel: Object
  },
  data() {
    return {
      childSizes: [0, 1, 2, 3, 4, 5],
      adultSizes: [1, 2, 3, 4, 5],
      validForm: true,

      dialogModel: {
        showArrival: false,
        showDeparture: false
      }
    };
  },
  mounted() {
    // const inp = this.$refs.adultSizeField.$el.querySelector("input");
    // inp.max = 5;
    // inp.min = 0;
  },
  methods: {
    autoCompleteValidation: function() {
      this.$emit("limitChecker", {
        child: this.formModel["child"],
        adult: this.formModel["adult"]
      });
    }
  }
};
</script>

<style lang="sass">
.hotels-filter-wrapper
  padding: 16px
</style>
