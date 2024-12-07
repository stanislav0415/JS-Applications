import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { post } from '../api.js';
import page from '../../node_modules/page/page.mjs'

const addTemplate = () => html`
<section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Add Solution</h2>
            <form @submit="${onSubmit}"class="create-form">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
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
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
              ></textarea>
              <button type="submit">Add Solution</button>
            </form>
          </div>
        </section>
`
async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const type = formData.get("type");
    const imageUrl = formData.get("image-url");
    const description = formData.get("description");
    const learnMore = formData.get("more-info");

  

    if(type == '' || imageUrl == ''|| description == ''|| learnMore == '' ) {
        alert('Please fill all fields!')
        throw new Error('Some fields is requite')
     }

    const data = await post('/data/solutions', {type, imageUrl, description, learnMore});

    
      if (data !== null) {
        page.redirect('/dashboard')
        e.target.reset()  
      } 
       
         
}
export async function addView() {
    render(addTemplate(), document.getElementById('main'))
}