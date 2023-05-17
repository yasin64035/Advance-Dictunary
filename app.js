const form = document.getElementById('search-form');
const searchForm = document.getElementById('search-form');
const serifFontButton = document.getElementById('serif-font');
const sansSerifFontButton = document.getElementById('sans-serif-font');
const monospaceFontButton = document.getElementById('monospace-font');
const lightThemeButton = document.getElementById('light-theme');
const darkThemeButton = document.getElementById('dark-theme');

const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const searchInput = document.getElementById('search-input');
const autocompleteSuggestions = document.getElementById('autocomplete-suggestions');



const handleSearchInput = async () => {
    const query = searchInput.value;
    if (query.length > 0) {
      const suggestions = await fetchAutocompleteSuggestions(query);
      autocompleteSuggestions.innerHTML = '';
      suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('autocomplete-suggestion');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', () => {
          searchInput.value = suggestion;
          autocompleteSuggestions.innerHTML = '';
        });
        autocompleteSuggestions.appendChild(suggestionElement);
      });
    } else {
      autocompleteSuggestions.innerHTML = '';
    }
  };
  
  searchInput.addEventListener('input', handleSearchInput);

  const fetchAutocompleteSuggestions = async (query) => {
    const url = `https://api.dictionaryapi.dev/api/v2/autocomplete/en/${query}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  



















form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const word = data[0].word;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const definition = data[0].meanings[0].definitions[0].definition;
      const audioUrl = data[0].phonetics[0].audio;
      resultsContainer.innerHTML = `
        <h2>${word}</h2>
        <p><strong>Part of speech:</strong> ${partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition}</p>
        <audio controls>
          <source src="${audioUrl}" type="audio/mpeg">
        </audio>
      `;
    })
    .catch(error => {
      resultsContainer.innerHTML = `
        <p>Sorry, we couldn't find a definition for "${query}".</p>
      `;
    });
});


serifFontButton.addEventListener('click', () => {
    root.style.setProperty('--font-family', 'serif');
  });
  
  sansSerifFontButton.addEventListener('click', () => {
    root.style.setProperty('--font-family', 'sans-serif');
  });
  
  monospaceFontButton.addEventListener('click', () => {
    root.style.setProperty('--font-family', 'monospace');
  });
  
  lightThemeButton.addEventListener('click', () => {
    root.style.setProperty('--background-color', '#f5f5f5');
    root.style.setProperty('--text-color', '#333');
  });
  
  darkThemeButton.addEventListener('click', () => {
    root.style.setProperty('--background-color', '#333');
    root.style.setProperty('--text-color', '#f5f5f5');
  });
