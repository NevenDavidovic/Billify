<template>
  <div class="page-statistika">
    <div class="generiraj-barkod container">
      <div class="aside">
        <SideNav />
      </div>

      <div class="about">
        <h2 class="title-statistika">Statistika</h2>

        <div v-if="statisticsLoaded" class="statistika-loaded">
          <h3 class="broj-primatelja-num-title">
            Broj primatelja uplatnice: {{ statistics.numPayers[0].count }}
          </h3>

          <h3 class="stats-city-title">
            Omjer primatelja po gradu
            <button
              class="btn-gold"
              @click="showCityStatss"
              :class="{ hidden: !showCityStats }"
            >
              Pogledaj...
            </button>
            <button
              class="btn-gold"
              @click="hideCityStats"
              :class="{ hidden: showCityStats }"
            >
              Sakrij...
            </button>
          </h3>

          <table class="city-table" :class="{ hidden: showCityStats }">
            <thead>
              <tr>
                <td class="city-head">Grad</td>
                <td class="receiver-head">Broj primatelja po gradu</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(count, city) in statistics.cityNum" :key="city">
                <td>{{ count.grad }}</td>
                <td>{{ count.count }}</td>
              </tr>
            </tbody>
          </table>

          <h3 class="title-platitelji">Top 3 platitelja</h3>
          <ul class="list-platitelji">
            <li v-for="payer in statistics.largestPay" :key="payer.id">
              {{ payer.ime_prezime }} - {{ payer.iznos }}
            </li>
          </ul>
        </div>
        <div v-else class="loading">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/Api";
import SideNav from "@/components/SideNav.vue";
export default {
  components: {
    SideNav,
  },
  data() {
    return {
      statistics: {},
      statisticsLoaded: false,
      showCityStats: true,
    };
  },
  mounted() {
    this.fetchStatistics();
  },
  methods: {
    async fetchStatistics() {
      try {
        const userID = this.$store.state.userID;

        const response = await api.get("/statistics", { params: { userID } });
        this.statistics = response.data;
        this.statisticsLoaded = true;
      } catch (error) {
        alert("Greška dohvaćanja statistike:", error);
      }
    },

    showCityStatss() {
      this.showCityStats = false;
    },
    hideCityStats() {
      this.showCityStats = true;
    },
  },
};
</script>
<style scoped lang="less">
.aside {
  @media (max-width: 800px) {
    height: unset;
    margin-bottom: 50px;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.page-statistika {
  .about {
    .title-statistika {
      padding: 2em 0;
      font-weight: 400;
    }
    .statistika-loaded {
      display: flex;
      flex-direction: column;
      gap: 2em;
      padding: 0 2em;
      .city-table {
        width: 100%;
      }
      .title-platitelji,
      .broj-primatelja-num-title,
      .stats-city-title {
        text-align: left;
        border-bottom: 2px solid #3d4c4d;
        padding: 20px 0;
        font-weight: 400;
        background-color: #3d4c4d;
        color: white;
      }
    }
    .loading {
    }
    .list-platitelji li {
      text-align: left;
      background-color: #db9f58;
      margin: 5px 0;
      padding: 5px 0;
    }
  }
}
</style>
