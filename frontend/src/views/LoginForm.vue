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

      <router-link to="/reset-password" style="display: none"
        >Zaboravljena lozinka?</router-link
      >

      <div class="or-el"><span></span>or<span></span></div>

      <div class="register-msg">
        <span>Niste registrirani?</span>
        <span class="txt-msg-gold">
          ><router-link to="/register" class="txt-msg-gold" id="btnLoggin">
            Registrirajte se!</router-link
          ></span
        >
      </div>
    </form>
  </div>
</template>

<script>
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
        const redirectRoute = await this.$store.dispatch("login", {
          email: this.emailInput,
          password: this.passwordInput,
        });
        // Assuming the response contains an "id" property
        const userId = redirectRoute.id;
        // Save the user ID in the store
        await this.$store.commit("SET_USER_ID", userId);
        this.$router.push(redirectRoute);
      } catch (error) {
        alert("Greška prilikom prijave!", error);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
