<template>
  <div class="hotels-filter-wrapper">
    <v-form v-model="validForm">
      <v-row no-gutters>
        <v-select
          label="Adult size"
          v-model="formModel['adult_size']"
          :items="adultSizes"
          @input="autoCompleteValidation"
        />
        <v-select
          label="Child size"
          v-model="formModel['child_size']"
          :items="childSizes"
          @input="autoCompleteValidation"
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
              v-model="formModel['date_arrival']"
              v-on="on"
              readonly
              prepend-icon="mdi-calendar"
            />
          </template>
          <v-date-picker v-model="formModel['date_arrival']"></v-date-picker>
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
              v-model="formModel['date_departure']"
              v-on="on"
              readonly
              prepend-icon="mdi-calendar"
            />
          </template>
          <v-date-picker v-model="formModel['date_departure']"></v-date-picker>
        </v-dialog>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childSizes: [0, 1, 2, 3, 4, 5],
      adultSizes: [1, 2, 3, 4, 5],
      validForm: true,
      formModel: {
        adult_size: 1,
        child_size: 0
      },
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
        child_size: this.formModel["child_size"],
        adult_size: this.formModel["adult_size"]
      });
    }
  }
};
</script>

<style lang="sass">
.hotels-filter-wrapper
    padding: 16px
</style>
