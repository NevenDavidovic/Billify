<template>
  <div class="main-div home-view">
    <section class="container">
      <div class="left-item-text">
        <h1>Generiraj barkod uplatnicu za nacionalna plaćanja</h1>
        <p>
          Plaćanje računa postaje jednostavnije i brže nego ikada uz naš potpuno
          prilagodljiv generator uplatnica! S Bilifyjem, Vašim vlastitim alatom
          za stvaranje uplatnica, uštedjet ćete dragocjeno vrijeme i olakšati
          proces plaćanja.
        </p>
        <a href="" class="btn-white heroicon"
          >Generiraj Barkod
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="arrow-up"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        </a>
      </div>
      <div class="right-item-cards">
        <div class="grid-item-1">
          <div class="item-card first-item">
            <img
              :src="require('@/assets/images/ispuni-i-plati.png')"
              alt="ispuni"
            />
            <h2 class="item-card">Ispuni i plati</h2>
            <p class="item-card-p">
              Nema više brige o ručnom popunjavanju uplatnica ili dugotrajnom
              čekanju u redovima.
            </p>
          </div>
          <div class="item-card second-item">
            <img
              :src="require('@/assets/images/profil-organizacije.png')"
              alt="ispuni"
            />
            <h2 class="item-card">Profil organizacije</h2>
            <p class="item-card-p">
              Personalizirani profil organizacije za personalizirane uplatnice
              po vašoj mjeri.
            </p>
          </div>
        </div>
        <div class="grid-item-2">
          <div class="item-card third-item">
            <img
              :src="require('@/assets/images/laksi-poslovni-proces.png')"
              alt="ispuni"
            />
            <h2 class="item-card">Lakši poslovni proces</h2>
            <p class="item-card-p">
              Uz Bilify, olakšajte svoj poslovni ili osobni financijski proces i
              uživajte u brzom, sigurnom i učinkovitom načinu plaćanja računa.
            </p>
          </div>
          <div class="item-card fourth-item">
            <img
              :src="require('@/assets/images/spremanje-uplatnica.png')"
              alt="ispuni"
            />
            <h2 class="item-card">Spremanje uplatnica</h2>
            <p class="item-card-p">
              You can promote any event or give discount codes when people scan
              the QR Code.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      organizacijaData: null,
    };
  },
  created() {},

  mounted() {},
  components: {},
  methods: {},
};
</script>

<style scoped></style>
