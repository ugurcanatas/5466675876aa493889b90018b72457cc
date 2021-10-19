<template>
  <div class="flex flex-grow">
    <v-card elevation="2" rounded="2" color="grey lighten-4 " class="ma-8">
      <div class="headline">Rezervasyon</div>
      <v-divider />
      <v-form>
        <v-col class="no-gutters col-12">
          <div v-for="item of formData" :key="item.id">
            <v-autocomplete
              class="mx-1"
              v-if="item.type === 'autocomplete'"
              label="Rezervasyon yapmak istediğiniz oteli seçiniz."
              v-model="formModel[item['fieldName']]"
            />
            <v-row class="no-gutters" v-if="item.type === 'row'">
              <v-col
                v-for="subitem of item['fields']"
                :key="subitem.id"
                class="mx-1"
              >
                <v-text-field
                  v-if="subitem.subtype === 'textfield'"
                  type="number"
                  label="Yetişkin Sayısı giriniz"
                  v-model="formModel[subitem.subfieldName]"
                  @input="fieldInputEvent('adult_size')"
                />
                <v-dialog
                  width="290px"
                  transition="scale-transition"
                  :close-on-content-click="false"
                  v-model="subitem['show']"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-if="subitem.subtype === 'datepicker'"
                      label="Bitiş tarihini seçiniz"
                      v-model="formModel[subitem.subfieldName]"
                      v-on="on"
                      readonly
                      prepend-icon="mdi-calendar"
                    />
                  </template>
                  <v-date-picker
                    v-model="formModel[subitem.subfieldName]"
                  ></v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formModel: {},
      formData: [
        {
          id: "main1",
          input_type: "text",
          type: "autocomplete",
          fieldName: "hotel",
          fields: []
        },
        {
          id: "main2",
          type: "row",
          fieldName: null,
          fields: [
            {
              id: "sub1",
              input_type: "number",
              subtype: "textfield",
              subfieldName: "child_size"
            },
            {
              id: "sub2",
              input_type: "number",
              subtype: "textfield",
              subfieldName: "adult_size"
            }
          ]
        },
        {
          id: "main3",
          type: "row",
          fieldName: null,
          fields: [
            {
              id: "sub1",
              input_type: "datetime",
              subtype: "datepicker",
              subfieldName: "date_arrival",
              show: false
            },
            {
              id: "sub2",
              input_type: "number",
              subtype: "datepicker",
              subfieldName: "date_departure",
              show: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    fieldInputEvent: function(field) {
      console.log("Input ", field);

      if (Number(this.formModel[field] > 5)) {
        this.formModel[field] = 5;
      } else if (Number(this.formModel[field] < 0)) {
        this.formModel[field] = 0;
      }

      switch (field) {
        case "child_size":
          break;
        case "adult_size":
          break;
      }
    }
  }
};
</script>

<style lang="sass">
.custom-input
    border-radius: 8px
    border: 1px solid
</style>