document.addEventListener("DOMContentLoaded", async () => {

const lastUpdate = new Date("2026-04-27");
console.log('document.documentElement.lang');
console.log(document.documentElement.lang);
const lang = document.documentElement.lang || "en";
const formattedDate = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric"
}).format(lastUpdate);

const translatedTerms = i18n[lang] || i18n.en;

// Display contact section :

const footer = document.getElementById("footer-content");

footer.innerHTML = `
    <h2>Contact</h2>
    <p>Jonathan Da Silva <br />31 770 Colomiers, France <br />
       ${translatedTerms.email} <a href="mailto:jonathan.da.silva.physics@gmail.com">jonathan.da.silva.physics@gmail.com</a>
    </p>
    <p><span class="end">${translatedTerms.lastUpdate} ${formattedDate}</span></p>
    <p>
        <a style='border-bottom:none' href="http://validator.w3.org/check?uri=jonathandasilvaphysics.github.io">
            <img style='border:0;width:39px;height:34px' title='HTML5 validation' src="images/html5-logo.png" alt="HTML5 validation">
        </a>
        <a style='border-bottom:none' href="http://jigsaw.w3.org/css-validator/validator?uri=jonathandasilvaphysics.github.io">
            <img style='border:0;width:37px;height:34px' title='CSS3 validation' src="images/css3-logo.png" alt="CSS3 validation">
        </a>
    </p>
`;

// Display randomly a picture :

fetch("pictures.json") // python3 -m http.server 8000
    .then(res => res.json())
    .then(pictures => {
        getRandomPicture(pictures, lang);
    });

function getRandomPicture(pictures, lang) {
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
           style="background:url(images/RandPic/picture_${pic.id}.jpg) no-repeat center;">
        <div class="caption">
          <a href="https://maps.google.${translatedTerms.googleMapTld}/maps?f=q&hl=${lang}&q=${pic.coordinates[0]},${pic.coordinates[1]}" target="_blank" rel="noopener noreferrer">
            ${pic.description[lang] || pic.description.en}
          </a>
        </div>
      </div>
    </div>
  `);
}
})

