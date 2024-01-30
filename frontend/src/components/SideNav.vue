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

<style scoped lang="less">
.side-navbar {
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 3em;
  padding: 50px 15px 50px 0;
  .side-item {
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 5px 16px 7px;
    img {
      width: 25px;
    }
    &:hover {
      background-color: white;
      color: #3d4c4d;
      border-radius: 4px;
    }
    a {
      text-decoration: none;
      color: #3d4c4d;
    }
  }
  .upper-part,
  .lower-part {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    text-align: left;
    button {
      font-size: 16px;
      font-weight: 600;
      color: #3d4c4d;
      margin-top: 15px;
      padding: 6px 25px 6px;
    }
  }
}
</style>
