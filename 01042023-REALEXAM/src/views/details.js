import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteOffer, getById } from '../data/fruitsDataLayer.js';
import { getUserData } from '../util.js';


const detailsTemplate = (oneFruit, onDelete) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${oneFruit.imageUrl} alt="example1" />
            <p id="details-title">${oneFruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${oneFruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                        ${oneFruit.nutrition}
                        </p>
              </div>
            <!-- <p>Applications: <strong id="applications">1</strong></p> -->

            <!--Edit and Delete are only for creator-->
            ${oneFruit.canEdit ? html`
            <div id="action-buttons">
              <a href="/catalog/${oneFruit._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null};
            
            </div>
          </div>
        </section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    
    const oneFruit = await getById(id);

    const userData = getUserData();

    // Only logged in user can edit
    if (userData && userData._id == oneFruit._ownerId) {
        oneFruit.canEdit = true;
    }

    ctx.render(detailsTemplate(oneFruit, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            // console.log('deleted');
            await deleteOffer(id);
            ctx.page.redirect('/catalog');
        }
    }
} 