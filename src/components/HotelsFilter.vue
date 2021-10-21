<template>
  <div class="hotels-filter-wrapper">
    {{ formModel }}
    <v-form v-model="validForm" ref="nestedRef">
      <v-row no-gutters>
        <v-select
          label="Adult size"
          v-model="formModel['adult_size']"
          :items="adultSizes"
          required
          :rules="[v => !!v || 'Adult size is required']"
        />
        <v-select
          label="Child size"
          v-model="formModel['child_size']"
          :items="childSizes"
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
              v-model="formModel['date_arrival']"
              v-on="on"
              readonly
              prepend-icon="mdi-calendar"
              :rules="[v => !!v || 'Arrival date is required']"
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
              :rules="[v => !!v || 'Departure date is required']"
            />
          </template>
          <v-date-picker v-model="formModel['date_departure']"></v-date-picker>
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
  watch: {
    formModel: {
      deep: true,
      handler: function(v) {
        console.log("Deep Watch Value", v);
      }
    }
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
