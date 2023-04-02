import { html } from '../../node_modules/lit-html/lit-html.js'
import { getById, updateOffer } from '../data/fruitsDataLayer.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (oneFruit, onEdit) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                .value=${oneFruit.name}
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${oneFruit.imageUrl}
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                .value=${oneFruit.description}
                placeholder="Description"
                rows="10"
                cols="50"
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                .value=${oneFruit.nutrition}
                placeholder="Nutrition"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>

        `;

export async function editPage(ctx) {
    const id = ctx.params.id;

    const oneFruit = await getById(id);

    // After we receive the offer, it's our first param
    ctx.render(editTemplate(oneFruit, createSubmitHandler(onEdit)));

    async function onEdit({
        name,
        imageUrl, 
        description, 
        nutrition
      }) {
        // Validation
        if ([name,
            imageUrl, 
            description, 
            nutrition].some(f => f == '')) {
            return alert('All fields are required!');
        }

        await updateOffer(id, {
            name,
            imageUrl, 
            description, 
            nutrition
          });

        ctx.page.redirect('/catalog/' + id);
    }
}        