<template>
  <div>
    <v-col>
      <full-preview />
    </v-col>
    <div class="default-row">
      <v-btn @click="newReservation()" color="green"
        >Make a new reservation</v-btn
      >
      <v-btn @click="updateReservation()" color="blue"
        >Update my reservation</v-btn
      >
      <v-btn @click="deleteReservation()" color="red"
        >Cancel my reservation</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FullPreview from "../components/FullPreview.vue";
export default {
  name: "Reservations",
  components: {
    FullPreview
  },
  data() {
    return {
      reservationId: -1
    };
  },
  computed: {
    ...mapGetters({
      getReservation: "hotelModule/getReservation"
    })
  },
  methods: {
    ...mapActions({
      resetToStart: "hotelModule/actionClear",
      actionSetAppState: "hotelModule/actionSetAppState"
    }),
    newReservation: function() {
      this.resetToStart()
        .then(() => this.$router.replace("/"))
        .catch(() => console.log("Error when removing"));
    },
    updateReservation: function() {
      //implement update
      this.$router.push("/");
    },
    deleteReservation: async function() {
      const { id } = this.getReservation;
      console.log("Get Reservation", id, this.getReservation);

      try {
        const deleteResponse = await fetch(
          `${process.env.VUE_APP_ENDPOINT_RESERVATION_SINGLE}${id}`,
          {
            method: "DELETE"
          }
        );
        const deleteResult = await deleteResponse.json();
        console.log("DELETE RESULT", deleteResult);
        if (deleteResult) {
          this.resetToStart()
            .then(() => {
              this.actionSetAppState({
                type: "success",
                message: "Your reservation has been cancelled"
              });
            })
            .catch(err => {
              throw Error(err);
            })
            .finally(() => {
              this.$router.replace("/");
            });
        }
      } catch (error) {
        this.actionSetAppState({
          type: "error",
          message: "An error occured"
        });
        throw Error(error);
      }

      //implement delete
      //fetch DELETE with id here. then reset & replace the route.
    }
  }
};
</script>

<style lang="sass">
</style>