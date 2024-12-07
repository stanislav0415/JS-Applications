import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { put, get } from "../api.js";
import page from '../../node_modules/page/page.mjs'

const editViewTemplate = (data) => html`
   <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form @submit="${onSubmit}"class="edit-form" id="${data._id}">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
                value="${data.type}"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL" 
                 value="${data.imageUrl}"
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
                  
              >
              ${data.description}
            </textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
              >
              ${data.learnMore}
            </textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;
async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const type = formData.get("type");
  const imageUrl = formData.get("image-url");
  const description = formData.get("description");
  const learnMore = formData.get("more-info");
  

  if (
    type == "" ||
    imageUrl == "" ||
    description == "" ||
    learnMore == "" 
  ) {
    alert("Please fill all fields!");
    throw new Error("Some fields is requite");
  }

  const data = await put(`/data/solutions/${e.target.id}`, {
     type,
     imageUrl,
     description,
     learnMore,
    
  });

  if (data !== null) {
    page.redirect(`/details/${e.target.id}`);
    e.target.reset();
  }
}
export async function editView(ctx) {
  const id = ctx.params.id;

  const data = await get(`/data/solutions/${id}`)
  
  
  
  render(editViewTemplate(data), document.getElementById("main"));
}
