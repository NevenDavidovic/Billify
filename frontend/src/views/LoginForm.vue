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
import axios from "axios";

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
        const response = await axios.post("http://localhost:8081/login", {
          email: this.emailInput,
          password: this.passwordInput,
        });

        console.log("User logged in successfully. Email:", response.data.email);
        this.$store.commit("setUserEmail", response.data.email);
        console.log("User ID:", response.data.id);
        console.log("state-login", this.$store.state.userEmail);
      } catch (error) {
        alert("Error during login: " + error.response.data.error);
        console.error("Error during login:", error.response.data);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
