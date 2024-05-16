<template>
  <nav>
    <HeaderNavbar />
    <router-view />
  </nav>
</template>
<script>
import HeaderNavbar from "./components/HeaderNavbar.vue";

export default {
  components: {
    HeaderNavbar,
  },
  methods: {},
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
