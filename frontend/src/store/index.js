import { createStore } from "vuex";
import api from "@/services/Api";

export default createStore({
  state: {
    imeAplikacije: "Bilify",
    userData: null,
    users: [],
    loggedInUser: null,
    isLoggedIn: false,
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
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userData = null;
      state.loggedInUser = null;
      state.isLoggedIn = false;
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
    async login({ commit }, { email, password }) {
      try {
        const response = await api.post("/login", {
          email: email,
          password: password,
        });
        commit("setLoggedInUser", response.data);
        // Optionally, you can commit mutations to set other user data if needed
        alert("You have successfully logged in");
        // Redirect to '/about' after successful login
        return "/about";
      } catch (error) {
        alert("Error during login: " + error.response.data.error);
        console.error("Error during login:", error.response.data);
        throw error; // Re-throw the error to handle it in the component
      }
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    getUserData: (state) => state.userData,
    getUsers: (state) => state.users,
    getLoggedInUser: (state) => state.loggedInUser,
    isLoggedIn: (state) => state.isLoggedIn,
    getUserEmail: (state) =>
      state.loggedInUser ? state.loggedInUser.email : null,
  },
});
