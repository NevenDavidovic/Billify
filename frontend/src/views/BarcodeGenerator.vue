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

import generateBarcode from "pdf417";
import axios from "axios";
import html2pdf from "html2pdf.js";
import SinglePaymentSlip from "@/components/SinglePaymentSlip.vue";

export default {
  data() {
    return {
      //INFORMACIJE ZA GENERIRANJE BARKODA
      user: [],
      text: "",
      blockWidth: 2,
      blockHeight: 1,
      barcodeImage: null,

      //PAYMENT PARAMETRI
      paymentParams: {
        bazniKod: "HRVHUB30\nEUR",
        iznosTransakcije: "",
        imePlatitelja: "",
        adresaPlatitelja: "",
        postanskiBrojIMjestoPlatitelja: "",
        imePrimatelja: "",
        adresaPrimatelja: "",
        postanskiBrojIMjestoPrimatelja: "",
        ibanPrimatelja: "",
        modelPlacanja: "",
        pozivNaBroj: "",
        sifraNamjene: "",
        opisPlacanja: "",
      },
      concatenatedString: "",
      organizacijaData: [],
      activeOrganization: [],
      inactiveOrganization: [],
    };
  },
  components: {
    SideNav,
    SinglePaymentSlip,
  },

  created() {},
  mounted() {
    this.fetchData();
    this.adjustPaymentParams();
  },
  methods: {
    resetUserData() {
      this.$store.dispatch("resetUserData");
    },
    adjustPaymentParams() {
      const user = this.$store.state.userData;
      this.resetUserData();
      if (user) {
        console.log("thisUSER", user);

        this.paymentParams.imePlatitelja = user.ime_prezime;
        this.paymentParams.adresaPlatitelja = user.ulica;
        this.paymentParams.postanskiBrojIMjestoPlatitelja = user.grad;
        this.paymentParams.iznosTransakcije = user.iznos;
        this.paymentParams.pozivNaBroj = user.poziv_na_primatelja;
        this.paymentParams.opisPlacanja = user.opis_placanja;

        // dodavanje male pauze za generiranje barkoda
        setTimeout(() => {
          this.generateBarcode();
        }, 300);
      }
    },

    getPaymentParams() {
      return this.paymentParams;
    },

    generatePDF() {
      const element = document.getElementById("izvoz-uplatnice"); // Replace with your element ID
      const options = {
        filename: "exported-document.pdf",
        image: { type: "jpeg", quality: 0.98 }, // Image options (if needed)
        html2canvas: { scale: 2 }, // html2canvas options (if needed)
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // jsPDF options (if needed)
      };

      html2pdf().from(element).set(options).save();
    },

    generateBarcode() {
      this.concatenateStrings();

      this.text = this.concatenatedString;
      if (this.text) {
        this.barcodeImage = generateBarcode(
          this.text,
          this.blockWidth,
          this.blockHeight
        );
      } else {
        alert("Error prilikom generiranja barkoda");
      }
    },

    concatenateStrings() {
      const concatenatedValues = Object.values(this.paymentParams)
        .map((value) => `${value}\n`)
        .join("");

      this.concatenatedString = concatenatedValues;
    },

    fetchData() {
      axios
        .get("http://localhost:8081/")
        .then((response) => {
          this.organizacijaData = response.data.data;

          const status0Rows = this.organizacijaData.filter(
            (row) => row.status === 0
          );
          const status1Rows = this.organizacijaData.filter(
            (row) => row.status === 1
          );
          // aktivna i inaktivne organizacije
          this.activeOrganization = status1Rows;
          this.inactiveOrganization = status0Rows;

          this.paymentParams.imePrimatelja = this.activeOrganization[0].naziv;
          this.paymentParams.adresaPrimatelja =
            this.activeOrganization[0].ulica;
          this.paymentParams.postanskiBrojIMjestoPrimatelja =
            this.activeOrganization[0].grad;
          this.paymentParams.ibanPrimatelja = this.activeOrganization[0].iban;

          console.log(this.paymentParams.imePrimatelja);
          console.log(this.activeOrganization);
        })
        .catch((error) => {
          alert("Greška u dohvaćanju podataka", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
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
