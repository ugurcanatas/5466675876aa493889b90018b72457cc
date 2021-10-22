<template>
  <div style="display:flex; flex-direction:column; padding: 16px 64px;">
    <full-preview />
    <div class="button-row">
      <v-btn class="white--text btn" @click="newReservation()" color="green"
        >Make a new reservation</v-btn
      >
      <v-btn class="white--text btn" @click="updateReservation()" color="blue"
        >Update my reservation</v-btn
      >
      <v-btn class="white--text btn" @click="deleteReservation()" color="red"
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
      actionSetAppState: "hotelModule/actionSetAppState",
      actionSetActionType: "hotelModule/actionSetActionType"
    }),
    newReservation: function() {
      this.actionSetActionType("NEW");
      this.resetToStart()
        .then(() => this.$router.replace("/"))
        .catch(() => console.log("Error when removing"));
    },
    updateReservation: function() {
      this.actionSetActionType("UPDATE")
        .then(() => this.$router.replace("/"))
        .catch(() => console.log("Error when updating"));
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
              this.actionSetAppState({
                type: "error",
                message: "An Error occured while cancelling."
              });
              throw Error(err);
            })
            .finally(() => {
              this.actionSetActionType("NEW");
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
    }
  }
};
</script>

<style lang="sass">
.button-row
  display: flex
  flex-direction: row
  justify-content: space-around
  @include breakpoint(mobile)
    flex: 100%
    flex-direction: column
    >.btn
      margin: 6px 0px
  @include breakpoint(small)
    flex: 100%
    flex-direction: column
    >.btn
      margin: 6px 0px
</style>