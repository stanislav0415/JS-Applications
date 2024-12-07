import { html, render } from '../../node_modules/lit-html/lit-html.js'
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
            <p id="details-type">${data.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                <p id="description">
                   ${data.description}
                  </p>
                  <p id="more-info">
                    ${data.learnMore}
                  </p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">0</span></h3>


              <div id="action-buttons">
                ${ sessionStorage.userData !== undefined
                    ? data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/edit/${data._id}" id="edit-btn" >Edit</a>` : null
                    : null}
                 ${ sessionStorage.userData !== undefined
                    ? data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/dashboard" id="${data._id}" @click="${onDelete}"id="delete-btn">Delete</a>` : null 
                    : null}
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="#" id="like-btn">Like</a>
              </div>
            </div>
          </div>
        </section>
`


export async function detailsViews(ctx) {
    const id = ctx.params.id
  
    render(detailTemplate(await getDetails(id)), document.getElementById('main'));

}
async function getDetails(id) {
    return await get(`/data/solutions/${id}`)
}