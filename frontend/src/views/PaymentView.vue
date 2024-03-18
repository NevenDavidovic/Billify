<template>
  <div class="background-primary page-statistika">
    <div class="generiraj-barkod container">
      <div class="aside">
        <SideNav />
      </div>

      <div
        class="main-ps"
        style="display: flex; flex-direction: column; gap: 1em; width: 100%"
      >
        <br />
        <div v-for="user in users" :key="user.id">
          <PaymentSlip :userData="user" />
        </div>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
import PaymentSlip from "@/components/PaymentSlip.vue";
import SideNav from "@/components/SideNav.vue";
export default {
  components: {
    SideNav,
    PaymentSlip, // Register the HeaderNavbar component
  },
  data() {
    return {
      users: [],
      statisticsLoaded: false,
      showCityStats: true,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.users = this.$store.getters.getUsers;
      this.$store.commit("resetUsers");
    },
  },
};
</script>
<style scoped lang="less">
.main-ps {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  background: white;
}
</style>
