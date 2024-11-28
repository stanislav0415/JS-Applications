import { get } from "../api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";

const colectionViewTemplate = (data) => html`
  <h2>Collection</h2>
  <section id="tattoos">

   ${
    data.length == 0 
    ? html`<h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>` 
    : data.map(tattoo => html`
    <div class="tattoo">
      <img src="${tattoo.imageUrl}" />
      <div class="tattoo-info">
        <h3 class="type">${tattoo.type}</h3>
        <span>Uploaded by </span>
        <p class="user-type">${tattoo.userType}</p>
        <a class="details-btn" href="#">Learn More</a>
      </div>`)}
  </section>
`;



export async function myColectionView() {
  const data = await get('/data/tattoos?sortBy=_createdOn%20desc')
  render(colectionViewTemplate(data), document.getElementById("main"));
}
