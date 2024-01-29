<template>
  <nav>
    <HeaderNavbar />
    <router-view />
  </nav>
</template>
<script>
import HeaderNavbar from "./components/HeaderNavbar.vue";

// Adjust the path if necessary

export default {
  components: {
    HeaderNavbar, // Register the HeaderNavbar component
  },
  methods: {},
  // Other logic for App.vue
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
