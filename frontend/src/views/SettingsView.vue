<template>
  <div class="background-primary page-statistika">
    <div class="generiraj-barkod container">
      <div class="aside">
        <SideNav />
      </div>

      <div class="settings-container">
        <h2>Postavke Emaila</h2>
        <div class="subjekt item">
          <label for="subjekt">Subjekt maila</label>
          <input type="text" name="subjekt" v-model="subject" />
        </div>
        <div class="poruka item">
          <label for="poruka">Poruka unutar maila</label>
          <textarea
            type="text"
            id="textbox"
            name="textbox"
            rows="4"
            cols="50"
            v-model="message"
          ></textarea>
        </div>

        <div class="filename item">
          <label for="poruka">Ime privitka</label>
          <input type="text" name="poruka" v-model="filename" />
        </div>

        <div class="template-picker">
          <div class="template-one template">
            <h2>Template 1</h2>
            <input type="radio" value="1" v-model="emailTemplate" />
            <img
              :src="require('@/assets/images/BlueExample.jpg')"
              alt="My Image"
            />
          </div>
          <div class="template-two template">
            <h2>Template 2</h2>
            <input type="radio" value="2" v-model="emailTemplate" />
            <img
              :src="require('@/assets/images/BlueExample.jpg')"
              alt="My Image"
            />
          </div>
          <div class="template-three template">
            <h2>Template 3</h2>
            <input type="radio" value="3" v-model="emailTemplate" />
            <img
              :src="require('@/assets/images/BlueExample.jpg')"
              alt="My Image"
            />
          </div>
        </div>

        <div class="item">
          <h2>Gmail ključ</h2>
          <p>-postavi ključ elektroiničke pošte gmaila</p>
          <input type="password" v-model="gmailKey" />
        </div>
        <div class="item">
          <h2>E mail adresa</h2>
          <p>- postavi adresu elektroiničke pošte s koje upisujete ključ</p>
          <input type="text" v-model="e_mail" />
        </div>

        <button class="green-btn" @click="handleUpdateSettings">Spremi</button>
        <br />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";
import api from "@/services/Api";

export default {
  components: {
    SideNav,
  },
  data() {
    return {
      users: [],
      statisticsLoaded: false,
      showCityStats: true,
      barcodeData: [],
      subject: "",
      message: "",
      emailTemplate: null,
      gmailKey: "",
      e_mail: "",
      filename: "",
    };
  },
  mounted() {
    this.fetchPostavkeData();
  },
  methods: {
    async handleUpdateSettings() {
      try {
        const updatedSettings = {
          subject: this.subject,
          message: this.message,
          e_mail_template: this.emailTemplate,
          gmail_key: this.gmailKey,
          e_mail: this.e_mail,
          filename: this.filename,
        };
        console.log("Settings:", updatedSettings);
        await this.updatePostavkeData(updatedSettings);
      } catch (error) {
        console.error("Error updating settings:", error);
      }
    },

    async updatePostavkeData(updatedSettings) {
      try {
        const userID = this.$store.state.userID; // Get the userID from Vuex store

        const response = await api.put("/postavke", {
          userID: userID,
          ...updatedSettings,
        });

        console.log("Settings updated successfully:", response.data);
        alert("Settings updated successfully");
      } catch (error) {
        console.error("Error updating settings:", error);
        alert("Error updating settings:", error);
      }
    },
    fetchPostavkeData() {
      const userID = this.$store.state.userID; // Get the userID from Vuex store
      api
        .get("/postavke", {
          params: {
            userID: userID,
          },
        })
        .then((response) => {
          const postavkeData = response.data.data;
          this.subject = postavkeData[0].subject;
          this.message = postavkeData[0].message;
          this.emailTemplate = postavkeData[0].e_mail_template;
          this.gmailKey = postavkeData[0].gmail_key;
          this.e_mail = postavkeData[0].e_mail;
          this.filename = postavkeData[0].filename;
        })
        .catch((error) => {
          alert("Greška prilikom dohvaćanja podataka:", error);
        });
    },
  },
};
</script>

<style scoped lang="less">
.page-statistika {
  padding-bottom: 300px;
}
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 50px;
  color: white;
  border-left: 2px solid white;
  padding: 50px;
  .green-btn {
    max-width: 200px;
    margin: auto;
    color: white;
    background: rgb(16, 197, 16);
    border: 0px solid;
    padding: 10px 20px;
    border-radius: 10px;
    &:hover {
      background: green;
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 20px;
    p {
      color: gray;
      font-style: italic;
    }

    input {
      height: 47px;
      border-radius: 8px;
      border: 0px solid;
      padding-left: 20px;
    }
  }
  .template-picker {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    img {
      width: 200px;
    }

    input {
      height: 30px;
      width: 30px;
      border: 0px solid;
    }
    .template {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      justify-items: center;
      gap: 20px;
    }
  }
}
</style>
