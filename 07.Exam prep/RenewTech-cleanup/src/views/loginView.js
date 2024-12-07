import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { post } from '../api.js'
import { updateNavi } from '../app.js';
import page from '../../node_modules/page/page.mjs'

const loginViewTemplate = () => html`
<section id="login">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Login</h2>
            <form @submit="${onSubmit}"class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`
async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    if(email == '' || password == '') {
        alert('Please fill all fields!')
        throw new Error('Some fields is requite')
     }

    const data = await post('/users/login', {email, password});

    
        const userData = {
            id: data._id,
            email: data.email,
            accessToken: data.accessToken,
        }
        sessionStorage.setItem('userData',JSON.stringify(userData))
        updateNavi()
        page.redirect('/')
        e.target.reset()    
}


export async function loginView() {
    render(loginViewTemplate(), document.getElementById('main'))
}