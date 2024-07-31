import { LightningElement, wire } from 'lwc';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from "lightning/messageService";
import RECORDSELECTED from "@salesforce/messageChannel/MovieMessageChannel__c";

const APIKEY = "35298044"
const DELAY = 500;

export default class MovieSearch extends LightningElement {
    selectedType = ""
    selectedSearch = "";
    loading = false;
    selectedPageNo = "1";
    delayTimeout;
    searchResult = [];
    selectedMovie = "";
    noMovieFound = false;

    @wire(MessageContext)
    messageContext;

    get typeOptions() {
        return [
            { label: "None", value: "" },
            { label: "Movie", value: "movie" },
            { label: "Series", value: "series" },
            { label: "Episode", value: "episode" },
        ];
    }

    handleChange(event) {
        this.searchResult = [];
        let { name, value } = event.target;
    
        if (name === 'type') {
            this.selectedType = value;
        } else if (name === 'search') {
            this.selectedSearch = value;
            if (value !== '') {
                this.loading = true;
            }
        } else if (name === 'pageno') {
            this.selectedPageNo = value;
        }
    
        this.noMovieFound = false;
        
        if (this.selectedSearch !== '' && this.selectedSearch !== null) {
            clearTimeout(this.delayTimeout);
            this.delayTimeout = setTimeout(() => {
                this.searchMovie();
            }, DELAY);
        }
    }
    
    async searchMovie() {
        let url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=${APIKEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.searchResult = data.Search || [];
            this.noMovieFound = data.Error ? true : false;
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            this.loading = false;
        }
    }

    get displaySearchResults() {
        return this.searchResult.length > 0;
    }

    movieSelected(event) {
        this.selectedMovie = event.detail;
        console.log(`Parent Component : ${this.selectedMovie}`);

        const payload = { movieId: this.selectedMovie, apiKey: APIKEY };
        publish(this.messageContext, RECORDSELECTED, payload);

        document.documentElement.scrollTop = 0;
      }
}