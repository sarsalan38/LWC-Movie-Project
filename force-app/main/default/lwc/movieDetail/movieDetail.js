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
        this.fetchMovieDetails(selectedMovieId, APIKEY);
    }
  
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    async fetchMovieDetails(movieId, APIKEY) {
        let url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${APIKEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.movieDetails = data;
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            this.loadComponent = true;
        }
    }
}