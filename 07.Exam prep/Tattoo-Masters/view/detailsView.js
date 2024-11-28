import { html, render } from '../node_modules/lit-html/lit-html.js'
import { get } from '../api.js'
import { onDelete } from './deleteView.js'

const detailTemplate = (data) => html`
 <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src="${data.imageUrl}"
              alt="example1"
            />
            <div>
              <div id="info-wrapper">
                <p id="details-type">${data.type}</p>
                <div id="details-description">
                  <p id="user-type">${data.userType}</p>
                  <p id="description">
                    ${data.description}
                  </p>
                </div>
                <h3>Like tattoo:<span id="like">0</span></h3>
            
                <div id="action-buttons">
                  ${data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/edit/${data._id}" >Edit</a>` : null}
                  ${data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/colection" id="${data._id}" @click="${onDelete}">Delete</a>` : null}
                  <!--Bonus - Only for logged-in users ( not authors )-->
                  <a href="#" id="like-btn">Like</a>
                </div>
              </div>
            </div>
          </div>
        </section>
`

export async function myDetailsViews(ctx) {
    const id = ctx.params.id
  
    render(detailTemplate(await getDetails(id)), document.getElementById('main'));

}
async function getDetails(id) {
    return await get(`/data/tattoos/${id}`)
}