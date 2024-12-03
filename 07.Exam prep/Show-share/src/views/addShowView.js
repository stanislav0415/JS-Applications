import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { post } from '../api.js';
import page from '../../node_modules/page/page.mjs'

const addShowTemplate = () => html`
 <section id="create">
          <div class="form">
            <h2>Add Show</h2>
            <form @submit="${onSubmit}" class="create-form">
              <input
              type="text"
              name="title"
              id="title"
              placeholder="TV Show title"
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
            />
            <input
            type="text"
            name="genre"
            id="genre"
            placeholder="Genre"
          />
          <input
          type="text"
          name="country"
          id="country"
          placeholder="Country"
        />
            <textarea
              id="details"
              name="details"
              placeholder="Details"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Show</button>
            </form>
          </div>
        </section>
`
async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const imageUrl = formData.get("image-url");
    const genre = formData.get("genre");
    const country = formData.get("country");
    const details = formData.get("details")
  

    if(title == '' || imageUrl == ''|| genre == ''|| country == '' || details == '') {
        alert('Please fill all fields!')
        throw new Error('Some fields is requite')
     }

    const data = await post('/data/shows', {title, imageUrl,genre,country,details});

    
      if (data !== null) {
        page.redirect('/dashboard')
        e.target.reset()  
      } 
       
         
}
export async function addShowView() {
    render(addShowTemplate(), document.getElementById('main'))
}