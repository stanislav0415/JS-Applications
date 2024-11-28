import { html, render } from '../node_modules/lit-html/lit-html.js'
import { post } from '../api.js';
import page from '../node_modules/page/page.mjs'

const addTattooTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add tattoo</h2>
            <form @submit="${onSubmit}"class="create-form">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Tattoo Type"
              />
              <input
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
              ></textarea>
              <select id="user-type" name="user-type">
                <option value="" disabled selected>Select your role</option>
                <option value="Tattoo Artist">Tattoo Artist</option>
                <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                <option value="First Time in Tattoo">
                  First Time in Tattoo
                </option>
                <option value="Tattoo Collector">Tattoo Collector</option>
              </select>
              <button type="submit">Add tattoo</button>
            </form>
          </div>
        </section>
`
async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const type = formData.get('type');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const userType = formData.get('user-type');

    if(type == '' || imageUrl == ''|| description == ''|| userType == '') {
        alert('Please fill all fields!')
        throw new Error('Some fields is requite')
     }

    const data = await post('/data/tattoos', {type, imageUrl,description,userType});

    
      if (data !== null) {
        page.redirect('/colection')
        e.target.reset()  
      } 
       
         
}
export async function myAddTattooView() {
    render(addTattooTemplate(), document.getElementById('main'))
}