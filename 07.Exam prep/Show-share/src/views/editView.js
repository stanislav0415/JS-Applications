import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { put, get } from "../api.js";
import page from '../../node_modules/page/page.mjs'

const editViewTemplate = (data) => html`
   <section id="edit">
          <div class="form">
            <h2>Edit Show</h2>
            <form @submit="${onSubmit}"class="edit-form" id="${data._id}">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="TV Show title"
                value="${data.title}"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                value="${data.imageUrl}"
              />
              <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
              value="${data.genre}"
            />
            <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            value="${data.country}"
          />
              <textarea
                id="details"
                name="details"
                placeholder="Details"

                rows="2"
                cols="10"
                
              >${data.details}</textarea>
              <button type="submit">Edit Show</button>
            </form>
          </div>
        </section>

`;
async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const imageUrl = formData.get("image-url");
  const genre = formData.get("genre");
  const country = formData.get("country");
  const details = formData.get("details")

  if (
    title == "" ||
    imageUrl == "" ||
    genre == "" ||
    country == "" ||
    details == ""
  ) {
    alert("Please fill all fields!");
    throw new Error("Some fields is requite");
  }

  const data = await put(`/data/shows/${e.target.id}`, {
    title,
    imageUrl: imageUrl,
    genre,
    country,
    details,
  });

  if (data !== null) {
    page.redirect(`/details/${e.target.id}`);
    e.target.reset();
  }
}
export async function editView(ctx) {
  const id = ctx.params.id;

  const data = await get(`/data/shows/${id}`)
  
  
  
  render(editViewTemplate(data), document.getElementById("main"));
}
