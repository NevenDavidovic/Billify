<template>
  <div>
    <div class="generiraj-barkod container">
      <div class="aside">
        <SideNav />
      </div>

      <div class="about">
        <div class="about-body">
          <div class="search-wrapper">
            <div class="container-search">
              <input
                type="text"
                v-model="searchField"
                @input="searchReceivers"
              />
              <div class="search"></div>
            </div>
          </div>
        </div>

        <div class="about-body-child">
          <div class="three-buttons-data">
            <button class="btn-black unos-primatelja" @click="openModal">
              + Unos Primatelja
            </button>
            <button class="btn-black" @click="generateBarcodeForAll">
              Pretvori u uplatnice
            </button>
            <button class="btn-black brisi-sve" @click="deleteAllReceivers">
              Briši sve
            </button>
          </div>

          <br />
          <div class="table-container">
            <div class="table-horizontal-container">
              <div v-if="isLoading">Loading...</div>
              <table class="unfixed-table" v-else>
                <thead>
                  <tr>
                    <th>Odaberi radnju</th>
                    <th>Ime i prezime</th>
                    <th>Ulica</th>
                    <th>Poštanski br./ Grad</th>
                    <th>E-mail</th>
                    <th>Iznos</th>
                    <th>Vrijeme unosa</th>
                    <th>Opis plaćanja</th>
                    <th>Model</th>
                    <th>Poziv na broj</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in primateljiData" :key="index">
                    <td class="row-button">
                      <button
                        class="btn-white"
                        title="Uredi primatelja"
                        @click="editReceiverData(item.id)"
                      >
                        <svg
                          style="color: white"
                          width="25"
                          height="21"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="25"
                            height="21"
                            fill="white"
                            fill-opacity="0.01"
                          ></rect>
                          <path
                            d="M29 4H9C7.89543 4 7 4.89543 7 6V42C7 43.1046 7.89543 44 9 44H37C38.1046 44 39 43.1046 39 42V20.0046"
                            stroke="#3d4c4d"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            fill="white"
                          ></path>
                          <path
                            d="M13 18H21"
                            stroke="#3d4c4d"
                            stroke-width="4"
                            stroke-linecap="round"
                            fill="white"
                          ></path>
                          <path
                            d="M13 28H25"
                            stroke="#3d4c4d"
                            stroke-width="4"
                            stroke-linecap="round"
                            fill="white"
                          ></path>
                          <path
                            d="M40.9991 6.00079L29.0044 17.9956"
                            stroke="#3d4c4d"
                            stroke-width="7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            fill="white"
                          ></path>
                        </svg>
                      </button>
                      <button
                        class="btn-white"
                        title="Generiraj Barkod"
                        @click="generateBarcode(item)"
                      >
                        <img
                          :src="require('@/assets/images/generiraj-barkod.png')"
                          alt="generiraj"
                        />
                      </button>
                      <button
                        class="btn-white"
                        title="Obriši primatelja"
                        @click="deleteReceiver(item.id)"
                      >
                        <svg
                          style="color: #3d4c4d"
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="21"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                            fill="#3d4c4d"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            fill="#3d4c4d"
                          ></path>
                        </svg>
                      </button>
                    </td>
                    <td>{{ item.ime_prezime }}</td>
                    <td>{{ item.ulica }}</td>
                    <td>{{ item.grad }}</td>
                    <td>{{ item.e_mail }}</td>
                    <td>{{ item.iznos }}</td>
                    <td>{{ item.datum_unosa_primatelja }}</td>
                    <td>{{ item.opis_placanja }}</td>
                    <td>{{ item.model_placanja }}</td>
                    <td>{{ item.poziv_na_primatelja }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="!isLoading && primateljiData.length === 0">
            Nema podataka za prikazati
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal-new-organization centered"
    id="modal-block-org"
    v-if="isModalOpen"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
      id="close-btn-modal"
      @click="closeModal"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <div class="tab-decision">
      <div
        class="left-choice"
        :class="{ active: isFormOpen }"
        @click="formLogic('A')"
      >
        Pojedinačan unos
      </div>
      <div
        class="right-choice"
        :class="{ active: isExcellOpen }"
        @click="formLogic('B')"
      >
        Učitaj Excell
      </div>
    </div>

    <div class="form-receiver" :class="{ hidden: isExcellOpen }">
      <form
        action="post"
        class="input-container"
        @submit.prevent="saveReceiverData"
      >
        <input
          type="text"
          placeholder="Ime i prezime..."
          v-model="formData.imePrezime"
        />
        <input
          type="text"
          placeholder="Adresa..."
          v-model="formData.adresaStanovanja"
        />
        <input
          type="text"
          placeholder="Poš.br. i Grad..."
          v-model="formData.gradPostanskiBroj"
        />
        <input type="text" placeholder="Email..." v-model="formData.eMail" />
        <input type="text" placeholder="Iznos..." v-model="formData.iznos" />
        <input
          type="text"
          placeholder="Opis plaćanja..."
          v-model="formData.opisPlacanja"
        />
        <input
          type="text"
          placeholder="Model plaćanja"
          v-model="formData.model_placanja"
        />
        <input
          type="text"
          placeholder="Poziva na broj primatelja.."
          v-model="formData.poziv_na_primatelja"
        />

        <button type="submit" class="btn-gold">Spremi</button>
        <div class="mandatory">*Sva polja su obavezna</div>
      </form>
    </div>
    <div class="excel-form" :class="{ hidden: isFormOpen }">
      <label for="images" class="drop-container" id="dropcontainer">
        <span class="drop-title">Drop files here</span>
        <span class="drop-title">or</span>
        <input
          type="file"
          id="images"
          accept=".xls, .xlsx, .xml, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/xml"
          required
          @change="uploadFile"
        />
        <button @click="parseXML" class="btn-gold">Start Upload</button>
      </label>
    </div>
  </div>

  <div class="form-receiver-edit" :class="{ hidden: isEditModal }">
    <div class="svg-close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width="20"
        color="white"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        id="close-btn-modal"
        @click="closeEditModal"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <p>Uredi primatelja</p>

    <form
      action="post"
      class="input-container"
      @submit.prevent="() => saveEditedReceiver(this.editData.id)"
    >
      <input
        type="text"
        placeholder="Ime i prezime..."
        v-model="editData.imePrezime"
      />
      <input
        type="text"
        placeholder="Adresa..."
        v-model="editData.adresaStanovanja"
      />
      <input
        type="text"
        placeholder="Poš.br. i Grad..."
        v-model="editData.gradPostanskiBroj"
      />
      <input type="text" placeholder="Email..." v-model="editData.eMail" />
      <input type="text" placeholder="Iznos..." v-model="editData.iznos" />
      <input
        type="text"
        placeholder="Opis plaćanja..."
        v-model="editData.opisPlacanja"
      />
      <input
        type="text"
        placeholder="Model plaćanja"
        v-model="editData.model_placanja"
      />
      <input
        type="text"
        placeholder="Poziva na broj primatelja.."
        v-model="editData.poziv_na_primatelja"
      />

      <button type="submit" class="btn-gold">Spremi</button>
    </form>
  </div>

  <div v-if="isModalOpen" class="overlay"></div>
</template>

<script>
import axios from "axios";
import SideNav from "@/components/SideNav.vue";

export default {
  components: {
    SideNav,
  },
  data() {
    return {
      primateljiData: [],
      isLoading: true,
      isModalOpen: false,
      isFormOpen: true,
      isExcellOpen: false,
      uploadedFile: null,
      receiverData: [],
      isEditModal: true,
      searchField: "",

      formData: {
        imePrezime: "",
        adresaStanovanja: "",
        gradPostanskiBroj: "",
        eMail: "",
        iznos: "",
        datumUnosaPrimatelja: new Date(),
        opisPlacanja: "",
        model_placanja: "",
        poziv_na_primatelja: "",
      },
      editData: {
        id: "",
        imePrezime: "",
        adresaStanovanja: "",
        gradPostanskiBroj: "",
        eMail: "",
        iznos: "",
        datumUnosaPrimatelja: new Date(),
        opisPlacanja: "",
        model_placanja: "",
        poziv_na_primatelja: "",
      },
    };
  },
  computed: {},
  created() {
    this.fetchDataPrimatelji();
  },

  methods: {
    searchReceivers() {
      if (this.searchField.trim() === "") {
        this.fetchDataPrimatelji();
      } else {
        this.primateljiData = this.primateljiData.filter((receiver) => {
          return (
            receiver.ime_prezime
              .toLowerCase()
              .includes(this.searchField.toLowerCase()) ||
            receiver.ulica
              .toLowerCase()
              .includes(this.searchField.toLowerCase()) ||
            receiver.grad.toLowerCase().includes(this.searchField.toLowerCase())
          );
        });
      }
    },
    splitData(data) {
      // Split data into chunks if necessary
      const chunkSize = 10; // Example chunk size
      const chunks = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
      }
      return chunks;
    },

    editReceiverData(id) {
      const filteredRow = this.primateljiData.find((row) => row.id === id);
      this.editData.id = id;
      this.editData.imePrezime = filteredRow.ime_prezime;
      this.editData.adresaStanovanja = filteredRow.ulica;
      this.editData.gradPostanskiBroj = filteredRow.grad;
      this.editData.eMail = filteredRow.e_mail;
      this.editData.iznos = filteredRow.iznos;
      this.editData.datumUnosaPrimatelja = filteredRow.datum_unosa_primatelja;
      this.editData.opisPlacanja = filteredRow.opis_placanja;
      this.editData.model_placanja = filteredRow.model_placanja;
      this.editData.poziv_na_primatelja = filteredRow.poziv_na_primatelja;

      this.openEditModal();
    },

    saveEditedReceiver(id) {
      const editedReceiverData = {
        ime_prezime: this.editData.imePrezime,
        ulica: this.editData.adresaStanovanja,
        grad: this.editData.gradPostanskiBroj,
        e_mail: this.editData.eMail,
        iznos: this.editData.iznos,
        datum_unosa_primatelja: this.editData.datumUnosaPrimatelja,
        opis_placanja: this.editData.opisPlacanja,
        model_placanja: this.editData.model_placanja,
        poziv_na_primatelja: this.editData.poziv_na_primatelja,
      };

      axios
        .put(`http://localhost:8081/update-receiver/${id}`, editedReceiverData)
        .then((response) => {
          console.log("Receiver data updated:", response.data);
          this.fetchDataPrimatelji();
          alert("Uspješno izmjenjen primatelj!");
          this.closeEditModal();
        })
        .catch((error) => {
          console.error("Greška pri ažuriranju korisničkih podataka:", error);

          const errorMessage = error.response
            ? error.response.data.error
            : "Error";

          alert("Greška pri ažuriranju korisničkih podataka: " + errorMessage);
        });
    },

    generateBarcodeForAll() {
      console.log(this.primateljiData);
      this.$router.push({ name: "PaymentView" });
    },

    async generateBarcode(user) {
      await this.$store.dispatch("saveUserData", user);
      this.$router.push({ name: "BarcodeGenerator" });
    },

    async deleteAllReceivers() {
      try {
        const response = await axios.delete(
          "http://localhost:8081/delete-all-receivers"
        );
        console.log("Svi primatelji obrisani:", response.data);

        if (response.data.message) {
          alert(response.data.message);
        }
        this.fetchDataPrimatelji();
      } catch (error) {
        console.error("Greška u brisanju svih primatelja:", error);
        alert("Greška u brisanju svih primatelja:", error);
      }
    },

    uploadFile(event) {
      this.uploadedFile = event.target.files[0];
    },

    parseXML() {
      if (!this.uploadedFile) {
        alert("Datoteka nije učitana");
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const xmlText = event.target.result;

        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        // Access and log XML data
        const rows = xmlDoc.querySelectorAll("rowNalog");

        rows.forEach((row) => {
          const platiteljNazivEl = row.querySelector("platiteljNaziv");
          const platiteljAdresaEl = row.querySelector("platiteljAdresa");
          const platiteljMjestoEl = row.querySelector("platiteljMjesto");
          const iznosEl = row.querySelector("iznos");
          const pozivNaBrojPrimateljaEl = row.querySelector(
            "pozivNaBrojPrimatelja"
          );
          const opisPlacanjaEl = row.querySelector("opisPlacanja");

          if (
            platiteljNazivEl &&
            platiteljAdresaEl &&
            platiteljMjestoEl &&
            iznosEl &&
            pozivNaBrojPrimateljaEl &&
            opisPlacanjaEl
          ) {
            const platiteljNaziv = platiteljNazivEl.textContent;
            const platiteljAdresa = platiteljAdresaEl.textContent;
            const platiteljMjesto = platiteljMjestoEl.textContent;
            const iznos = parseFloat(iznosEl.textContent.replace(",", "."));
            const pozivNaBrojPrimatelja = pozivNaBrojPrimateljaEl.textContent;
            const opisPlacanja = opisPlacanjaEl.textContent;

            this.receiverData.push({
              platiteljNaziv,
              platiteljAdresa,
              platiteljMjesto,
              iznos,
              pozivNaBrojPrimatelja,
              opisPlacanja,
            });
          } else {
            alert("Jedan ili više elemenata nije učitano:", row);
          }
        });
        this.sendDataToBackend(this.receiverData);
      };

      reader.readAsText(this.uploadedFile);
    },
    async sendDataToBackend(data) {
      try {
        const response = await axios.post(
          "http://localhost:8081/save-receivers",
          data
        );

        alert("Podaci poslani poslužitelju.");
        if (response.data.message) {
          alert(response.data.message);
        }
        this.closeModal();
      } catch (error) {
        alert(
          "Greška u slanju podatka poslužitelju. Pokušajte ponovno kasnije.",
          error
        );
      }
      this.fetchDataPrimatelji();
    },

    deleteReceiver(id) {
      if (confirm("Jeste li sigurni da želite obrisati primatelja?")) {
        axios
          .delete(`http://localhost:8081/delete-receiver/${id}`)
          .then((response) => {
            console.log("Receiver deleted:", response.data);
            alert("Receiver deleted");
            this.fetchDataPrimatelji();
          })
          .catch((error) => {
            alert("Greška u brisanju primatelja", error);
          });
      } else {
        return;
      }
    },

    formLogic(choice) {
      if (choice === "A") {
        this.isFormOpen = true;
        this.isExcellOpen = false;
      } else if (choice === "B") {
        this.isFormOpen = false;
        this.isExcellOpen = true;
      }
    },
    async fetchDataPrimatelji() {
      try {
        const response1 = await axios.get("http://localhost:8081/receiver");
        this.primateljiData = response1.data.data;
        console.log(response1);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async saveReceiverData() {
      try {
        const response = await axios.post(
          "http://localhost:8081/save-receiver",
          this.formData
        );
        console.log("Data saved:", response.data);
        this.closeModal();
        this.resetFormData();
        alert("Podaci su uspješno spremljeni");

        await this.fetchDataPrimatelji();
      } catch (error) {
        alert("Greška prilikom spremanja podataka", error);
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeEditModal() {
      this.isEditModal = true;
    },
    openEditModal() {
      this.isEditModal = false;
    },
    resetFormData() {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
    },
  },
};
</script>
