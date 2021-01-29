import InstantSearch from './InstantSearch.js';

const searchAtletas = document.querySelector('#searchAtletas')
const instantSearchAtletas = new InstantSearch(searchAtletas, {
    searchUrl: new URL("atletas/buscar/", window.location.origin),
    queryparam: 'q', 
    responseParser: (responseData) => {
        return responseData.results
    },
    templateFunction: (result) => {
        return ` 
          <div class="instant-search__title">${result.nome}</div>
          <p class="instant-search__paragraph">${result.razao}</p>
        `
    }
});
