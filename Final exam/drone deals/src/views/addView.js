import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { post } from '../api.js';
import page from '../../node_modules/page/page.mjs'
import { notificationView } from './notificationView.js';

const addTemplate = () => html`
   <section id="create">
        <div class="form form-item">
          <h2>Add Drone Offer</h2>
          <form @submit="${onSubmit}"class="create-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" id="price" placeholder="Price" />
            <input type="number" name="weight" id="weight" placeholder="Weight" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description"></textarea>
            <button type="submit">Add</button>
          </form>

        </div>
      </section>
`
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

    const data = await post('/data/drones', {model,imageUrl,price,weight,phone,condition,description});

    
      if (data !== null) {
        page.redirect('/marketplace')
        e.target.reset()  
      } 
       
         
}
export async function addView() {
    render(addTemplate(), document.getElementById('main-element'))
}