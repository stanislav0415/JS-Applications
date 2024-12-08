import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { post } from '../api.js';
import { updateNavi } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { notificationView } from './notificationView.js';

const registerViewTemplate = () => html`
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit="${onSubmit}"class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>

`

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target)

    const email = formData.get('email')
    const password = formData.get('password')
    const rePass = formData.get('re-password')
    if(password!== rePass){
        return notificationView("Passwords don't match"); 
    }
    if(email == '' || rePass == '' || password == '') {
        return notificationView('All fields are required'); 
     }

    const data = await post('/users/register', {email,password})
   
       
       

        const userData = {
            id: data._id,
            email: data.email,
            accessToken: data.accessToken,
        }
        sessionStorage.setItem('userData',JSON.stringify(userData))
        updateNavi()
        page.redirect('/')  
}

export async function registerView() {
    render(registerViewTemplate(), document.getElementById('main-element'))
}