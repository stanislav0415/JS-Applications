import { html, render } from '../node_modules/lit-html/lit-html.js'

const homeViewTemplate = () => html`
<section id="home">
          <div id="home-wrapper">
            <p id="home-intro">
              Whether you're a seasoned artist, a collector of ink, or someone
              looking for inspiration for their first tattoo,
              <span>Tattoo Masters</span> is your community. Share your
              masterpieces, discover incredible designs, and connect with
              artists and aficionados from around the world.
            </p>
            <a href="#" id='join-us'>Join Us!</a>
          </div>
</section>
`

export async function myHomeView() {
    render(homeViewTemplate(), document.getElementById('main'))
}