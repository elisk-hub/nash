// Importera alla nasheeds från mappen
import talaAlBadru from './nasheed/tala-al-badru.js';
import qadKafani from './nasheed/qad-kafani.js';
import dhulHijjah from './nasheed/dhul-hijjah.js';

// Samla all data i en array
const nasheedData = [talaAlBadru, qadKafani, dhulHijjah];

let arabicSize = 30;
let textSize = 16;

function initApp() {
  const listContainer = document.getElementById('nasheedList');
  if (!listContainer) return;
  
  listContainer.innerHTML = '';

  nasheedData.forEach((nasheed, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => openReader(index);

    card.innerHTML = `
      <div class="card-ar">${nasheed.titleAr}</div>
      <div class="card-en">${nasheed.titleEn}</div>
    `;
    listContainer.appendChild(card);
  });
}

function openReader(index) {
  const nasheed = nasheedData[index];
  document.getElementById('readerTitle').innerText = nasheed.shortTitle;

  let contentHtml = `
    <div class="heading">
      <div class="heading-ar">${nasheed.titleAr}</div>
      <div class="heading-en">${nasheed.titleEn.toUpperCase()}</div>
      <div class="info">${nasheed.info}</div>
    </div>
  `;

  nasheed.verses.forEach(item => {
    if (item.type === 'chorus') {
      contentHtml += `
        <div class="chorus">
          <div class="chorus-label">${item.label}</div>
          <div class="ar">${item.ar}</div>
          ${item.tl ? `<div class="tl">${item.tl}</div>` : ''}
          ${item.en ? `<div class="en">${item.en}</div>` : ''}
        </div>
      `;
    } else {
      contentHtml += `
        <div class="verse">
          <div class="verse-number">${item.number}</div>
          <div class="ar">${item.ar}</div>
          ${item.tl ? `<div class="tl">${item.tl}</div>` : ''}
          ${item.en ? `<div class="en">${item.en}</div>` : ''}
        </div>
      `;
    }
  });

  document.getElementById('content').innerHTML = contentHtml;
  applySizes();
  document.getElementById('reader').classList.add('show');
}

function goBack() {
  document.getElementById('reader').classList.remove('show');
}

function toggleNight() {
  document.getElementById('reader').classList.toggle('night');
}

function changeSize(change) {
  arabicSize += change;
  textSize += change * 0.5;
  applySizes();
}

function applySizes() {
  document.querySelectorAll('.ar').forEach(el => el.style.fontSize = arabicSize + 'px');
  document.querySelectorAll('.tl').forEach(el => el.style.fontSize = textSize + 'px');
  document.querySelectorAll('.en').forEach(el => el.style.fontSize = textSize + 'px');
}

// Gör funktionerna tillgängliga för HTML (eftersom ES-moduler har egen "scope")
window.goBack = goBack;
window.toggleNight = toggleNight;
window.changeSize = changeSize;

// Starta appen
initApp();