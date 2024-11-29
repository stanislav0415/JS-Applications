import { html, render } from '../node_modules/lit-html/lit-html.js'
import { get,post } from '../api.js'
import { onDelete } from './deleteView.js'


const detailTemplate = (data,likesCount,userLike) => html`
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
                <h3>Like tattoo:<span id="like">${likesCount}</span></h3>
            
                
                <div id="action-buttons">
                  ${ sessionStorage.userData !== undefined
                    ? data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/edit/${data._id}" >Edit</a>` : null
                    : null}
                 ${ sessionStorage.userData !== undefined
                    ? data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/colection" id="${data._id}" @click="${onDelete}">Delete</a>` : null 
                    : null}
                
                  <!--Bonus - Only for logged-in users ( not authors )-->
                  ${ sessionStorage.userData !== undefined
                    ? data._ownerId !== JSON.parse(sessionStorage.getItem('userData')).id && userLike < 1  ? html`<a href="/details/${data._id}" id="${data._id}" @click="${onClick}">Like</a>` : null
                    : null}
                  
                </div>
              </div>
            </div>
          </div>
        </section>
`

async function onClick(e) {

  let tattooId = e.target.id
  await post("/data/likes",{tattooId})
  document.getElementById(`${e.target.id}`).style.display = "none";

}

export async function myDetailsViews(ctx) {
    const id = ctx.params.id


    let likesCount
    let userLike

    if (sessionStorage.userData !== undefined) {
      
   
       likesCount = await get(`/data/likes?where=tattooId%3D%22${id}%22&distinct=_ownerId&count`)
        userLike = await get(`/data/likes?where=tattooId%3D%22${id}%22%20and%20_ownerId%3D%22${JSON.parse(sessionStorage.getItem('userData')).id}%22&count`)
    
    }
  
    render(detailTemplate(await getDetails(id),likesCount,userLike), document.getElementById('main'));

}
async function getDetails(id) {
    return await get(`/data/tattoos/${id}`)
}