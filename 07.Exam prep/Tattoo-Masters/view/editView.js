import { html, render } from "../node_modules/lit-html/lit-html.js";
import { put, get } from "../api.js";
import page from "../node_modules/page/page.mjs";

const editViewTemplate = (data) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit tattoo</h2>
      <form @submit="${onSubmit}" id="${data._id}" class="edit-form">
        <input
          value="${data.type}"
          type="text"
          name="type"
          id="type"
          placeholder="Tattoo Type"
        />
        <input
          value="${data.imageUrl}"
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
        >
        ${data.description}</textarea
        >

        <select id="user-type" name="user-type">
          <option value="" ?selected="${data.userType === ''}">Select your role</option>
          <option value="Tattoo Artist" ?selected="${data.userType === 'Tattoo Artist'}">Tattoo Artist</option>
          <option value="Tattoo Enthusiast" ?selected="${data.userType === 'Tattoo Enthusiast'}">Tattoo Enthusiast</option>
          <option value="First Time in Tattoo" ?selected="${data.userType === 'First Time in Tattoo'}">First Time in Tattoo</option>
          <option value="Tattoo Collector" ?selected="${data.userType === 'Tattoo Collector'}">Tattoo Collector</option>
        </select>
<script>
 
 
  const userTypeSelect = document.getElementById("user-type");

  userTypeSelect.value = data.userType;
</script>
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
  const userType = formData.get("user-type");

  if (
    type == "" ||
    imageUrl == "" ||
    description == "" ||
    userType == ""
  ) {
    alert("Please fill all fields!");
    throw new Error("Some fields is requite");
  }

  const data = await put(`/data/tattoos/${e.target.id}`, {
    type,
    imageUrl,
    description,
    userType,
  });

  if (data !== null) {
    page.redirect(`/details/${e.target.id}`);
    e.target.reset();
  }
}
export async function myEditView(ctx) {
  const id = ctx.params.id;

  const data = await get(`/data/tattoos/${id}`);
  document.getElementById("user-type").value = data.userType;

  render(editViewTemplate(data), document.getElementById("main"));
}
