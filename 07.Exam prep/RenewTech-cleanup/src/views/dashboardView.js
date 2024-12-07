import { get } from "../api.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const colectionViewTemplate = (data) => html`
   <h2>Solutions</h2>
        <section id="solutions">
          ${data.length >0 ?
            data.map(solution => html` 
            <div class="solution">
            <img src="${solution.imageUrl}" alt="example1" />
            <div class="solution-info">
              <h3 class="type">${solution.type}</h3>
              <p class="description">
                ${solution.description}
              </p>
              <a class="details-btn" href="/details/${solution._id}">Learn More</a>
            </div>
          </div>`)
          :  html` <h2 id="no-solution">No Solutions Added.</h2>`}
        
            

`;



export async function dashboardView() {
  const data = await get('/data/solutions?sortBy=_createdOn%20desc')
  render(colectionViewTemplate(data), document.getElementById("main"));
}