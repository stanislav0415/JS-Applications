import { get } from "../api.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const colectionViewTemplate = (data) => html`
  <h2>Users Recommendations</h2>
        <section id="shows">
          

           ${data.length > 0 
            ? data.map(show =>html`
             <div class="show">
            <img src="${show.imageUrl}" alt="example1" />
            <div class="show-info">
              <h3 class="title">${show.title}</h3>
              <p class="genre">Genre: ${show.genre}</p>
              <p class="country-of-origin">Country of Origin: ${show.country}</p>
              <a class="details-btn" href="/details/${show._id}">Details</a>
            </div> 
            `)
            :  html`<h2 id="no-show">No shows Added.</h2>`}
        </section>
`;



export async function dashboardView() {
  const data = await get('/data/shows?sortBy=_createdOn%20desc')
  render(colectionViewTemplate(data), document.getElementById("main"));
}