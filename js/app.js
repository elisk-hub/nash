import antaFina from './nasheed/anta-fina.js';
import asmaAlHusnaKiraya from './nasheed/asma-al-husna-kiraya.js';
import assalamuAleyk from './nasheed/assalamu-aleyk.js';
import burdaDua from './nasheed/burdah-10.js';
import bushraLana from './nasheed/bushra-lana.js';
import innaFilJannati from './nasheed/inna-fil-jannati.js';
import mahbubiBilWisal from './nasheed/mahbubi-bil-wisal.js';
import qasidaMuhammadiya from './nasheed/muhammadiya.js';
import qadKafani from './nasheed/qad-kafani.js';
import qamarun from './nasheed/qamarun.js';
import salamAlaQabrin from './nasheed/salamun-ala-qabrin.js';
import salatAlBadariyyah from './nasheed/salat-al-badariyyah.js';
import salawatunTayyibatun from './nasheed/salawatun-tayyibatun.js';
import sallallahuAlaMuhammad from './nasheed/sallalahu-ala-muhammad.js';
import talaAlBadru from './nasheed/tala-al-badru.js';
import talamaAshkuGharami from './nasheed/talama-ashku-gharami.js';
import yaImamaRusli from './nasheed/ya-imama-rusli.js';

const nasheedData = [antaFina, asmaAlHusnaKiraya, assalamuAleyk, burdaDua, bushraLana, innaFilJannati, mahbubiBilWisal, qasidaMuhammadiya, qadKafani, qamarun, salamAlaQabrin, salatAlBadariyyah, salawatunTayyibatun, sallallahuAlaMuhammad, talaAlBadru, talamaAshkuGharami, yaImamaRusli];

let arabicSize = 30;
let textSize = 16;
let state = { tl: true, en: true };

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toggle-tl').addEventListener('click', () => toggleVisibility('tl'));
    document.getElementById('toggle-en').addEventListener('click', () => toggleVisibility('en'));
    initApp();
});

function initApp() {
    const listContainer = document.getElementById('nasheedList');
    listContainer.innerHTML = '';
    nasheedData.forEach((nasheed, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openReader(index);
        card.innerHTML = `<div class="card-num">${index + 1}</div><div class="card-titles"><div class="card-ar">${nasheed.titleAr}</div><div class="card-en">${nasheed.titleEn}</div></div>`;
        listContainer.appendChild(card);
    });
}

function openReader(index) {
    const nasheed = nasheedData[index];
    document.getElementById('readerTitle').innerText = nasheed.shortTitle;
    let contentHtml = `<div class="heading"><div class="heading-ar">${nasheed.titleAr}</div><div class="heading-en">${nasheed.titleEn.toUpperCase()}</div><div class="info">${nasheed.info}</div></div>`;
    
    nasheed.verses.forEach(item => {
        contentHtml += `
            <div class="${item.type === 'chorus' ? 'chorus' : 'verse'}">
                ${item.type === 'chorus' ? `<div class="chorus-label">${item.label || 'CHORUS'}</div>` : `<div class="verse-number">${item.number}</div>`}
                <div class="ar">${item.ar}</div>
                ${item.tl ? `<div class="tl ${state.tl ? '' : 'hidden'}">${item.tl}</div>` : ''}
                ${item.en ? `<div class="en ${state.en ? '' : 'hidden'}">${item.en}</div>` : ''}
            </div>`;
    });
    
    document.getElementById('content').innerHTML = contentHtml;
    applySizes();
    updateButtonStyles();
    document.getElementById('reader').classList.add('show');
    
    // Historik-logik
    window.history.pushState({ page: 'reader' }, 'Nasheed', '#reader');
}

window.onpopstate = () => {
    document.getElementById('reader').classList.remove('show');
};

window.goBack = () => {
    window.history.back();
};

window.toggleNight = () => document.getElementById('reader').classList.toggle('night');
window.changeSize = (change) => { arabicSize += change; textSize += change * 0.5; applySizes(); };

function toggleVisibility(type) {
    state[type] = !state[type];
    document.querySelectorAll('.' + type).forEach(el => el.classList.toggle('hidden', !state[type]));
    updateButtonStyles();
}

function updateButtonStyles() {
    document.getElementById('toggle-tl').classList.toggle('active', state.tl);
    document.getElementById('toggle-en').classList.toggle('active', state.en);
}

function applySizes() {
    document.querySelectorAll('.ar').forEach(el => el.style.fontSize = arabicSize + 'px');
    document.querySelectorAll('.tl, .en').forEach(el => el.style.fontSize = textSize + 'px');
}