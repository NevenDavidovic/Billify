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
        <button
          class="button-57"
          role="button"
          v-if="users.length"
          @click="windowPrint"
        >
          <span class="text">
            <svg
              width="60px"
              height="60px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM9.25 7C9.25 6.58579 8.91421 6.25 8.5 6.25C8.08579 6.25 7.75 6.58579 7.75 7V11.9285L6.57617 10.5199C6.31099 10.2017 5.83807 10.1587 5.51986 10.4238C5.20165 10.689 5.15866 11.1619 5.42383 11.4801L7.92383 14.4801C8.06633 14.6511 8.27742 14.75 8.5 14.75C8.72259 14.75 8.93367 14.6511 9.07617 14.4801L11.5762 11.4801C11.8413 11.1619 11.7983 10.689 11.4801 10.4238C11.1619 10.1587 10.689 10.2017 10.4238 10.5199L9.25 11.9285V7ZM15.5 6.25C15.9142 6.25 16.25 6.58579 16.25 7V11.9285L17.4238 10.5199C17.689 10.2017 18.1619 10.1587 18.4801 10.4238C18.7983 10.689 18.8413 11.1619 18.5762 11.4801L16.0762 14.4801C15.9337 14.6511 15.7226 14.75 15.5 14.75C15.2774 14.75 15.0663 14.6511 14.9238 14.4801L12.4238 11.4801C12.1587 11.1619 12.2017 10.689 12.5199 10.4238C12.8381 10.1587 13.311 10.2017 13.5762 10.5199L14.75 11.9285V7C14.75 6.58579 15.0858 6.25 15.5 6.25ZM6 16.25C5.58579 16.25 5.25 16.5858 5.25 17C5.25 17.4142 5.58579 17.75 6 17.75H18C18.4142 17.75 18.75 17.4142 18.75 17C18.75 16.5858 18.4142 16.25 18 16.25H6Z"
                fill="#db9f58"
              /></svg></span
          ><span class="preuzmi-btn">Preuzmi sve</span>
        </button>

        <div class="notification-payment" v-if="!users.length">
          <h2>Trenutno niste odabrali ni jednu uplatnicu.</h2>
          <router-link to="/receiver">Generiraj Barkod</router-link>
        </div>

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
    windowPrint() {
      window.print();
    },

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

  height: fit-content;
}

.window-print-all {
  max-width: 300px;
  width: 90%;
  margin: 10px auto;
  background: linear-gradient(45deg, black, #ff8900);
  color: white;
  font-size: 24px;
  padding: 20px 0;
  border: 0 solid white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}

.notification-payment {
  margin: auto;
  max-width: 60%;
}

.button-57 {
  max-width: 300px;
  width: 100%;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
  border: 3px solid #db9f58;
  color: #18181a;
  display: inline-block;
  font-size: 15px;
  line-height: 15px;
  padding: 10px 10px 75px;
  text-decoration: none;
  cursor: pointer;
  background: #fff;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border-radius: 20px;
}

.button-57 span:first-child {
  position: relative;
  transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 10;
}

.button-57 span:last-child {
  color: white;
  display: block;
  position: absolute;
  bottom: 0;
  transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 100;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(225%) translateX(-50%);
  height: 14px;
  line-height: 13px;
}

.button-57:after {
  content: "";
  position: absolute;
  bottom: -50%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, black, #ff8900);
  transform-origin: bottom center;
  transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
  transform: skewY(9.3deg) scaleY(0);
  z-index: 50;
}

.button-57:hover:after {
  transform-origin: bottom center;
  transform: skewY(9.3deg) scaleY(2);
}

.button-57:hover span:last-child {
  transform: translateX(-50%) translateY(-100%);
  opacity: 1;
  transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
  font-size: 24px;
  padding-top: 8px;
}
</style>
