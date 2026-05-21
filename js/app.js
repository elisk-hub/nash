// Importera alla nasheeds
import talaAlBadru from './nasheed/tala-al-badru.js';
import qadKafani from './nasheed/qad-kafani.js';
import assalamuAleyk from './nasheed/assalamu-aleyk.js';
import salamAlaQabrin from './nasheed/salamun-ala-qabrin.js';
import qamarun from './nasheed/qamarun.js';
import innaFilJannati from './nasheed/inna-fil-jannati.js';
import asmaAlHusnaKiraya from './nasheed/asma-al-husna-kiraya.js';
import bushraLana from './nasheed/bushra-lana.js';
import mahbubiBilWisal from './nasheed/mahbubi-bil-wisal.js';
import salawatunTayyibatun from './nasheed/salawatun-tayyibatun.js';
import talamaAshkuGharami from './nasheed/talama-ashku-gharami.js';
import yaImamaRusli from './nasheed/ya-imama-rusli.js';
import salatAlBadariyyah from './nasheed/salat-al-badariyyah.js';

const nasheedData = [asmaAlHusnaKiraya, assalamuAleyk, bushraLana, innaFilJannati, mahbubiBilWisal, qadKafani, qamarun, salamAlaQabrin, salatAlBadariyyah, salawatunTayyibatun, talaAlBadru, talamaAshkuGharami, yaImamaRusli];

let arabicSize = 30;
let textSize = 16;
let state = { tl: true, en: true };

document.addEventListener('DOMContentLoaded', () => {
    // Koppla knappar här istället för onclick i HTML
    document.getElementById('toggle-tl').addEventListener('click', () => toggleVisibility('tl'));
    document.getElementById('toggle-en').addEventListener('click', () => toggleVisibility('en'));
    initApp();
});

function initApp() {
    const listContainer = document.getElementById('nasheedList');
    if (!listContainer) return;
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
}

function toggleVisibility(type) {
    state[type] = !state[type];
    document.querySelectorAll('.' + type).forEach(el => el.classList.toggle('hidden', !state[type]));
    updateButtonStyles();
}

function updateButtonStyles() {
    document.getElementById('toggle-tl').classList.toggle('active', state.tl);
    document.getElementById('toggle-en').classList.toggle('active', state.en);
}

// Globala helpers
window.goBack = () => document.getElementById('reader').classList.remove('show');
window.toggleNight = () => document.getElementById('reader').classList.toggle('night');
window.changeSize = (change) => { arabicSize += change; textSize += change * 0.5; applySizes(); };

function applySizes() {
    document.querySelectorAll('.ar').forEach(el => el.style.fontSize = arabicSize + 'px');
    document.querySelectorAll('.tl, .en').forEach(el => el.style.fontSize = textSize + 'px');
}