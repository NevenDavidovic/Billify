<template>
  <div class="payment-slip-container">
    <div class="above-info">
      <div
        class="right-item"
        v-for="(item, index) in activeOrganization"
        :key="index"
      >
        <img :src="item.slika" alt="" id="logo-org" width="150" />
      </div>
      {{ paymentParams.imePrimatelja }} ˙* {{ paymentParams.adresaPrimatelja }},
      {{ paymentParams.postanskiBrojIMjestoPrimatelja }}* IBAN:{{
        paymentParams.ibanPrimatelja
      }}
    </div>

    <div class="uplatnica-form-img" id="izvoz-uplatnice" ref="izvozUplatnice">
      <div class="platitelj">
        <input
          type="text"
          required
          id="imePlatitelja"
          maxlength="30"
          class="input-field"
          v-model="paymentParams.imePlatitelja"
        />
        <input
          type="text"
          id="adresaPlatitelja"
          maxlength="27"
          class="input-field"
          required
          v-model="paymentParams.adresaPlatitelja"
        />
        <input
          type="text"
          id="postanskiBrojIMjestoPlatitelja"
          maxlength="27"
          class="input-field"
          required
          v-model="paymentParams.postanskiBrojIMjestoPlatitelja"
        />
      </div>

      <input
        class="valuta"
        type="text"
        value=" EUR"
        disabled
        style="width: 50px; height: 27px"
      />

      <input
        type="text"
        class="iznos"
        id="iznos"
        pattern="^[0-9]+,[0-9]{2}$"
        placeholder="0,00"
        maxlength="16"
        required
        v-model="paymentParams.iznosTransakcije"
        style="height: 27px; padding-top: 5px"
      />
      <input
        class="iban-primatelja"
        type="text"
        id="brRacuna"
        maxlength="21"
        name=""
        required
        v-model="paymentParams.ibanPrimatelja"
        style="
          position: absolute;
          top: 115px;
          left: 335px;
          border: 0 solid transparent;
          background-color: transparent;
          font-size: 12px;
          letter-spacing: 8px;
          max-width: 312px;
          width: 100%;
          height: 27px;
        "
      />
      <div class="primatelj">
        <input
          type="text"
          id="primatelj"
          maxlength="25"
          class="input-field"
          v-model="paymentParams.imePrimatelja"
        />
        <input
          type="text"
          id="adresaPrimatelja"
          maxlength="25"
          class="input-field"
          v-model="paymentParams.adresaPrimatelja"
        />
        <input
          type="text"
          id="postanskiBrojIMjestoPrimatelja"
          maxlength="27"
          class="input-field"
          v-model="paymentParams.postanskiBrojIMjestoPrimatelja"
        />
      </div>

      <select
        class="model-placanja"
        id="modelPlacanja"
        v-model="paymentParams.modelPlacanja"
      >
        <option value="" disabled>-</option>
        <option value="HR01">HR01</option>
        <option value="HR02">HR02</option>
        <option value="HR03">HR03</option>
        <option value="HR04">HR04</option>
        <option value="HR05">HR05</option>
        <option value="HR06">HR06</option>
        <option value="HR07">HR07</option>
        <option value="HR08">HR08</option>
        <option value="HR09">HR09</option>
        <option value="HR10">HR10</option>
        <option value="HR11">HR11</option>
        <option value="HR12">HR12</option>
        <option value="HR13">HR13</option>
        <option value="HR14">HR14</option>
        <option value="HR15">HR15</option>
        <option value="HR16">HR16</option>
        <option value="HR17">HR17</option>
        <option value="HR18">HR18</option>
        <option value="HR23">HR23</option>
        <option value="HR24">HR24</option>
        <option value="HR26">HR26</option>
        <option value="HR27">HR27</option>
        <option value="HR28">HR28</option>
        <option value="HR29">HR29</option>
        <option value="HR30">HR30</option>
        <option value="HR31">HR31</option>
        <option value="HR33">HR33</option>
        <option value="HR34">HR34</option>
        <option value="HR40">HR40</option>
        <option value="HR41">HR41</option>
        <option value="HR42">HR42</option>
        <option value="HR43">HR43</option>
        <option value="HR55">HR55</option>
        <option value="HR62">HR62</option>
        <option value="HR63">HR63</option>
        <option value="HR64">HR64</option>
        <option value="HR65">HR65</option>
        <option value="HR67">HR67</option>
        <option value="HR68">HR68</option>
        <option value="HR69">HR69</option>
        <option value="HR99">HR99</option>
        <option value="HR25">HR25</option>
        <option value="HR83">HR83</option>
        <option value="HR84">HR84</option>
        <option value="HR50">HR50</option>
      </select>

      <input
        class="poziv-na-broj-primatelja"
        type="text"
        id="pozivNaBroj"
        maxlength="22"
        v-model="paymentParams.pozivNaBroj"
        style="
          padding-top: 5px;
          height: 30px;
          width: 200px;
          position: absolute;
          top: 148px;
          left: 323px;
          border: 0 solid;
          background: transparent;
        "
      />
      <select
        class="sifra-namjene"
        id="sifraNamjene"
        v-model="paymentParams.sifraNamjene"
        style="width: 57px; height: 27px"
      >
        <option value="" selected="selected" disabled>-</option>
        <option value="ADMG">Administracija</option>
        <option value="GVEA">
          Austrijski državni zaposlenici, Kategorija A
        </option>
        <option value="GVEB">
          Austrijski državni zaposlenici, Kategorija B
        </option>
        <option value="GVEC">
          Austrijski državni zaposlenici, Kategorija C
        </option>
        <option value="GVED">
          Austrijski državni zaposlenici, Kategorija D
        </option>
        <option value="BUSB">Autobusni</option>
        <option value="CPYR">Autorsko pravo</option>
        <option value="HSPC">Bolnička njega</option>
        <option value="RDTX">Cestarina</option>
        <option value="DEPT">Depozit</option>
        <option value="DERI">Derivati (izvedenice)</option>
        <option value="FREX">Devizno tržište</option>
        <option value="CGDD">
          Direktno terećenje nastalo kao rezultat kartične transakcije
        </option>
        <option value="DIVD">Dividenda</option>
        <option value="BECH">Dječji doplatak</option>
        <option value="CHAR">Dobrotvorno plaćanje</option>
        <option value="ETUP">Doplata e-novca</option>
        <option value="MTUP">Doplata mobilnog uređaja (bon)</option>
        <option value="GOVI">Državno osiguranje</option>
        <option value="ENRG">Energenti</option>
        <option value="CDCD">Gotovinska isplata</option>
        <option value="CSDB">Gotovinska isplata</option>
        <option value="TCSC">Gradske naknade</option>
        <option value="CDCS">Isplata gotovine s naknadom</option>
        <option value="FAND">Isplata naknade za elementarne nepogode</option>
        <option value="CSLP">Isplata socijalnih zajmova društava banci</option>
        <option value="RHBS">
          Isplata za vrijeme profesionalne rehabilitacije
        </option>
        <option value="GWLT">Isplata žrtvama rata i invalidima</option>
        <option value="ADCS">
          Isplate za donacije, sponzorstva, savjetodavne, intelektualne i druge
          usluge
        </option>
        <option value="PADD">Izravno terećenje</option>
        <option value="INTE">Kamata</option>
        <option value="CDDP">Kartično plaćanje s odgodom</option>
        <option value="CDCB">
          Kartično plaćanje uz gotovinski povrat (Cashback)
        </option>
        <option value="BOCE">Knjiženje konverzije u Back Office-u</option>
        <option value="POPE">Knjiženje mjesta kupnje</option>
        <option value="RCKE">Knjiženje ponovne prezentacije čeka</option>
        <option value="AREN">Knjiženje računa potraživanja</option>
        <option value="COMC">Komercijalno plaćanje</option>
        <option value="UBIL">Komunalne usluge</option>
        <option value="COMT">
          Konsolidirano plaćanje treće strane za račun potrošača.
        </option>
        <option value="SEPI">Kupnja vrijednosnica (interna)</option>
        <option value="GDDS">Kupovina-prodaja roba</option>
        <option value="GSCB">
          Kupovina-prodaja roba i usluga uz gotovinski povrat
        </option>
        <option value="GDSV">Kupovina/prodaja roba i usluga</option>
        <option value="SCVE">Kupovina/prodaja usluga</option>
        <option value="HLTC">Kućna njega bolesnika</option>
        <option value="CBLK">Masovni kliring kartica</option>
        <option value="MDCS">Medicinske usluge</option>
        <option value="NWCM">Mrežna komunikacija</option>
        <option value="RENT">Najam</option>
        <option value="ALLW">Naknada</option>
        <option value="SSBE">Naknada socijalnog osiguranja</option>
        <option value="LICF">Naknada za licencu</option>
        <option value="GFRP">Naknada za nezaposlene u toku stečaja</option>
        <option value="BENE">Naknada za nezaposlenost/invaliditet</option>
        <option value="CFEE">Naknada za poništenje</option>
        <option value="AEMP">Naknada za zapošljavanje</option>
        <option value="COLL">Naplata</option>
        <option value="FCOL">Naplata naknade po kartičnoj transakciji</option>
        <option value="DBTC">Naplata putem terećenja</option>
        <option value="NOWS">Nenavedeno</option>
        <option value="IDCP">
          Neopozivo plaćanje sa računa debitne kartice
        </option>
        <option value="ICCP">
          Neopozivo plaćanje sa računa kreditne kartice
        </option>
        <option value="BONU">Novčana nagrada (bonus).</option>
        <option value="PAYR">Obračun plaća</option>
        <option value="BLDM">Održavanje zgrada</option>
        <option value="HEDG">Omeđivanje rizika (Hedging)</option>
        <option value="CDOC">Originalno odobrenje</option>
        <option value="PPTI">Osiguranje imovine</option>
        <option value="LBRI">Osiguranje iz rada</option>
        <option value="OTHR">Ostalo</option>
        <option value="CLPR">Otplata glavnice kredita za automobil</option>
        <option value="HLRP">Otplata stambenog kredita</option>
        <option value="LOAR">Otplata zajma</option>
        <option value="ALMY">Plaćanje alimentacije</option>
        <option value="RCPT">
          Plaćanje blagajničke potvrde. (ReceiptPayment)
        </option>
        <option value="PRCP">Plaćanje cijene</option>
        <option value="SUPP">Plaćanje dobavljača</option>
        <option value="CFDI">Plaćanje dospjele glavnice</option>
        <option value="GOVT">Plaćanje države</option>
        <option value="PENS">Plaćanje mirovine</option>
        <option value="DCRD">Plaćanje na račun debitne kartice.</option>
        <option value="CCRD">Plaćanje na račun kreditne kartice</option>
        <option value="SALA">Plaćanje plaće</option>
        <option value="REBT">Plaćanje popusta/rabata</option>
        <option value="TAXS">Plaćanje poreza</option>
        <option value="VATX">Plaćanje poreza na dodatnu vrijednost</option>
        <option value="RINP">Plaćanje rata koje se ponavljaju</option>
        <option value="IHRP">Plaćanje rate pri kupnji na otplatu</option>
        <option value="IVPT">Plaćanje računa</option>
        <option value="CDBL">Plaćanje računa za kreditnu karticu</option>
        <option value="TREA">Plaćanje riznice</option>
        <option value="CMDT">Plaćanje roba</option>
        <option value="INTC">Plaćanje unutar društva</option>
        <option value="INVS">Plaćanje za fondove i vrijednosnice</option>
        <option value="PRME">Plemeniti metali</option>
        <option value="AGRT">Poljoprivredni transfer</option>
        <option value="INTX">Porez na dohodak</option>
        <option value="PTXP">Porez na imovinu</option>
        <option value="NITX">Porez na neto dohodak</option>
        <option value="ESTX">Porez na ostavštinu</option>
        <option value="GSTX">Porez na robu i usluge</option>
        <option value="HSTX">Porez na stambeni prostor</option>
        <option value="FWLV">Porez na strane radnike</option>
        <option value="WHLD">Porez po odbitku</option>
        <option value="BEXP">Poslovni troškovi</option>
        <option value="REFU">Povrat</option>
        <option value="TAXR">Povrat poreza</option>
        <option value="RIMB">Povrat prethodne pogrešne transakcije</option>
        <option value="OFEE">Početna naknada (Opening Fee)</option>
        <option value="ADVA">Predujam</option>
        <option value="INSU">Premija osiguranja</option>
        <option value="INPC">Premija osiguranja za vozilo</option>
        <option value="TRPT">Prepaid cestarina (ENC)</option>
        <option value="SUBS">Pretplata</option>
        <option value="CASH">Prijenos gotovine</option>
        <option value="PENO">Prisilna naplata</option>
        <option value="COMM">Provizija</option>
        <option value="INSM">Rata</option>
        <option value="ELEC">Račun za električnu energiju</option>
        <option value="CBTV">Račun za kabelsku TV</option>
        <option value="OTLC">Račun za ostale telekom usluge</option>
        <option value="GASB">Račun za plin</option>
        <option value="WTER">Račun za vodu</option>
        <option value="ANNI">Renta</option>
        <option value="BBSC">Rodiljna naknada</option>
        <option value="NETT">Saldiranje (netiranje)</option>
        <option value="CAFI">Skrbničke naknade (interne)</option>
        <option value="STDY">Studiranje</option>
        <option value="ROYA">Tantijeme</option>
        <option value="PHON">Telefonski račun</option>
        <option value="FERB">Trajektni</option>
        <option value="DMEQ">Trajna medicinska pomagala</option>
        <option value="WEBI">Transakcija inicirana internetom</option>
        <option value="TELI">Transakcija inicirana telefonom</option>
        <option value="HREC">
          Transakcija se odnosi na doprinos poslodavca za troškove stanovanja
        </option>
        <option value="CBFR">
          Transakcija se odnosi na kapitalnu štednju za mirovinu
        </option>
        <option value="CBFF">
          Transakcija se odnosi na kapitalnu štednju, općenito
        </option>
        <option value="TRAD">Trgovinske usluge</option>
        <option value="COST">Troškovi</option>
        <option value="CPKC">Troškovi parkiranja</option>
        <option value="TBIL">Troškovi telekomunikacija</option>
        <option value="NWCH">Troškovi za mrežu</option>
        <option value="EDUC">Troškovi školovanja</option>
        <option value="LIMA">Upravljanje likvidnošću</option>
        <option value="ACCT">Upravljanje računom</option>
        <option value="ANTS">Usluge anestezije</option>
        <option value="VIEW">Usluge oftalmološke skrbi</option>
        <option value="LTCF">Ustanova dugoročne zdravstvene skrbi</option>
        <option value="ICRF">Ustanova socijalne skrbi</option>
        <option value="CVCF">
          Ustanova za usluge skrbi za rekonvalescente
        </option>
        <option value="PTSP">Uvjeti plaćanja</option>
        <option value="MSVC">Višestruke vrste usluga</option>
        <option value="SECU">Vrijednosni papiri</option>
        <option value="LOAN">Zajam</option>
        <option value="FCPM">Zakašnjele naknade</option>
        <option value="TRFD">Zaklada</option>
        <option value="CDQC">Zamjenska gotovina</option>
        <option value="HLTI">Zdravstveno osiguranje</option>
        <option value="AIRB">Zračni</option>
        <option value="DNTS">Zubarske usluge</option>
        <option value="SAVG">Štednja</option>
        <option value="RLWY">Željeznički</option>
        <option value="LIFI">Životno osiguranje</option>
      </select>

      <textarea
        class="opis-placanja"
        type="text"
        name=""
        id=""
        v-model="paymentParams.opisPlacanja"
      ></textarea>
      <div class="last-item generated-barcode" id="barcode" ref="barcode">
        <div v-if="barcodeImage">
          <img :src="barcodeImage" alt="Generated Barcode" />
        </div>
      </div>

      <input
        type="text"
        class="iznos-desno"
        id="iznos"
        pattern="^[0-9]+,[0-9]{2}$"
        placeholder="0,00"
        maxlength="16"
        required
        v-model="paymentParams.iznosTransakcije"
        style="height: 27px; padding-top: 5px"
      />

      <input
        class="iban-primatelja-desno"
        type="text"
        id="brRacuna"
        maxlength="21"
        name=""
        required
        v-model="paymentParams.ibanPrimatelja"
        style=""
      />
      <select
        class="model-placanja-desno"
        id="modelPlacanja"
        v-model="paymentParams.modelPlacanja"
      >
        <option value="" disabled>-</option>
        <option value="HR01">HR01</option>
        <option value="HR02">HR02</option>
        <option value="HR03">HR03</option>
        <option value="HR04">HR04</option>
        <option value="HR05">HR05</option>
        <option value="HR06">HR06</option>
        <option value="HR07">HR07</option>
        <option value="HR08">HR08</option>
        <option value="HR09">HR09</option>
        <option value="HR10">HR10</option>
        <option value="HR11">HR11</option>
        <option value="HR12">HR12</option>
        <option value="HR13">HR13</option>
        <option value="HR14">HR14</option>
        <option value="HR15">HR15</option>
        <option value="HR16">HR16</option>
        <option value="HR17">HR17</option>
        <option value="HR18">HR18</option>
        <option value="HR23">HR23</option>
        <option value="HR24">HR24</option>
        <option value="HR26">HR26</option>
        <option value="HR27">HR27</option>
        <option value="HR28">HR28</option>
        <option value="HR29">HR29</option>
        <option value="HR30">HR30</option>
        <option value="HR31">HR31</option>
        <option value="HR33">HR33</option>
        <option value="HR34">HR34</option>
        <option value="HR40">HR40</option>
        <option value="HR41">HR41</option>
        <option value="HR42">HR42</option>
        <option value="HR43">HR43</option>
        <option value="HR55">HR55</option>
        <option value="HR62">HR62</option>
        <option value="HR63">HR63</option>
        <option value="HR64">HR64</option>
        <option value="HR65">HR65</option>
        <option value="HR67">HR67</option>
        <option value="HR68">HR68</option>
        <option value="HR69">HR69</option>
        <option value="HR99">HR99</option>
        <option value="HR25">HR25</option>
        <option value="HR83">HR83</option>
        <option value="HR84">HR84</option>
        <option value="HR50">HR50</option>
      </select>

      <input
        class="poziv-na-broj-primatelja-desno"
        type="text"
        id="pozivNaBroj"
        maxlength="22"
        v-model="paymentParams.pozivNaBroj"
        style="padding-bottom: 10px; height: 33px"
      />

      <textarea
        class="opis-placanja-desno"
        type="text"
        name=""
        id=""
        v-model="paymentParams.opisPlacanja"
      ></textarea>
    </div>

    <div class="func-buttons">
      <button @click="generateBarcode" class="btn-black">
        Generiraj Barkod
      </button>
      <button @click="generatePDF" class="btn-black btn-preuzmi">
        Preuzmi Uplatnicu
      </button>

      <button
        @click="generatePDFAndSendEmail(this.receiverEmail)"
        class="btn-black btn-preuzmi"
      >
        Pošalji uplatnicu
      </button>
    </div>
  </div>
</template>

<script>
import generateBarcode from "pdf417";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      //INFORMACIJE ZA GENERIRANJE BARKODA
      user: [],
      text: "",
      blockWidth: 2,
      blockHeight: 1,
      barcodeImage: null,
      receiverEmail: null,
      subject: "",
      message: "",
      emailTemplate: 3, // Handle null values
      gmailKey: "", // Handle null values
      e_mail: "", // Handle null values
      filename: "",
      dataChanged: false,

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

      organizacijaData: [],
      activeOrganization: [],
      inactiveOrganization: [],
    };
  },
  components: {},

  created() {
    this.adjustPaymentParams();
  },
  watch: {
    userData: {
      immediate: true,
      handler() {
        this.adjustPaymentParams();
      },
    },
  },

  mounted() {
    this.fetchData();
    this.fetchPostavkeData();
  },
  methods: {
    resetUserData() {
      this.$store.dispatch("resetUserData");
    },

    getPaymentParams() {
      return this.paymentParams;
    },

    async adjustPaymentParams() {
      if (this.userData) {
        this.paymentParams.imePlatitelja = this.userData.ime_prezime;
        this.paymentParams.adresaPlatitelja = this.userData.ulica;
        this.paymentParams.postanskiBrojIMjestoPlatitelja = this.userData.grad;
        this.paymentParams.iznosTransakcije = this.userData.iznos;
        this.paymentParams.pozivNaBroj = this.userData.poziv_na_primatelja;
        this.paymentParams.opisPlacanja = this.userData.opis_placanja;
        this.receiverEmail = this.userData.e_mail;

        // Ensure the view updates before generating the barcode
        await this.$nextTick();
        setTimeout(() => {
          this.generateBarcode();
        }, 100);
      }
    },

    generatePDF() {
      const element = this.$refs.izvozUplatnice; // Replace with your element ID
      const options = {
        filename: this.paymentParams.imePlatitelja + ".pdf",
        image: { type: "png", quality: 1.0 }, // Image options (if needed)
        html2canvas: { scale: 1 }, // html2canvas options (if needed)
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // jsPDF options (if needed)
      };

      html2pdf().from(element).set(options).save();
    },
    async generatePDFAndSendEmail(email) {
      // Wait for Vue to finish rendering the DOM
      await this.$nextTick();

      const barcodeElement = this.$refs.barcode;
      const logoOrganization = document.getElementById("logo-org");
      // Extract HTML content
      let imePrimatelja = this.paymentParams.imePrimatelja;
      let imePlatitelja = this.paymentParams.imePlatitelja;
      let adresaPlatitelja = this.paymentParams.adresaPlatitelja;
      let adresaPrimatelja = this.paymentParams.adresaPrimatelja;
      let iznosTransakcije = this.paymentParams.iznosTransakcije;
      let postanskiBrojIMjestoPrimatelja =
        this.paymentParams.postanskiBrojIMjestoPrimatelja;
      let postanskiBrojIMjestoPlatitelja =
        this.paymentParams.postanskiBrojIMjestoPlatitelja;
      let ibanPrimatelja = this.paymentParams.ibanPrimatelja;
      let modelPlacanja = this.paymentParams.modelPlacanja;
      let pozivNaBroj = this.paymentParams.pozivNaBroj;
      let sifraNamjene = this.paymentParams.sifraNamjene;
      let opisPlacanja = this.paymentParams.opisPlacanja;

      if (!email) {
        const confirmSend = confirm(
          `Za korisnika ${imePlatitelja} nema unesene Email adrese. Ako želite poslati uplatnicu unesite mail.`
        );
        if (!confirmSend) {
          return; // Return from the method if the user chooses not to send the email
        } else {
          // Prompt the user to enter an email address
          email = prompt(`Unseite Email za korisnika ${imePlatitelja}`);
          if (!email) {
            return; // Return from the method if the user cancels the prompt
          }
        }
      }

      const htmlContent = `
      <table width="400" style="border: 2px solid #002D62; padding: 20px; background-color: #F4F4F4; margin: auto; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr style="margin-bottom: 20px;">
          <th width="100" align="left" style="vertical-align: middle;">
            <div style="padding: 10px;">
              ${logoOrganization.outerHTML}
            </div>
          </th>
          <th align="left" width="300">
            <div style="color: #002D62;">
              <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${imePrimatelja}</p>
              <p style="font-size: 14px; margin-bottom: 5px;">${adresaPrimatelja}, ${postanskiBrojIMjestoPrimatelja}</p>
              <p style="font-size: 14px; margin-bottom: 5px;">IBAN: ${ibanPrimatelja}</p>
            </div>
          </th>
        </tr>

        <tr>
          <td colspan="2">
            <div style="padding: 10px;">
              <h2 style="font-size: 14px; margin-bottom: 10px;color: #002D62;"><b>DETALJI PLAĆANJA</b> </h2>
              <hr style="border-color: #002D62; margin: 20px 0;">
              <p style="font-size: 14px; margin-bottom: 10px;"><b>IME I PREZIME:</b> ${imePlatitelja}</p>
              <p style="font-size: 14px; margin-bottom: 10px;"><b>ADRESA:</b> ${adresaPlatitelja}, ${postanskiBrojIMjestoPlatitelja}</p>
              <p style="font-size: 14px; margin-bottom: 10px;"><b>ŠIFRA NAMJENE:</b> ${sifraNamjene}</p>
              <p style="font-size: 14px; margin-bottom: 10px;"><b>MODEL I POZIV NA BROJ:</b> ${modelPlacanja}${pozivNaBroj}</p>
              <p style="font-size: 14px; margin-bottom: 10px;"><b>OPIS PLAĆANJA:</b> ${opisPlacanja}</p>
              <p style="font-size: 14px; margin-bottom: 10px;"><b>IZNOS ZA PLATITI:</b> ${iznosTransakcije} EUR</p>
              <hr style="border-color: #002D62; margin: 20px 0;">
              <div style="margin-top: 20px;">
                ${barcodeElement.outerHTML}
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td colspan="2" style="font-size: 14px; color: #002D62; padding: 10px;">Automatski generirana uplatnica! Molimo Vas provjerite sve podatke.</td>
        </tr>
      </table>
      `;

      // Prepare data to send via email
      const emailData = {
        email: email, // Replace with recipient's email address
        htmlContent: htmlContent,
      };

      // Send data to server for PDF generation and email sending
      fetch("http://localhost:8081/send-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Email poslan uspješno!");
          } else {
            alert("Greška prilikom slanja maila");
          }
        })
        .catch((error) => {
          alert("Greška u slanju maila.", error);
        });
    },

    generateBarcode() {
      this.text = this.concatenateStrings();

      if (this.text) {
        this.barcodeImage = generateBarcode(
          this.text,
          this.blockWidth,
          this.blockHeight
        );
      } else {
        alert("ERROR");
      }
    },
    concatenateStrings() {
      const concatenatedValues = Object.values(this.paymentParams)
        .map((value) => `${value}\n`)
        .join("");
      return concatenatedValues;
    },
    fetchPostavkeData() {
      axios
        .get("http://localhost:8081/postavke")
        .then((response) => {
          const postavkeData = response.data.data; // Assuming the data key holds the postavke data

          // Assuming this is inside your Vue component
          this.subject = postavkeData[0].subject; // Handle null values
          this.message = postavkeData[0].message; // Handle null values
          this.emailTemplate = postavkeData[0].e_mail_template; // Handle null values
          this.gmailKey = postavkeData[0].gmail_key; // Handle null values
          this.e_mail = postavkeData[0].e_mail; // Handle null values
          this.filename = postavkeData[0].filename; // Handle null values

          // Log or perform any additional actions as needed
        })
        .catch((error) => {
          alert(error);
        });
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
        })
        .catch((error) => {
          alert("Error fetching data:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style scoped lang="less">
.payment-slip-container {
  background: white;
  padding: 50px 0;
  .above-info {
    max-width: 500px;
    margin: auto;
  }
}
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

@media print {
  .btn-black {
    visibility: hidden;
  }
  aside {
    visibility: hidden;
  }
}
</style>
