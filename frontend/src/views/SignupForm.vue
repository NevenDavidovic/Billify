<template>
  <div class="container login-container">
    <form class="login-form" @submit.prevent="register" action="post">
      <h2>Registrirajte se</h2>
      <p>Unesi svoj mail ii izaberi lozinku</p>
      <label for="e-mail">E-mail</label>
      <input type="text" placeholder="example@gmial.com" v-model="emailInput" />

      <label for="password" placeholder="Unesi lozinku">Lozinka</label>
      <input type="password" v-model="passwordInput" />
      <!-- <label for="password">Ponovno unesi lozinku</label>
      <input
        type="password"
        placeholder="Unesi lozinku"
        v-model="passwordInput"
      /> -->

      <button type="submit">Registriraj se</button>

      <div class="or-el"><span></span>or<span></span></div>

      <div class="register-msg">
        <span>Imate račun?</span>
        <span class="txt-msg-gold"
          ><router-link to="/login" class="login-btn" id="btnLoggin"
            >Prijavite se!</router-link
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
    resetInputFields() {
      this.emailInput = "";
      this.passwordInput = "";
    },

    async register() {
      try {
        const response = await axios.post("http://localhost:8081/register", {
          email: this.emailInput,
          password: this.passwordInput,
        });

        console.log("Registration successful:", response.data);
        alert("Registration successful:", response.data);
        this.resetInputFields();
        // Optionally, redirect to a login page or perform other actions
      } catch (error) {
        // Log the entire error object
        console.error("Full error object:", error);

        // Log specific properties if available
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }

        alert(
          "An error occurred during registration. Please check the console for details."
        );
      }
    },
  },
};
</script>

<style scoped></style>
