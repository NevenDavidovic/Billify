<template>
  <div class="header-class-navbar" id="header-nav">
    <nav>
      <router-link to="/barcode-generator">Barkod</router-link>
      <router-link to="/receiver">Primatelji</router-link>
      <router-link to="/statistics">Statistika</router-link>
      <router-link to="/organization">Organizacije</router-link>
      <router-link to="/about">O nama</router-link>

      <div class="animation start-home"></div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderNavbar",
  props: {
    msg: String,
  },
  methods: {},
  mounted() {
    // this.changeStyle();
  },
};
</script>

<style scoped lang="less">
.header-class-navbar {
  padding: 50px 0;

  nav {
    margin: 27px auto 0;

    position: relative;
    width: 590px;
    height: 50px;
    background-color: #354344;
    border-radius: 8px;
    font-size: 0;
  }
  nav a {
    line-height: 50px;
    height: 100%;
    font-size: 15px;
    display: inline-block;
    position: relative;
    z-index: 1;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    color: white;
    cursor: pointer;
  }
  nav .animation {
    position: absolute;
    height: 100%;
    top: 0;
    z-index: 0;
    transition: all 0.5s ease 0s;
    border-radius: 8px;
  }
  a:nth-child(1) {
    width: 100px;
  }
  a:nth-child(2) {
    width: 110px;
  }
  a:nth-child(3) {
    width: 100px;
  }
  a:nth-child(4) {
    width: 160px;
  }
  a:nth-child(5) {
    width: 120px;
  }
  nav .start-home,
  a:nth-child(1):hover ~ .animation {
    width: 100px;
    left: 0;
    background-color: #1abc9c;
  }
  nav .start-about,
  a:nth-child(2):hover ~ .animation {
    width: 110px;
    left: 100px;
    background-color: #e74c3c;
  }
  nav .start-blog,
  a:nth-child(3):hover ~ .animation {
    width: 100px;
    left: 210px;
    background-color: #3498db;
  }
  nav .start-portefolio,
  a:nth-child(4):hover ~ .animation {
    width: 160px;
    left: 310px;
    background-color: #9b59b6;
  }
  nav .start-contact,
  a:nth-child(5):hover ~ .animation {
    width: 120px;
    left: 470px;
    background-color: #e67e22;
  }

  p {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: #ecf0f1;
    font-family: "Cherry Swash", cursive;
    font-size: 16px;
  }

  span {
    color: #2bd6b4;
  }
}
</style>
