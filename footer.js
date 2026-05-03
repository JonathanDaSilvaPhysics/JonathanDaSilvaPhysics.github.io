const lastUpdate = new Date("2026-05-03");
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
const email = "jonathan.da.silva.physics@gmail.com";

// Display contact section:
const contactEl = document.getElementById("footer-contact");
if (contactEl) {
    contactEl.innerHTML = `
    <h2>Contact</h2>
    <p>Jonathan Da Silva <br>31 770 Colomiers, France <br>
       ${translatedTerms.email} <a href="mailto:${email}">${email}</a>
    </p>
    <p><span class="end">${translatedTerms.lastUpdate} ${formattedDate}</span></p>
`;
}

// Display picture section:
const pictureEl = document.getElementById("footer-picture");
if (pictureEl) {
pictureEl.innerHTML = `
    <div class="picture__block">
      <h2>
        <a href="map.html?lang=${lang}" title="${translatedTerms.mapTitle}" target="_blank">
          ${translatedTerms.galleryTitle}
        </a>
      </h2>
      <div id="random-picture"></div>
    </div>
`;
}

fetch("pictures.json") // python3 -m http.server 8000
    .then(res => res.json())
    .then(pictures => {
        const container = document.getElementById("random-picture");
        if (!container) return;
        startPictureRotation(pictures, lang, container);
    });

function startPictureRotation(pictures, lang, container) {
    let current = getRandomPicture(pictures);
    renderPicture(current, lang, container);

    setInterval(async () => {
        const next = getRandomPicture(pictures);

        container.classList.add("fade");

        await waitForTransition(container);

        const img = await preloadImage(next.id);
        renderPicture(next, lang, container, img);

        requestAnimationFrame(() => {
            container.classList.remove("fade");
        });

        // refresh every 30sec
    }, 30000);
}

function renderPicture(pic, lang, container, img = null) {

    const text = pic.description[lang] || pic.description.en;
    const className = pic.isLarge ? "picture--large" : "picture";

    const imageHTML = img
        ? ""
        : `<img src="${getImagePath(pic.id)}" alt="${text}">`;

    const imageElement = img || null;

    container.innerHTML = `
        <div class="${className}">
            ${imageHTML}
            <div class="caption">
                <a href="https://maps.google.com/maps?f=q&hl=${lang}&q=${pic.coordinates[0]},${pic.coordinates[1]}"
                   target="_blank" rel="noopener noreferrer">
                    ${text}
                </a>
            </div>
        </div>
    `;

    const wrapper = container.firstElementChild;

    if (imageElement) {
        imageElement.alt = text;
        wrapper.prepend(imageElement);
    }
}

function preloadImage(picId) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = getImagePath(picId);
        img.onload = () => resolve(img);
    });
}

function getRandomPicture(pictures) {
    if (!pictures?.length) return null;
    const i = Math.floor(Math.random() * pictures.length);
    return pictures[i];
}

function getImagePath(picId) {
    return `images/RandPic/picture_${picId}.webp`;
}

function waitForTransition(el) {
    return new Promise(resolve => {
        const onEnd = () => {
            el.removeEventListener("transitionend", onEnd);
            resolve();
        };
        el.addEventListener("transitionend", onEnd);
    });
}
