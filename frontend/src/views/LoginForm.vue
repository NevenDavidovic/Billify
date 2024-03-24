<template>
  <div class="container login-container">
    <form class="login-form" @submit.prevent="login" action="post">
      <h2>Prijavi se u svoj račun</h2>
      <p>Koristi svoje korisničke podatke za prijavu</p>
      <label for="e-mail">E-mail</label>
      <input type="text" placeholder="example@gmial.com" v-model="emailInput" />

      <label for="password">Lozinka</label>
      <input
        type="password"
        placeholder="Unesi lozinku"
        v-model="passwordInput"
      />

      <button class="">Prijavi se</button>

      <div class="or-el"><span></span>or<span></span></div>

      <div class="register-msg">
        <span>Niste registrirani?</span>
        <span class="txt-msg-gold">
          ><router-link to="/register" class="txt-msg-gold" id="btnLoggin"
            >Registrirajte se!</router-link
          ></span
        >
      </div>
    </form>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  data() {
    return {
      organizacijaData: null,
      emailInput: "",
      passwordInput: "",
    };
  },
  created() {},

  mounted() {},
  components: {},
  methods: {
    async login() {
      try {
        // Dispatch the login action with email and password
        const redirectRoute = await this.$store.dispatch("login", {
          email: this.emailInput,
          password: this.passwordInput,
        });
        this.$router.push(redirectRoute); // Redirect to the route returned by the login action
      } catch (error) {
        // Handle login error
        console.error("Error during login:", error);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
