const apiUrl = '/characters';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCharacters(characters) {
  const container = document.getElementById('characters');
  container.innerHTML = characters
    .map((character) => {
      const bladeClass = `blade-${String(character.blade_color || 'unknown').toLowerCase()}`;
      return `
      <article class="character-card ${bladeClass}">
        <div class="saber-line" aria-hidden="true"></div>
        <h2>${escapeHtml(character.name || 'Unknown')}</h2>
        <dl>
          <dt>ID</dt><dd>${escapeHtml(character.id || 'N/A')}</dd>
          <dt>Alignment</dt><dd>${escapeHtml(character.alignment || 'Unknown')}</dd>
          <dt>Era</dt><dd>${escapeHtml(character.era || 'Unknown')}</dd>
          <dt>Faction</dt><dd>${escapeHtml(character.faction || 'Unknown')}</dd>
          <dt>Affiliation</dt><dd>${escapeHtml(character.affiliation || 'Unknown')}</dd>
          <dt>Blade Color</dt><dd>${escapeHtml(character.blade_color || 'Unknown')}</dd>
          <dt>Species</dt><dd>${escapeHtml(character.species || 'Unknown')}</dd>
          <dt>Homeworld</dt><dd>${escapeHtml(character.homeworld || 'Unknown')}</dd>
        </dl>
      </article>`;
    })
    .join('');
}

async function loadCharacters() {
  const message = document.getElementById('message');
  try {
    const response = await fetch(apiUrl, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Failed to load characters (${response.status})`);
    }

    const characters = await response.json();
    if (!Array.isArray(characters) || characters.length === 0) {
      message.textContent = 'No characters found in the database.';
      return;
    }

    message.textContent = '';
    renderCharacters(characters);
  } catch (error) {
    message.textContent = `Error loading characters: ${error.message}`;
  }
}

window.addEventListener('DOMContentLoaded', loadCharacters);
