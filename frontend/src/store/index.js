import { createStore } from "vuex";

export default createStore({
  state: {
    imeAplikacije: "Bilify",
    userData: null,
    users: [],
    loggedUserEmail: null,
    loggedUserId: null,
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    resetUsers(state) {
      state.users = [];
    },
    setUsers(state, users) {
      state.users = users;
    },
    resetUserData(state) {
      state.userData = null;
    },
  },
  actions: {
    saveUserData({ commit }, userData) {
      commit("setUserData", userData);
    },

    saveUsers({ commit }, users) {
      commit("resetUsers");
      commit("setUsers", users); // Set the users array to the provided array
    },

    resetUserData({ commit }) {
      commit("resetUserData");
    },
  },
  getters: {
    getUserData: (state) => state.userData,
    getUsers: (state) => state.users,
  },
});
