import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const hotelModule = {
  state: () => ({
    hotels: [],
    hotelsWithDetails: [],
    mergedHotels: [],
    filteredHotels: [],
    isFiltered: false,
    selectedHotel: {},
    fullPreview: {},
    reservation: {},
    appStates: {
      type: "",
      message: "",
    },
    actionType: "NEW",
  }),
  getters: {
    getHotels: (state) => {
      return state.hotels;
    },
    getHotelsWithDetails: (state) => {
      return state.hotelsWithDetails;
    },
    getMergedHotels: (state) => {
      return state.mergedHotels;
    },
    getFilteredHotels: (state) => {
      return state.filteredHotels;
    },
    getFilterState: (state) => {
      return state.isFiltered;
    },
    getFormData: () => {
      const parsedStorage = JSON.parse(localStorage.getItem("formData"));
      console.log("Parsed Storage", parsedStorage);
      return parsedStorage !== null ? parsedStorage : null;
    },
    getSelectedHotel: (state) => {
      return state.selectedHotel;
    },
    getFullPreview: (state) => {
      return state.fullPreview;
    },
    getReservation: (state) => {
      return state.reservation;
    },
    getAppStates: (state) => {
      return state.appStates;
    },
    getActionType: (state) => {
      return state.actionType;
    },
  },
  mutations: {
    pushHotels: (state, payload) => {
      state.hotels = payload;
    },
    pushHotelsWithDetails: (state, payload) => {
      state.hotelsWithDetails = payload;
    },
    pushMerged: (state, payload) => {
      state.mergedHotels = payload;
    },
    pushFiltered: (state, payload) => {
      state.filteredHotels = payload;
    },
    setIsFiltered: (state, payload) => {
      state.isFiltered = payload;
    },
    pushFormData: (state, payload) => {
      const { data, type } = payload;

      const formData = localStorage.getItem("formData");
      if (!formData) {
        console.log("No Form Data Currently", formData);
        localStorage.setItem(
          "formData",
          JSON.stringify({
            [type]: {
              data,
            },
          })
        );
      } else {
        let parsedData = JSON.parse(formData);
        console.log("There is a form data, lets parse it", parsedData);
        parsedData = {
          ...parsedData,
          [type]: {
            data,
          },
        };
        localStorage.setItem("formData", JSON.stringify(parsedData));
      }
    },
    setSelectedHotel: (state, payload) => {
      state.selectedHotel = payload;
    },
    setFullPreview: (state, payload) => {
      state.fullPreview = payload;
    },
    setReservation: (state, payload) => {
      state.reservation = payload;
    },
    reset: (state) => {
      localStorage.removeItem("formData");
      state.reservation = {};
      state.fullPreview = {};
    },
    setAppState: (state, payload) => {
      state.appStates = payload;
    },
    setActionType: (state, payload) => {
      state.actionType = payload;
    },
  },
  actions: {
    actionPushHotels: ({ commit }, payload) => {
      commit("pushHotels", payload);
    },
    actionPushHotelsWithDetails: ({ commit }, payload) => {
      commit("pushHotelsWithDetails", payload);
    },
    actionMerge: ({ commit }, payload) => {
      const [hotels, withDetails] = payload;
      const merged = withDetails.map((detail, i) => {
        return {
          ...detail,
          hotel_name: hotels[i].hotel_name,
          rating: (Math.random() * 5).toFixed(1),
          isDisabled: false,
        };
      });

      commit("pushMerged", merged);
      commit("pushHotels", hotels); //These are for fallback
      commit("pushHotelsWithDetails", withDetails); //These are for fallback
    },
    actionPushFiltered: ({ commit }, payload) => {
      commit("pushFiltered", payload);
      commit("setIsFiltered", true);
    },
    actionClearFiltered: ({ commit }) => {
      commit("setIsFiltered", false);
    },
    actionPushFormData: ({ commit }, payload) => {
      commit("pushFormData", payload);
    },
    actionHotelSelected: ({ commit }, payload) => {
      commit("setSelectedHotel", payload);
    },
    actionSetFullPreview: ({ commit }, payload) => {
      commit("setFullPreview", payload);
    },
    actionSetReservation: ({ commit }, payload) => {
      commit("setReservation", payload);
    },
    actionClear: ({ commit }) => {
      commit("reset");
    },
    actionSetAppState: ({ commit }, payload) => {
      commit("setAppState", payload);
    },
    actionSetActionType: ({ commit }, payload) => {
      commit("setActionType", payload);
    },
  },
  //setting namespace to true so we don't get "unknown action type error" from Vue
  namespaced: true,
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    hotelModule,
  },
});
