import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const hotelModule = {
  state: () => ({
    hotels: [],
  }),
  getters: {
    getHotels: (state) => {
      return state.hotels;
    },
  },
  mutations: {
    pushHotels: (state, payload) => {
      state.hotels = payload;
    },
  },
  actions: {
    actionPushHotels: ({ commit }, payload) => {
      commit("pushHotels", payload);
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
