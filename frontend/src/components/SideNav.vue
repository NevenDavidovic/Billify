<template>
  <div class="side-navbar background-primary">
    <div class="upper-part">
      <div class="side-item">
        <img
          :src="require('@/assets/images/generiraj-barkod.png')"
          alt="generiraj"
        />
        <router-link to="/barcode-generator">Generiraj Barkod</router-link>
      </div>
      <div class="side-item">
        <img
          :src="require('@/assets/images/organizacije.png')"
          alt="organizacije"
        />
        <router-link to="/organization">Organizacije</router-link>
      </div>
      <div class="side-item">
        <img
          :src="require('@/assets/images/primatelji-uplatnica.png')"
          alt="generiraj"
        />
        <router-link to="/receiver">Primatelji uplatnice</router-link>
      </div>
      <div class="side-item">
        <img
          :src="require('@/assets/images/statistika.png')"
          alt="statistika"
        />
        <router-link to="/statistics">Statistika</router-link>
      </div>
    </div>
    <div class="lower-part">
      <div class="side-item">
        <img
          :src="require('@/assets/images/slanje-uplatnice.png')"
          alt="slanje"
        />
        <span>Slanje Uplatnica</span>
      </div>
      <div class="side-item">
        <img
          :src="require('@/assets/images/pregled-uplatnica.png')"
          alt="pregled"
        />
        <span>Pregled Uplatnica</span>
      </div>
      <button class="btn-white">+ Nova Uplatnica</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="less"></style>
