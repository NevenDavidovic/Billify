<template>
  <div>
    <div class="generiraj-barkod container">
      <div class="aside">
        <SideNav />
      </div>

      <div class=""></div>

      <div class="about">
        <div class="about-body">
          <button class="btn-white" @click="openModal">
            + Unos Organizacije
          </button>
          <div class="promoted-organization">
            <div
              class="left-item img-organization"
              v-for="(item, index) in activeOrganization"
              :key="index"
            >
              <img :src="item.slika" alt="ispuni" />
            </div>

            <div
              class="right-item"
              v-for="(item, index) in activeOrganization"
              :key="index"
            >
              <p>{{ item.naziv }}</p>
              <p>{{ item.ulica }}</p>
              <p>{{ item.grad }}</p>
              <p>{{ item.e_mail }}</p>
              <p>{{ item.iban }}</p>
              <button class="btn-gold" title="Uredi" @click="editData(item.id)">
                UREDI
              </button>
            </div>
          </div>
        </div>

        <h3 class="popis-org-title">Popis organizacija</h3>

        <div class="data-organization-inactive">
          <div v-if="isLoading">Loading...</div>

          <div v-for="(item, index) in inactiveOrganization" :key="index">
            <div class="organization-item">
              <div class="upper-part-item">
                <img :src="item.slika" alt="" />
              </div>
              <div class="lower-part-item">
                <p>{{ item.naziv }}</p>

                <p>{{ item.e_mail }}</p>
                <p>{{ item.iban }}</p>
                <div class="two-buttons">
                  <button
                    class="btn-gold"
                    title="Učini aktivnom"
                    @click="setActiveOrganization(item.id)"
                  >
                    <svg
                      style="color: white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="21"
                      fill="currentColor"
                      class="bi bi-caret-right-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                        fill="white"
                      ></path>
                      <path
                        d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"
                        fill="white"
                      ></path>
                    </svg>
                  </button>

                  <button
                    class="btn-white"
                    title="Obriši Organizaciju"
                    @click="deleteOrganization(item.id)"
                    style="background-color: rgb(212, 109, 109)"
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
                  <button
                    class="btn-white"
                    title="Uredi Organizaciju"
                    @click="editData(item.id)"
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
                </div>
              </div>
            </div>
          </div>

          <div v-if="!isLoading && organizacijaData.length === 0">
            No data available
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
    <div class="svg-close">
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
    </div>

    <h3>Unesi svoju organizaciju</h3>
    <div class="mandatory">*Sva polja su obavezna</div>
    <div class="">
      <form
        action="post"
        class="input-container"
        @submit.prevent="saveOrganization"
      >
        <input type="text" placeholder="Naziv..." v-model="formData.naziv" />
        <input type="text" placeholder="Ulica..." v-model="formData.ulica" />
        <input type="text" placeholder="Grad..." v-model="formData.grad" />
        <input type="text" placeholder="Email..." v-model="formData.e_mail" />
        <input type="text" placeholder="IBAN..." v-model="formData.iban" />
        <input
          type="text"
          placeholder="Učitaj sliku..."
          v-model="formData.slika"
        />
        <select name="" id="" v-model="formData.status" class="select-active">
          <option value="0">Inaktivna</option>
          <option value="1">Akivna</option>
        </select>
        <br />

        <button type="submit" class="btn-gold full-w">Spremi</button>
      </form>
    </div>
  </div>

  <div class="modal-organization" v-if="isEditOpen">
    <form @submit.prevent="editData">
      <div class="zatvori-tag" @click="toogleEditData">ZATVORI</div>

      <div class="modal-item modal-left">
        <img :src="editableItem.slika" alt="" />
        <input type="text" v-model="editableItem.naziv" />
        <input type="text" v-model="editableItem.ulica" />
        <input type="text" v-model="editableItem.grad" />
      </div>

      <div class="modal-item modal-right">
        <div class="right-item right-first">
          <input type="text" v-model="editableItem.e_mail" />
          <input type="text" v-model="editableItem.iban" />
        </div>
        <div class="right-item right-second" :disabled="isSelectDisabled">
          <div class="input-act">
            <span v-if="editableItem.status === 1" class="green-status"
              >Aktivna</span
            >
            <span v-else class="red-status">Neaktivna</span>
          </div>

          <input
            type="text"
            v-model="editableItem.datum_unosa_organizacije"
            disabled
          />
        </div>
      </div>

      <button
        type="submit"
        class="spremi-tag"
        @click="saveEditedItem(editableItem.id)"
      >
        SPREMI
      </button>
    </form>
  </div>

  <div v-if="isModalOpen || isEditOpen" class="overlay"></div>
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
      isSelectDisabled: true,
      organizacijaData: [],
      isLoading: true,
      activeOrganization: [],
      inactiveOrganization: [],
      isModalOpen: false,
      isEditOpen: false,
      formData: {
        naziv: "",
        ulica: "",
        grad: "",
        e_mail: "",
        iban: "",
        datum_unosa_organizacije: new Date(),
        status: "",
        slika: "",
      },
      editableItem: {
        id: "",
        naziv: "",
        ulica: "",
        grad: "",
        e_mail: "",
        iban: "",
        datum_unosa_organizacije: "",
        status: "",
        slika: "",
      },
    };
  },
  computed: {},

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:8081/")
        .then((response) => {
          this.organizacijaData = response.data.data;
          console.log(this.organizacijaData);
          const status0Rows = this.organizacijaData.filter(
            (row) => row.status === 0
          );
          const status1Rows = this.organizacijaData.filter(
            (row) => row.status === 1
          );

          this.activeOrganization = status1Rows;
          this.inactiveOrganization = status0Rows;
          console.log("Status 0 Data:", this.status0Data);
          console.log("Status 1 Data:", this.status1Data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    saveEditedItem(id) {
      const editedData = {
        naziv: this.editableItem.naziv,
        ulica: this.editableItem.ulica,
        grad: this.editableItem.grad,
        e_mail: this.editableItem.e_mail,
        iban: this.editableItem.iban,
        datum_unosa_organizacije: this.editableItem.datum_unosa_organizacije,
        status: this.editableItem.status,
        slika: this.editableItem.slika,
      };
      console.log("Editd Data", this.editedData);
      console.log("Id", id);

      axios
        .put(`http://localhost:8081/update-organization/${id}`, editedData)
        .then((response) => {
          console.log("Data updated:", response.data);
          this.fetchData();
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          alert("ERROR!!", error);
          return;
        });

      this.toogleEditData();
    },

    setActiveOrganization(id) {
      axios
        .put(`http://localhost:8081/update-organization-status/${id}`)
        .then((response) => {
          console.log("Organization status updated:", response.data);
          this.fetchData();
        })
        .catch((error) => {
          console.error("Error updating organization status:", error);
          alert("You have error: ", error);
        });
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },

    toogleEditData() {
      this.isEditOpen = !this.isEditOpen;
    },

    editData(id) {
      this.toogleEditData();
      const filteredRow = this.organizacijaData.find((row) => row.id === id);

      for (let key in this.editableItem) {
        this.editableItem[key] = filteredRow[key];
      }
    },

    resetFormData() {
      for (let key in this.formData) {
        if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
          this.formData[key] = Array.isArray(this.formData[key]) ? [] : "";
        }
      }
    },
    deleteOrganization(id) {
      if (confirm("Jeste li sigurni da želite obrisati stavku?")) {
        alert("Obrisali ste stavku");
      } else {
        return;
      }

      axios
        .delete(`http://localhost:8081/delete-organization/${id}`)
        .then((response) => {
          console.log("Organization deleted:", response.data);

          this.fetchData();
        })
        .catch((error) => {
          console.error("Error deleting organization:", error);
        });
    },

    saveOrganization() {
      const formData = {
        naziv: this.formData.naziv,
        ulica: this.formData.ulica,
        grad: this.formData.grad,
        e_mail: this.formData.email,
        iban: this.formData.iban,
        datum_unosa_organizacije: this.formData.datum_unosa_organizacije,
        status: this.formData.status,
        slika: this.formData.slika,
      };

      axios
        .post("http://localhost:8081/save-organization", this.formData)
        .then((response) => {
          console.log("Data saved:", response.data);
          this.closeModal();
          this.resetFormData();
          this.fetchData();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          console.log(formData);
        });
    },
  },
};
</script>

<style scoped lang="less">
.generiraj-barkod {
  display: flex;
  height: 100vh;
  .aside {
  }
  .about {
    background-color: white;
    width: 100%;
    height: fit-content;
    .about-body {
      padding: 3.6em;

      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .promoted-organization {
      display: flex;
      border: 2px solid #3d4c4d;
      border-radius: 13px;
      max-height: 400px;
    }
    .right-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      align-items: center;
      justify-content: center;
      background-color: #3d4c4d;
      color: white;
      border-radius: 0 8px 8px 0;
    }
    .left-item {
      display: flex;
      align-items: center;
      flex: 1;
      width: 100%;
      height: 100%;
      max-height: 400px;

      justify-content: center;
      background-color: white;
      border-radius: 10px 0 0 10px;
      border: 2px solid #3d4c4d;
      img {
        width: 100%;
        max-height: 400px;
        border-radius: 8px 0 0 8px;
      }
    }
  }
}
.header-class-navbar {
  background-color: #db9f58;
  .header-navbar-section {
    background-color: #db9f58;
  }
}

.login-btn,
.right-side-btn {
  display: none !important;
}

.data-organization-inactive {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  gap: 1em;
  padding-bottom: 4em;

  .organization-item {
    border-radius: 14px;
    transition: all 1s ease-in-out;

    max-width: 300px;
    height: 300px;
    &not:hover {
      transition: height 1s ease-in-out;
      .upper-part-item {
        transition: all 1s ease-in-out;
        img {
          transition: all 1s ease-in-out;
        }
      }
    }
    &:hover {
      .upper-part-item {
        img {
          height: 241px;
          transition: 1s ease-in-out;
          opacity: 1;
          border-bottom: 2px solid white;
        }
      }

      .lower-part-item {
        color: white;
      }
    }

    .upper-part-item {
      width: 300px;
      height: 150px;
      height: 50%;
      img {
        width: 100%;
        border-radius: 14px 14px 0 0;
        height: 150px;
      }
    }
    .lower-part-item {
      height: 50%;
      padding: 15px;
      background-color: #3d4c4d;
      color: white;
      font-weight: 400;
      border-radius: 0 0 14px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 100;
      .two-buttons {
        display: flex;
        gap: 10px;
        justify-content: center;
      }
    }
  }
}
.full-w {
  min-width: 100%;
  height: 40px;
}
.select-active {
  height: 47px;
  border-radius: 8px;
}
.input-container {
  input {
    height: 47px !important;
  }
}

.modal-organization {
  display: flex;
  padding: 32px;
  gap: 2em;
  margin: auto;
  position: fixed;
  top: 0%;
  left: 40%;
  z-index: 100;
  max-width: 900px;
  left: 20%;

  form {
    display: flex;
    gap: 2em;
  }
  .zatvori-tag {
    border: 1px solid gray;
    position: absolute;
    background: #d9d9d9;
    right: 32px;
    border-radius: 4px;
    color: gray;
    padding: 2px 5px;
    cursor: pointer;
  }
  .spremi-tag {
    position: absolute;
    bottom: 22px;
    color: white;
    background: #db9f58;
    font-size: 24px;
    padding: 5px 25px;
    border-radius: 8px;
    right: 50%;
    cursor: pointer;
  }

  .modal-left {
    border: 1px solid #a4a7ac;
    border-radius: 8px;
    padding: 32px;
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background: white;
    box-shadow: 0 0 20px 0 #d9e2ec;
    justify-content: center;
    justify-items: center;
    align-items: center;
    img {
      width: 100%;
      border-radius: 8px;
    }

    input {
      height: 47px;
      width: 100%;
      border-radius: 4px;
      border-bottom: 2px solid #a4a7ac;
      border-top: 1px solid #a4a7ac;
      border-left: 1px solid #a4a7ac;
      border-right: 1px solid #a4a7ac;
      padding: 0 5px;
      text-align: center;
    }
  }

  .modal-right {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    margin-top: 50px;
    margin-bottom: 50px;
    gap: 2em;
    .right-first,
    .right-second {
      display: flex;
      flex-direction: column;
      gap: 1em;
      border: 1px solid #a4a7ac;
      padding: 32px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 0 20px 0 #d9e2ec;
      flex: 1;
      justify-content: center;
      justify-items: center;
      select,
      input {
        height: 47px;
        width: 354px;
        border-radius: 4px;
        border-bottom: 2px solid #a4a7ac;
        border-top: 1px solid #a4a7ac;
        border-left: 1px solid #a4a7ac;
        border-right: 1px solid #a4a7ac;
        padding: 0 5px;
        text-align: center;
      }
    }
  }
}
.input-act {
  height: 47px;
  border-radius: 4px;
}

.red-status,
.green-status {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.red-status {
  background: rgb(251, 76, 76);
}
.green-status {
  background: rgb(16, 132, 31);
}
</style>
