// State
let currentNodeId = 'start';
let currentLanguage = 'de';
let storyData = null;

// DOM Elements
const appDiv = document.querySelector('#app');
const btnDe = document.querySelector('#btn-de');
const btnEn = document.querySelector('#btn-en');

// Language Switch Event Listeners
btnDe.addEventListener('click', () => setLanguage('de'));
btnEn.addEventListener('click', () => setLanguage('en'));

function setLanguage(lang) {
  currentLanguage = lang;
  
  // Update header UI
  btnDe.classList.toggle('active', lang === 'de');
  btnEn.classList.toggle('active', lang === 'en');
  
  // Update `html lang` attribute for accessibility
  document.documentElement.lang = lang;
  
  // Re-render
  renderNode(currentNodeId);
}

function handleChoice(nextNodeId) {
  currentNodeId = nextNodeId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderNode(currentNodeId);
}

function renderNode(nodeId) {
  const node = storyData[nodeId];
  if (!node) {
    console.error(`Node not found: ${nodeId}`);
    return;
  }

  const content = node[currentLanguage];
  
  // Create HTML structure
  let html = `<div class="story-container">`;
  
  if (node.image) {
    html += `<img src="${node.image}" alt="${content.title}" class="story-image" />`;
  }
  
  html += `
    <div class="story-content">
      <h2 class="story-title">${content.title}</h2>
      <p class="story-text">${content.text}</p>
      <div class="choices-container">
  `;

  content.choices.forEach(choice => {
    // Generate safe ID for aria
    const safeNext = choice.next.replace(/[^a-zA-Z0-9]/g, '');
    html += `
        <button class="choice-btn" data-next="${choice.next}" aria-label="${choice.text}">
          ${choice.text}
        </button>
    `;
  });

  html += `
      </div>
    </div>
  </div>`;

  // Inject into DOM
  appDiv.innerHTML = html;

  // Render choice buttons interactivity
  const choiceBtns = document.querySelectorAll('.choice-btn');
  choiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const nextId = e.target.getAttribute('data-next');
      if (nextId) handleChoice(nextId);
    });
  });
}

// Initial Load
async function init() {
  try {
    const response = await fetch('src/data/story.json');
    storyData = await response.json();
    renderNode(currentNodeId);
  } catch (error) {
    console.error("Error loading story data:", error);
    appDiv.innerHTML = '<p style="color:red">Fehler beim Laden der Geschichte / Error loading story.</p>';
  }
}

init();
