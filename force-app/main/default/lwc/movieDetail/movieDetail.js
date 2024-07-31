import { LightningElement, wire } from 'lwc';
// Import message service features required for subscribing and the message channel
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from "lightning/messageService";
import RECORDSELECTED from "@salesforce/messageChannel/MovieMessageChannel__c";

export default class MovieDetail extends LightningElement {
    subscription = null;
    loadComponent = false;
    movieDetails = {};

    @wire(MessageContext)
    messageContext;

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
  
    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
        this.subscription = subscribe(
            this.messageContext,
            RECORDSELECTED,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE },
        );
        }
    }
  
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
  
    // Handler for message received by component
    handleMessage(message) {
        let selectedMovieId = message.movieId;
        let APIKEY = message.apiKey
        console.log(`Subscribed : ${selectedMovieId}`);
        console.log(`Subscribed : ${APIKEY}`);
        this.fetchMovieDetails(selectedMovieId, APIKEY);
    }
  
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    async fetchMovieDetails(movieId, APIKEY) {
        this.loadComponent = false;
        let url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${APIKEY}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.movieDetails = data;
                this.loadComponent = true;
            })
            .catch(error => {
                console.log(error);
            })
    }
}