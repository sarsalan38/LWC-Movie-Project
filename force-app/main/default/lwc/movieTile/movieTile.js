import { LightningElement, api } from 'lwc';

export default class MovieTile extends LightningElement {
    @api movies;

    handleCardClick(event) {
        const imdbID = event.currentTarget.dataset.id;
        this.dispatchEvent(new CustomEvent('cardclicked', {detail: imdbID}));
    }
}