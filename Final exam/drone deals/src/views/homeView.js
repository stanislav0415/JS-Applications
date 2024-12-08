import { html, render } from '../../node_modules/lit-html/lit-html.js'



const homeViewTemplate  = () => html` 
   <section id="hero">
        <p>
          Discover the best deals on drones! Buy, sell, and trade top-quality drones with ease on Drone Deals - your
          trusted marketplace for all things drone.</p>
      </section>

`

export async function homeView() {
    render(homeViewTemplate(), document.getElementById('main-element'))
}