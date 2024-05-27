<template>
  <div>
    <div class="generiraj-barkod container">
      <div class="aside">
        <SideNav />
      </div>
      <div class="main-content-barcode">
        <SinglePaymentSlip />
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";
import SinglePaymentSlip from "@/components/SinglePaymentSlip.vue";

export default {
  data() {
    return {};
  },
  components: {
    SideNav,
    SinglePaymentSlip,
  },

  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
input {
  padding-left: 5px;
}
.generiraj-barkod {
  display: flex;
  height: 100vh;

  .about {
    background-color: white;
    width: 100%;
    .about-body {
      padding: 2em;
      background-image: linear-gradient(to bottom, #db9f58 50%, white 50%);
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .promoted-organization {
      display: flex;
      border: 4px solid #f3f5f9;
      border-radius: 8px;
      max-height: 400px;
    }
    .right-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      align-items: center;
      justify-content: center;
      background-color: #f3f5f9;
    }
    .left-item {
      display: flex;
      align-items: center;
      flex: 1;
      width: 100%;
      justify-content: center;
      background-color: white;
    }
  }
}
.header-class-navbar {
  background-color: #db9f58;
  .header-navbar-section {
    background-color: #db9f58;
  }
}

.btn-preuzmi {
  margin-left: 20px;
}

.main-content-barcode {
  width: 100%;
  background: white;
}
</style>
