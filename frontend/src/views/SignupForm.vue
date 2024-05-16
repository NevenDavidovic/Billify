<template>
  <div class="container login-container">
    <form class="login-form" @submit.prevent="register" action="post">
      <h2>Registrirajte se</h2>
      <p>Unesi svoj mail ii izaberi lozinku</p>
      <label for="e-mail">E-mail</label>
      <input type="text" placeholder="example@gmial.com" v-model="emailInput" />

      <label for="password" placeholder="Unesi lozinku">Lozinka</label>
      <input type="password" v-model="passwordInput" />

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

        alert("Registracija uspješna", response.data);
        this.$router.push("/login");
        this.resetInputFields();
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            alert("Emal se već koristi. Molimo koristite drugi mail.");
          } else {
            alert(
              "Greška se dogodila prilikom registracije. Molimo pokušajte kasnije"
            );
          }
        } else {
          alert(
            "Greška prilikom spajanja na poslužitelj. Provjerite internetsku vezu."
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
