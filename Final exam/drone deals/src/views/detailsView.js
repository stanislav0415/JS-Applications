import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { get } from '../api.js'
import { onDelete } from './deleteView.js'


const detailTemplate = (data) => html`
     <section id="details">
        <div id="details-wrapper">
          <div>
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-model">${data.model}</p>
          </div>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="details-price">Price: €${data.price}</p>
              <p class="details-condition">Condition: ${data.condition}</p>
              <p class="details-weight">Weight: ${data.weight}g</p>
              <p class="drone-description">
              ${data.description}
              </p>
              <p class="phone-number">Phone: ${data.phone}</p>
            </div>
            <!--Edit and Delete are only for creator-->
            <div class="buttons">
            ${ sessionStorage.userData !== undefined
                    ? data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/edit/${data._id}" id="edit-btn" >Edit</a>` : null
                    : null}
                 ${ sessionStorage.userData !== undefined
                    ? data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/marketplace" id="${data._id}" @click="${onDelete}"id="delete-btn">Delete</a>` : null 
                    : null}
            </div>
          </div>
        </div>
      </section>
`


export async function detailsViews(ctx) {
    const id = ctx.params.id
  
    render(detailTemplate(await getDetails(id)), document.getElementById('main-element'));

}
async function getDetails(id) {
    return await get(`/data/drones/${id}`)
}