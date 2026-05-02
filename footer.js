const lastUpdate = new Date("2026-05-02");
const lang = ["fr", "en"].includes(document.documentElement.lang)
    ? document.documentElement.lang
    : "en";
const formattedDate = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric"
}).format(lastUpdate);

const i18nData = window.i18n;
const translatedTerms = i18nData?.[lang] || i18nData.en;

// Display contact section :
const footer = document.getElementById("footer-content");
if (footer) {
    footer.innerHTML = `
    <h2>Contact</h2>
    <p>Jonathan Da Silva <br>31 770 Colomiers, France <br>
       ${translatedTerms.email} <a href="mailto:jonathan.da.silva.physics@gmail.com">jonathan.da.silva.physics@gmail.com</a>
    </p>
    <p><span class="end">${translatedTerms.lastUpdate} ${formattedDate}</span></p>
`;
}

// Display randomly a picture :
fetch("pictures.json") // python3 -m http.server 8000
    .then(res => res.json())
    .then(pictures => {
        getRandomPicture(pictures, lang);
    });

function getRandomPicture(pictures, lang) {
    if (!pictures?.length) return;
    const i = Math.floor(Math.random() * pictures.length);
    const pic = pictures[i];

    const container = document.getElementById("random-picture");

    container.insertAdjacentHTML("beforeend", `
    <div class="${pic.isLarge ? "picture__block--large" : "picture__block"}">
      <h2>
        <a href="map.html?lang=${lang}" title="${translatedTerms.mapTitle}" target="_blank">
          ${translatedTerms.galleryTitle}
        </a>
      </h2>
      <div class="${pic.isLarge ? "picture--large" : "picture"}"
           style="background:url(images/RandPic/picture_${pic.id}.webp) center / cover no-repeat;">
        <div class="caption">
          <a href="https://maps.google.com/maps?f=q&hl=${lang}&q=${pic.coordinates[0]},${pic.coordinates[1]}" target="_blank" rel="noopener noreferrer">
            ${pic.description[lang] || pic.description.en}
          </a>
        </div>
      </div>
    </div>
  `);
}
