/*
* @typedef { object } InstantSearchOptions
* @property { URL } searchUrl 
* @property { string } queryParam
* @property { Function } responseParser
* @property { Function } templateFunction
*/

class InstantSearch {
    /* 
    *
    * @param { HTMLElement } instantSearch 
    * @param { InstantSearchOptions } options
    */
    constructor(instantSearch, options) {
        this.options = options;
        this.elements = {
            main: instantSearch,
            input: instantSearch.querySelector(".instant-search__input"),
            resultsContainer: document.createElement("div")
        }
        this.elements.resultsContainer.classList.add("instant-search__results-container")
        this.elements.main.appendChild(this.elements.resultsContainer)
        this.addListeners();
    }


    addListeners() {
        let delay;

        this.elements.input.addEventListener("input", () => {
            
            clearTimeout(delay)
            
            const query = this.elements.input.value;

            delay = setTimeout(() => {
                if (query.length < 3) {
                    this.populateResults([])
                    return;
                }
                this.performSearch(query).then(results => {
                    this.populateResults(results)
                })
            },500)
        })
        this.elements.input.addEventListener("focus", () => {
            this.elements.resultsContainer.classList.add("instant-search__results-container--visible")
        })
        this.elements.input.addEventListener("blur", () => {
            this.elements.resultsContainer.classList.remove("instant-search__results-container--visible")
        })
    }

    populateResults(results) {
        while(this.elements.resultsContainer.firstChild) {
            this.elements.resultsContainer.removeChild(this.elements.resultsContainer.firstChild)
        }
        for (const result of results) {
            this.elements.resultsContainer.appendChild(this.createResultElement(result))
        }
    }

    createResultElement(result) {
        const anchorElement = document.createElement("a");
        anchorElement.classList.add("instant-search__result");
        anchorElement.insertAdjacentHTML("afterbegin", this.options.templateFunction(result))

        // if ("href" in result) {
            // anchorElement.setAttribute("href", result.href);
        // }
        return anchorElement;
    }
    async performSearch(query) {
        const url = new URL(this.options.searchUrl.toString()+query);
        // url.searchParams.set(this.options.queryParam, query);
        this.setLoading(true);
        const response = await fetch(url, {
            method: "get",
            cors: "no-cors"
        })
            
        if (response.status != 200) {
            throw new Error("Algo errado na busca.")
        }
            
        return this.options.responseParser(response)
    }

    setLoading(b) {
        this.elements.main.classList.toggle("instant-search--loading", b)
    }
}

export default InstantSearch