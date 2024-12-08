import { get } from "../api.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const colectionViewTemplate = (data) => html`
    <h3 class="heading">Marketplace</h3>
      <section id="dashboard">
     
        ${data.length > 0 ? data.map(drone => html` <div class="drone">
          <img src="${drone.imageUrl}" alt="example1" />
          <h3 class="model">${drone.model}</h3>
          <div class="drone-info">
            <p class="price">Price: €${drone.price}</p>
            <p class="condition">Condition: ${drone.condition}</p>
            <p class="weight">Weight: ${drone.weight}g</p>
          </div>
          <a class="details-btn" href="/details/${drone._id}">Details</a>
        </div>`): html`<h3 class="no-drones">No Drones Available</h3>`}
      </section>
    
     
`;



export async function dashboardView() {
  const data = await get('/data/drones?sortBy=_createdOn%20desc')
  render(colectionViewTemplate(data), document.getElementById("main-element"));
}