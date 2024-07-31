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
        // this.selectedSearch = "";
        // this.selectedType = ""
        let { name, value } = event.target;
        if (name === "type") {
            this.selectedType = value;
        } else if (name === "search") {
            this.selectedSearch = value;
            if (value !== "") {
                this.loading = true;
            }
        } else if (name === "pageno") {
            this.selectedPageNo = value;
        }

        this.noMovieFound = false;
        
        if (this.selectedSearch !== "" && this.selectedSearch !== null) {
            console.log("Selected Search : " + this.selectedSearch);
            clearTimeout(this.delayTimeout);
            this.delayTimeout = setTimeout(() => {
                this.searchMovie();
            }, DELAY);
        } else {
        }
    }

    async searchMovie() {
        this.loading = false;
        this.noMovieFound = false;
        let url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=${APIKEY}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.searchResult = data.Search ? data.Search : [];
                if (data.Error) {
                    this.noMovieFound = true;
                }
                console.log(this.noMovieFound);
            })
            .catch(error => {
                console.log(error);
            })
    }

    get displaySearchResults() {
        return this.searchResult.length > 0 ? true : false;
    }

    movieSelected(event) {
        this.searchMovie = event.detail;
        console.log(`Parent Component : ${this.searchMovie}`);

        const payload = { movieId: this.searchMovie, apiKey: APIKEY };
        publish(this.messageContext, RECORDSELECTED, payload);
      }
}