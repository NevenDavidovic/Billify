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
  beforeRouteEnter(to, from, next) {
    document.body.style.background = "linear-gradient(90deg, #000000, #ff8a00)";
    next();
  },
  beforeRouteUpdate(to, from, next) {
    document.body.style.background = "linear-gradient(90deg, #000000, #ff8a00)";
    next();
  },
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
        alert("Registration successful! Please LogIn:", response.data);
        this.$router.push("/login");
        this.resetInputFields();
        // Optionally, redirect to a login page or perform other actions
      } catch (error) {
        console.error("Error during registration:", error);

        if (error.response) {
          if (error.response.status === 409) {
            alert(
              "Email is already in use. Please use a different email address."
            );
          } else {
            alert(
              "An error occurred during registration. Please try again later."
            );
          }
        } else {
          alert(
            "Failed to connect to the server. Please check your internet connection."
          );
        }
      }
    },
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(90deg, #000000, #ff8a00) !important;
}
</style>
