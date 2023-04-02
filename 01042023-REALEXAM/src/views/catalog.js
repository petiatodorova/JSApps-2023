import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllOffers } from '../data/fruitsDataLayer.js';


// TODO Replace with actual view
const catalogTemplate = (allFruits) => html`
        <h2>Fruits</h2>
        <section id="dashboard">
          ${allFruits.length > 0 ? allFruits.map(offerCard) : html`
           <h2>No fruit info yet.</h2>`}
        </section>`;

const offerCard = (oneFruit) => html`
        <div class="fruit">
            <img src=${oneFruit.imageUrl} alt="example1" />
            <h3 class="title">${oneFruit.name}</h3>
            <p class="description">${oneFruit.description}</p>
            <a class="details-btn" href="/catalog/${oneFruit._id}">More Info</a>
        </div>`;

export async function catalogPage(ctx) {
    const offers = await getAllOffers();
    ctx.render(catalogTemplate(offers));
}