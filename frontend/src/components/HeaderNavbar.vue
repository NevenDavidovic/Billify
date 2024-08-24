<template>
  <div class="header-class-navbar" id="header-nav">
    <nav class="header-navbar-section">
      <div class="left-side-logo" @click="redirectHome">
        <svg
          width="66"
          height="66"
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="66" height="66" rx="33" fill="#354344" />
          <path d="M43 47V49M40.5 47V49" stroke="#A87241" />
          <path d="M45.5 47V49M48 47V49M50.5 47V49" stroke="#A87241" />
          <g clip-path="url(#clip0_219_1345)">
            <rect
              x="13"
              y="13"
              width="40"
              height="40"
              rx="20"
              fill="#E8B267"
              stroke="white"
            />
            <path
              d="M38 15.5L38.3368 16.5365H39.4266L38.5449 17.1771L38.8817 18.2135L38 17.5729L37.1183 18.2135L37.4551 17.1771L36.5734 16.5365H37.6632L38 15.5Z"
              fill="#624835"
            />
            <path
              d="M19 21.5L19.3368 22.5365H20.4266L19.5449 23.1771L19.8817 24.2135L19 23.5729L18.1183 24.2135L18.4551 23.1771L17.5734 22.5365H18.6632L19 21.5Z"
              fill="#624835"
            />
            <path
              d="M23 17.5L23.3368 18.5365H24.4266L23.5449 19.1771L23.8817 20.2135L23 19.5729L22.1183 20.2135L22.4551 19.1771L21.5734 18.5365H22.6632L23 17.5Z"
              fill="#624835"
            />
            <path
              d="M30 14.5L30.3368 15.5365H31.4266L30.5449 16.1771L30.8817 17.2135L30 16.5729L29.1183 17.2135L29.4551 16.1771L28.5734 15.5365H29.6632L30 14.5Z"
              fill="#624835"
            />
            <path
              d="M47 21.5L47.3368 22.5365H48.4266L47.5449 23.1771L47.8817 24.2135L47 23.5729L46.1183 24.2135L46.4551 23.1771L45.5734 22.5365H46.6632L47 21.5Z"
              fill="#624835"
            />
            <path
              d="M50 30.5L50.3368 31.5365H51.4266L50.5449 32.1771L50.8817 33.2135L50 32.5729L49.1183 33.2135L49.4551 32.1771L48.5734 31.5365H49.6632L50 30.5Z"
              fill="#624835"
            />
          </g>
          <path
            d="M23.2027 10.5V4.25646H25.9304C26.5857 4.25646 27.0935 4.40111 27.4536 4.69041C27.8137 4.9738 27.9938 5.36937 27.9938 5.87712C27.9938 6.21365 27.9082 6.50295 27.737 6.74502C27.5658 6.98708 27.3296 7.16421 27.0285 7.27638C27.3827 7.37675 27.6573 7.55387 27.8521 7.80775C28.0529 8.05572 28.1532 8.37159 28.1532 8.75535C28.1532 9.31033 27.9643 9.74133 27.5864 10.0483C27.2145 10.3494 26.6949 10.5 26.0278 10.5H23.2027ZM24.292 6.90443H25.7355C26.5089 6.90443 26.8957 6.60627 26.8957 6.00996C26.8957 5.41365 26.5089 5.1155 25.7355 5.1155H24.292V6.90443ZM24.292 9.64096H25.8861C26.6654 9.64096 27.0551 9.32804 27.0551 8.70221C27.0551 8.07638 26.6654 7.76347 25.8861 7.76347H24.292V9.64096ZM29.1615 5.23948V4.15904H30.4014V5.23948H29.1615ZM29.2324 10.5V6.16937H30.3394V10.5H29.2324ZM33.0339 10.5886C32.5202 10.5886 32.1394 10.4498 31.8915 10.1723C31.6494 9.88893 31.5284 9.47565 31.5284 8.93247V4.25646H32.6354V8.87934C32.6354 9.4107 32.8597 9.67638 33.3084 9.67638C33.3734 9.67638 33.4383 9.67343 33.5033 9.66753C33.5682 9.66162 33.6302 9.64982 33.6893 9.6321L33.6715 10.5089C33.459 10.562 33.2464 10.5886 33.0339 10.5886ZM34.3243 5.23948V4.15904H35.5642V5.23948H34.3243ZM34.3952 10.5V6.16937H35.5022V10.5H34.3952ZM36.9834 10.5V7.00184H36.151V6.16937H36.9834V6.16052C36.9834 5.54649 37.1429 5.08303 37.4617 4.77011C37.7864 4.4572 38.2882 4.28007 38.9672 4.23875L39.4012 4.21218L39.472 5.02694L39.0646 5.05351C38.7104 5.07712 38.4595 5.16568 38.3119 5.31919C38.1643 5.46679 38.0905 5.68819 38.0905 5.98339V6.16937H39.2683V7.00184H38.0905V10.5H36.9834ZM40.259 12.0941L41.0561 10.3229L39.2583 6.16937H40.4361L41.6494 9.19815L42.8893 6.16937H44.0051L41.4015 12.0941H40.259Z"
            fill="#D99C52"
          />
          <path
            d="M47 7.5L47.3368 8.53647H48.4266L47.5449 9.17705L47.8817 10.2135L47 9.57295L46.1183 10.2135L46.4551 9.17705L45.5734 8.53647H46.6632L47 7.5Z"
            fill="white"
          />
          <path
            d="M20 7.5L20.3368 8.53647H21.4266L20.5449 9.17705L20.8817 10.2135L20 9.57295L19.1183 10.2135L19.4551 9.17705L18.5734 8.53647H19.6632L20 7.5Z"
            fill="white"
          />
          <path
            d="M26 47L24.75 49M27.5 47L25.5 51.5M29 47L27.5 52.5M30.5 47L29.5 52.5M32 47V53M33.5 47L35 53M35.5 47L37.5 52M37.5 47L38.75 49M16 47L15.5 49H24.75M24.75 49L23.5 51C30.4996 53.8775 34.0631 53.6225 40 51L38.75 49M38.75 49H50H51L50.5 47"
            stroke="#A87241"
          />
          <path
            d="M40.5 50.5H41.5M41.5 50.5L40 51L39.5 49.5L41.5 50.5Z"
            stroke="#A87241"
          />
          <path
            d="M18 26.5V46.5M20 28V46.5M22.5 24V46.5M25 22V47M27.5 20.5V47M29 20.5V47M30.5 20V47M32.5 19V47M34 18.5V47M35.5 18.5V47M37.5 19.5V47H38.5V19.5H37.5Z"
            stroke="black"
          />
          <path
            d="M40.5 20.5V46.5H41V22.5M43 25V46.5M45 27V47H45.5V27M47 33V47H47.5V33M49 37V47"
            stroke="black"
          />
          <path d="M16 47H50.5" stroke="#A87241" />
          <path
            d="M19 57.5L19.3368 58.5365H20.4266L19.5449 59.1771L19.8817 60.2135L19 59.5729L18.1183 60.2135L18.4551 59.1771L17.5734 58.5365H18.6632L19 57.5Z"
            fill="#624835"
          />
          <path
            d="M15 53.5L15.3368 54.5365H16.4266L15.5449 55.1771L15.8817 56.2135L15 55.5729L14.1183 56.2135L14.4551 55.1771L13.5734 54.5365H14.6632L15 53.5Z"
            fill="#624835"
          />
          <path
            d="M25 59.5L25.3368 60.5365H26.4266L25.5449 61.1771L25.8817 62.2135L25 61.5729L24.1183 62.2135L24.4551 61.1771L23.5734 60.5365H24.6632L25 59.5Z"
            fill="#624835"
          />
          <path
            d="M31 60.5L31.3368 61.5365H32.4266L31.5449 62.1771L31.8817 63.2135L31 62.5729L30.1183 63.2135L30.4551 62.1771L29.5734 61.5365H30.6632L31 60.5Z"
            fill="#624835"
          />
          <path
            d="M36 59.5L36.3368 60.5365H37.4266L36.5449 61.1771L36.8817 62.2135L36 61.5729L35.1183 62.2135L35.4551 61.1771L34.5734 60.5365H35.6632L36 59.5Z"
            fill="#624835"
          />
          <path
            d="M41 58.5L41.3368 59.5365H42.4266L41.5449 60.1771L41.8817 61.2135L41 60.5729L40.1183 61.2135L40.4551 60.1771L39.5734 59.5365H40.6632L41 58.5Z"
            fill="#624835"
          />
          <path
            d="M46 56.5L46.3368 57.5365H47.4266L46.5449 58.1771L46.8817 59.2135L46 58.5729L45.1183 59.2135L45.4551 58.1771L44.5734 57.5365H45.6632L46 56.5Z"
            fill="#624835"
          />
          <path
            d="M50 54.5L50.3368 55.5365H51.4266L50.5449 56.1771L50.8817 57.2135L50 56.5729L49.1183 57.2135L49.4551 56.1771L48.5734 55.5365H49.6632L50 54.5Z"
            fill="#624835"
          />
          <path
            d="M54 51.5L54.3368 52.5365H55.4266L54.5449 53.1771L54.8817 54.2135L54 53.5729L53.1183 54.2135L53.4551 53.1771L52.5734 52.5365H53.6632L54 51.5Z"
            fill="#624835"
          />
          <path
            d="M23 47V49M21 47V49M19 47V49M17 47V48.5M16 47V49"
            stroke="#A87241"
          />
          <path d="M23.5 51L21.5 50.5L23.5 49.5V50.5" stroke="#A87241" />
          <defs>
            <clipPath id="clip0_219_1345">
              <rect
                width="41"
                height="34"
                fill="white"
                transform="translate(12.5 12.5)"
              />
            </clipPath>
          </defs>
        </svg>

        <p id="imeApp-a">{{ $store.state.imeAplikacije }}</p>
      </div>

      <div class="right-side-btn">
        {{ userEmail }}

        <router-link
          to="/login"
          class="login-btn"
          id="btnLoggin"
          v-if="!isLoggedIn"
          >Prijavi se</router-link
        >
        <router-link
          class="signup-btn"
          to="/register"
          id="btnSignUp"
          v-if="!isLoggedIn"
          >Registriraj se</router-link
        >
        <router-link
          class="signup-btn"
          to="/settings"
          id="btnSignUp"
          v-if="isLoggedIn"
          >Postavke</router-link
        >
        <router-link
          class="signup-btn"
          to="/"
          id="btnLogOut"
          v-if="isLoggedIn"
          @click="logout"
          >Odjavi se</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
import api from "@/services/Api";

export default {
  name: "HeaderNavbar",
  props: {
    msg: String,
  },
  computed: {
    userEmail() {
      return this.$store.getters.getUserEmail;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    redirectHome() {
      this.$router.push("/");
    },
    logout() {
      // Dispatch the logout action from Vuex store
      this.$store
        .dispatch("logout")
        .then(() => {
          // If logout action succeeds, make a request to the server to reset the variable
          api
            .post("/logout")
            .then((response) => {
              // Optionally, handle response from the server
              console.log(response.data);
            })
            .catch((error) => {
              // Handle error from server request
              console.error("Error during logout:", error);
            });

          // Optionally, redirect the user after logout
        })
        .catch((error) => {
          // Handle error from Vuex logout action
          console.error("Error during logout:", error);
        });
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.header-class-navbar {
  background: linear-gradient(90deg, rgb(0, 0, 0), rgb(255, 138, 0));
  padding: 5px 0;

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
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 30px;
    }

    .left-side-logo {
      display: flex;
      gap: 1em;
      align-items: center;
      cursor: pointer;
    }
    .right-side-btn {
      display: flex;
      gap: 1em;
      align-items: center;

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
        color: white;
        border: 1px solid white;
      }
    }
  }
}
</style>
