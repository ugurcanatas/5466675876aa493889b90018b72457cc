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
