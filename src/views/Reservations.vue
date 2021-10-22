<template>
  <div>
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
export default {
  name: "Reservations",
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
  async created() {
    // const { id } = this.$route.params.reservation;
    // console.log("Reservation param id", this.$route.params.reservation, id);
    // this.reservationId = id;
    // try {
    //   fetch("", {
    //     method: "POST"
    //   });
    // } catch (error) {}
  },
  methods: {
    ...mapActions({
      resetToStart: "hotelModule/actionClear"
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
          this.newReservation();
        }
      } catch (error) {
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