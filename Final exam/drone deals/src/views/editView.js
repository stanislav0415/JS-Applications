import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { put, get } from "../api.js";
import page from '../../node_modules/page/page.mjs'
import { notificationView } from './notificationView.js';

const editViewTemplate = (data) => html`
  <section id="edit">
        <div class="form form-item">
          <h2>Edit Offer</h2>
          <form @submit="${onSubmit}"class="edit-form" id="${data._id}">
            <input type="text" name="model" id="model" placeholder="Drone Model" value="${data.model}" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" value="${data.imageUrl}"/>
            <input type="number" name="price" id="price" placeholder="Price" value="${data.price}"/>
            <input type="number" name="weight" id="weight" placeholder="Weight" value="${data.weight}"/>
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" value="${data.phone}"/>
            <input type="text" name="condition" id="condition" placeholder="Condition" value="${data.condition}"/>
            <textarea name="description" id="description" placeholder="Description">${data.description}</textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>

`;
async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const model = formData.get("model");
  const imageUrl = formData.get("imageUrl");
  const price = formData.get("price");
  const weight = formData.get("weight");
  const phone = formData.get("phone")
  const condition = formData.get("condition")
  const description = formData.get("description")
  


  if(model == '' || imageUrl == ''|| price == ''|| weight == '' || phone == ''|| condition == ''|| description == '') { 
    return notificationView('All fields are required'); 
  }

  const data = await put(`/data/drones/${e.target.id}`, {
   model,
   imageUrl,
   price,
   weight,
   phone,
   condition,
   description
  });

  if (data !== null) {
    page.redirect(`/details/${e.target.id}`);
    e.target.reset();
  }
}
export async function editView(ctx) {
  const id = ctx.params.id;

  const data = await get(`/data/drones/${id}`)
  
  
  
  render(editViewTemplate(data), document.getElementById("main-element"));
}
