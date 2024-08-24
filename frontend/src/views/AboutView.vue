<template>
  <div class="slider-thumb">
    <nav>
      <router-link to="/barcode-generator">Barkod</router-link>

      <router-link to="/receiver">Primatelji</router-link>

      <router-link to="/statistics">Statistika</router-link>
      <router-link to="/organization">Organizacije</router-link>
      <router-link to="/about">O nama</router-link>

      <div class="animation start-home"></div>
    </nav>
    <div class="bubble">
      <svg
        width="266"
        height="266"
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
    </div>

    <div class="tutorial-desc">
      <h2>Bilify: Vaš Brz i Jednostavan Put do Personaliziranih Uplatnica</h2>
      <p>
        Pojednostavite proces izdavanja uplatnica uz Bilify – idealno rješenje
        za male poduzetnike, udruge i sve koji trebaju profesionalne uplatnice s
        minimalnim trudom. Pratite naš vodič i saznajte kako u nekoliko koraka
        generirati uplatnice prilagođene vašim potrebama.
      </p>
    </div>

    <div class="step-1">
      <h3>Skinite Excell ili XML file koji možete uređivati</h3>

      <div class="files">
        <a
          class="btn-black"
          href="../assets/files/template.xml"
          download="template.xml"
          >Preuzmi XML</a
        >
        <br />
        <a
          class="btn-black"
          href="../assets/files/template.xlsx"
          download="template.xlsx"
          >Preuzmi Excel</a
        >
      </div>
      <div>
        <h1>
          Upute: Kako izvesti podatke iz Excela u XML ili mijenjati XML datoteku
        </h1>
        <br />
        <section>
          <h2>Izvoz podataka iz Excela u XML</h2>
          <ol>
            <li>
              Otvorite Excel datoteku koja sadrži podatke koje želite izvesti.
            </li>
            <li>
              Desnim klikom na tablicu u Excelu otvorite kontekstni izbornik.
            </li>
            <li>
              Odaberite opciju <strong>Izvoz</strong> ili
              <strong>Spremi kao XML</strong>.
            </li>
            <li>
              Odaberite lokaciju na svom računalu gdje želite spremiti XML
              datoteku i kliknite na <strong>Spremi</strong>.
            </li>
          </ol>
          <img
            src="../assets/images/example-1.jpg"
            alt="Excel Export"
            class="image"
          />
        </section>
        <br />
        <section>
          <h2>Ručna izmjena XML datoteke</h2>
          <br />
          <ol>
            <li>Pronađite XML datoteku koju želite promijeniti.</li>
            <li>
              Desnim klikom na datoteku odaberite <strong>Otvori s</strong> i
              odaberite <strong>Notepad</strong> ili neki drugi tekstualni
              editor.
            </li>
            <li>
              Nakon otvaranja datoteke, izmijenite željene podatke unutar XML
              oznaka.
            </li>
            <li>
              Spremite promjene klikom na <strong>File &gt; Save</strong> ili
              pritisnite <strong>Ctrl + S</strong>.
            </li>
          </ol>
        </section>
      </div>
    </div>
    <br />
    <br />
    <div class="step-2">
      <h2>Postavljanje Gmail Lozinke za Aplikaciju</h2>
      <p>
        Slijedite korake u nastavku kako biste omogućili dvofaktorsku
        autentifikaciju (2FA) i generirali lozinku za aplikaciju.
      </p>

      <h3>Korak 1: Omogućite dvofaktorsku autentifikaciju (2FA)</h3>
      <ol>
        <li>
          <strong>Prijavite se na svoj Google račun:</strong>
          <a
            class="btn-black"
            href="https://myaccount.google.com"
            target="_blank"
            >GOOGLE</a
          >
          i prijavite se.
        </li>
        <li>
          <strong>Otvorite postavke sigurnosti:</strong> Kliknite na
          <em>"Security" (Sigurnost)</em> u lijevom izborniku.
        </li>
        <li>
          <strong>Omogućite dvofaktorsku autentifikaciju:</strong> Pronađite
          sekciju <em>"Signing in to Google" (Prijava na Google)</em> i kliknite
          na <em>"2-Step Verification" (Dvofaktorska autentifikacija)</em>.
          Slijedite upute za postavljanje 2FA. Možete koristiti SMS,
          autentifikacijsku aplikaciju ili sigurnosni ključ.
        </li>
      </ol>

      <h3>Korak 2: Generirajte lozinku za aplikaciju</h3>
      <ol>
        <li>
          <strong>Idite na postavke sigurnosti:</strong> Ponovno otvorite
          <a
            class="btn-black"
            href="https://myaccount.google.com"
            target="_blank"
            >GOOGLE</a
          >
          i idite na <em>"Security" (Sigurnost)</em>.
        </li>
        <li>
          <strong>Pronađite "App passwords" (Lozinke za aplikacije):</strong> U
          sekciji <em>"Signing in to Google" (Prijava na Google)</em>, nakon što
          ste omogućili 2FA, pojavit će se opcija <em>"App passwords"</em>.
        </li>
        <li>
          <strong>Generirajte lozinku za aplikaciju:</strong>
          <ul>
            <li>Kliknite na <em>"App passwords"</em>.</li>
            <li>Možda ćete morati ponovno unijeti lozinku svog računa.</li>
            <li>
              Na stranici
              <em>"Select app and device" (Odaberite aplikaciju i uređaj)</em>,
              odaberite aplikaciju (npr. <em>"Mail"</em>) i uređaj (npr.
              <em>"Windows Computer"</em>).
            </li>
            <li>Kliknite na <em>"Generate" (Generiraj)</em>.</li>
          </ul>
        </li>
        <li>
          <strong>Dohvatite lozinku:</strong> Google će generirati lozinku od 16
          znakova. Zapišite ili kopirajte ovu lozinku — trebat će vam za
          konfiguraciju vašeg e-mail klijenta.
        </li>
      </ol>
    </div>

    <div class="video">
      <h2>Podledajte video na koji način koristiti Bilify</h2>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/peFxjsStzwg?si=oVUKerrXgzg5ndAH"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="less" scoped>
.video {
  display: flex;
  flex-direction: column;
  padding: 50px 10px;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 50px;
  h2 {
    color: white;
  }
}

.step-1,
.step-2 {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  background: white;
  max-width: 1100px;
  width: 98%;
  margin: 50px auto;
  border-radius: 20px;
  h3 {
    color: #525a5b;
    font-size: 32px;
  }
  li {
    text-align: left;
  }
  ol {
    margin: 20px auto;
    max-width: 75%;
    @media (max-width: 1340px) {
      max-width: 90%;
    }
  }
  a {
    color: white;
    display: flex;
    width: 550px;
    flex: 1;
    padding: 5px 20px;
    margin: 20px 0;
  }
  img {
    width: 100%;
    margin: 50px 0;
    max-width: 500px;
  }
  .files {
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 25px;
    width: 100%;
  }
}

.slider-thumb {
  height: 100vh;
  background: linear-gradient(90deg, #000000, #ff8a00);
  padding: 50px 10px;
  @media (max-width: 600px) {
    padding: 0 10px;
  }
}

.bubble {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
  border: 5px white solid;
  margin: 50px auto;
  width: 450px;
  height: 450px;
  background: #354344;
  border-radius: 62% 47% 82% 35% / 45% 45% 80% 66%;
  will-change: border-radius, transform, opacity;
  animation: sliderShape 5s linear infinite;
  z-index: -1;
  -webkit-animation: sliderShape 5s linear infinite;
  @media (max-width: 600px) {
    width: 80%;
    height: unset;
  }
  svg {
    @media (max-width: 600px) {
      width: 130px;
    }
  }
}
@keyframes sliderShape {
  0%,
  100% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  34% {
    border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
    transform: translate3d(0, 5px, 0) rotateZ(0.01deg);
  }
  50% {
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
    transform: translate3d(0, -3px, 0) rotateZ(0.01deg);
  }
}

nav {
  margin: 27px auto 0;

  position: relative;
  width: 590px;
  height: 50px;
  background-color: #354344;
  border-radius: 8px;
  font-size: 0;
  @media (max-width: 600px) {
    width: 100%;
    height: fit-content;
  }
}
nav a {
  line-height: 50px;
  height: 100%;
  font-size: 15px;
  display: inline-block;
  position: relative;
  z-index: 1;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: white;
  cursor: pointer;
}
nav .animation {
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 0;
  transition: all 0.5s ease 0s;
  border-radius: 8px;
}
a:nth-child(1) {
  width: 100px;
}
a:nth-child(2) {
  width: 110px;
}
a:nth-child(3) {
  width: 100px;
}
a:nth-child(4) {
  width: 160px;
}
a:nth-child(5) {
  width: 120px;
}
nav .start-home,
a:nth-child(1):hover ~ .animation {
  width: 100px;
  left: 0;
  background-color: #1abc9c;

  @media (max-width: 600px) {
    width: 0;
  }
}
nav .start-about,
a:nth-child(2):hover ~ .animation {
  width: 110px;
  left: 100px;
  background-color: #e74c3c;
}
nav .start-blog,
a:nth-child(3):hover ~ .animation {
  width: 100px;
  left: 210px;
  background-color: #3498db;
}
nav .start-portefolio,
a:nth-child(4):hover ~ .animation {
  width: 160px;
  left: 310px;
  background-color: #9b59b6;
}
nav .start-contact,
a:nth-child(5):hover ~ .animation {
  width: 120px;
  left: 470px;
  background-color: #e67e22;
}

p {
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: #ecf0f1;
  font-family: "Cherry Swash", cursive;
  font-size: 16px;
}

span {
  color: #2bd6b4;
}

.tutorial-desc {
  display: flex;
  flex-direction: column;
  gap: 35px;
  max-width: 1100px;
  margin: 0 auto;

  h2 {
    margin-top: 50px;
    color: #db9f58;
    font-size: 40px;
    font-weight: 500;
  }
  p {
    color: white;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
