import { LightningElement, api } from 'lwc';

export default class MovieTile extends LightningElement {
    @api movies;

    handleCardClick(event) {
        const imdbID = event.currentTarget.dataset.id;
        console.log('Clicked movie IMDB ID:', imdbID);
        this.dispatchEvent(new CustomEvent('cardclicked', {detail: imdbID}));
    }
}