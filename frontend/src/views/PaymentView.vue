<template>
  <div class="generiraj-barkod container">
    <div class="aside">
      <SideNav />
    </div>

    <div class="payment-slips-container">
      <h1 class="title-payment-view" v-if="primateljiData.length">
        Generirane su sve uplatnice
      </h1>
      <div class="btn-container">
        <button
          class="button-57"
          role="button"
          @click="windowPrint"
          v-if="primateljiData.length"
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

        <button
          @click="sendAllEmails"
          class="btn-gold send-all-btn"
          v-if="primateljiData.length"
        >
          Pošalji sve Uplatnice
        </button>
        <p class="note-no-results" v-if="!primateljiData.length">
          Nema podataka za obradu
          <svg
            width="250"
            fill="#000000"
            viewBox="0 0 14 14"
            role="img"
            focusable="false"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="red"
                d="M13 10.65657q0 .40404-.28283.68686l-1.37374 1.37374Q11.06061 13 10.65657 13t-.68687-.28283L7 9.74747l-2.9697 2.9697Q3.74747 13 3.34343 13q-.40404 0-.68686-.28283l-1.37374-1.37374Q1 11.06061 1 10.65657t.28283-.68687L4.25253 7l-2.9697-2.9697Q1 3.74747 1 3.34343q0-.40404.28283-.68686l1.37374-1.37374Q2.93939 1 3.34343 1t.68687.28283L7 4.25253l2.9697-2.9697Q10.25253 1 10.65657 1q.40404 0 .68686.28283l1.37374 1.37374Q13 2.93939 13 3.34343t-.28283.68687L9.74747 7l2.9697 2.9697Q13 10.25253 13 10.65657z"
              ></path>
            </g>
          </svg>
        </p>
      </div>

      <div
        v-if="primateljiData.length"
        class="payements"
        ref="paymentSlipsContainer"
      >
        <div v-for="user in primateljiData" :key="user.id">
          <PaymentSlip
            ref="paymentSlips"
            :userData="user"
            @barcode-generated="collectBarcodeData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/Api";
import SideNav from "@/components/SideNav.vue";
import PaymentSlip from "@/components/PaymentSlip.vue";

export default {
  components: {
    SideNav,
    PaymentSlip,
  },
  data() {
    return {
      primateljiData: [],
      receiverData: [],
    };
  },
  computed: {},
  created() {
    this.fetchDataPrimatelji();
  },

  methods: {
    async generateBarcode(user) {
      await this.$store.dispatch("saveUserData", user);
      this.$router.push({ name: "BarcodeGenerator" });
    },

    async fetchDataPrimatelji() {
      try {
        const userID = this.$store.state.userID; // Get the userID from Vuex store

        const response1 = await api.get("/receiver", {
          params: {
            userID: userID,
          },
        });
        this.primateljiData = response1.data.data;
        console.log(response1);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    windowPrint() {
      window.print();
    },
    collectBarcodeData(barcodeImage) {
      this.barcodeData.push(barcodeImage);
    },

    getUsers() {
      this.users = this.$store.getters.getUsers;
      this.$store.commit("resetUsers");
    },
    async sendAllEmails() {
      const paymentSlipComponents = this.$refs.paymentSlips;
      console.log(paymentSlipComponents);

      for (let i = 0; i < paymentSlipComponents.length; i++) {
        const paymentSlipComponent = paymentSlipComponents[i];
        const userEmail = this.primateljiData[i].e_mail;
        await paymentSlipComponent.generatePDFAndSendEmail(userEmail);
      }
    },
  },
};
</script>

<style scoped lang="less">
.payment-slips-container {
  width: 100%;
}
.title-payment-view {
  background: white;
  color: #ff8900;
  font-size: 40px;
}
.note-no-results {
  font-size: 40px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 40px;
  color: #ff8900;
}
.btn-container {
  display: flex;
  flex-direction: column;
  background: url("https://images.squarespace-cdn.com/content/v1/609701bc21f2ee5734517421/1642038232680-Z6OLCQ7TYQG42GLSRMKV/Gold+World+Cover+WM+new+.jpg?format=1500w");
  background-size: cover;
  padding: 50px 0;
  gap: 30px;
  width: 100%;
  height: 100%;
}
.payements {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.send-all-btn {
  padding: 10px 20px;
  font-size: 24px;
  margin: 0 auto;
}
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
  height: 80px;
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
