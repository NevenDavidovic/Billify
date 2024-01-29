<template>
  <div class="header-class-navbar" id="header-nav">
    <nav class="header-navbar-section">
      <div class="left-side-logo">
        <img :src="require('@/assets/logo.png')" alt="Logo" />
        <p id="imeApp-a">{{ $store.state.imeAplikacije }}</p>
      </div>

      <div class="right-side-btn">
        <router-link to="/login" class="login-btn" id="btnLoggin"
          >Log In</router-link
        >
        <router-link class="signup-btn" to="/register" id="btnSignUp"
          >Sign Up</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderNavbar",
  props: {
    msg: String,
  },
  methods: {
    // changeStyle() {
    //   const btnLoggin = document.getElementById("btnLogin");
    //   const btnSignUp = document.getElementById("btnSignUp");
    //   const btnHeader = document.getElementById("btnHeader");
    //   const btnImeAppa = document.getElementById("imeApp-a");
    //   if (this.$route.path === "http://localhost:8080//organization") {
    //     btnHeader.style.background = "#db9f58";
    //     btnSignUp.style.display = "none";
    //     btnImeAppa.style.color = "white";
    //     btnLoggin.style.display = "none";
    //     console.log("the path");
    //     console.log(this.$route.path);
    //   }
    // },
  },
  mounted() {
    // this.changeStyle();
  },
};
</script>

<style scoped lang="less">
.header-class-navbar {
  background-color: white;

  nav {
    padding: 0;
  }
  .header-navbar-section {
    max-width: 1440px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #db9f58;
    padding: 10px 16px;

    .left-side-logo {
      display: flex;
      gap: 1em;
      align-items: center;
    }
    .right-side-btn {
      display: flex;
      gap: 1em;
      .signup-btn,
      .login-btn {
        border-radius: 4px;
        padding: 6px 9px;
        text-decoration: none;
      }
      .login-btn {
        color: white;
        background-color: #db9f58;
      }

      .signup-btn {
        color: #db9f58;
        border: 1px solid #db9f58;
      }
    }
  }
}
</style>
