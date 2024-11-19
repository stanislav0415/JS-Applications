import {html, render} from './node_modules/lit-html/lit-html.js'

const url = `http://localhost:3030/jsonstore/advanced/dropdown`
const menu = document.querySelector('#menu')
async function getTown(){
    const response = await fetch(url)
    const data =await response.json()
    return Object.values(data)
}
const townTemplate = (data) =>html`
${data.map(town=>html`<option value=${town._id}>${town.text}</option>`)}
`
render(townTemplate(await getTown()),menu)





function addItem() {
    console.log('TODO:...');
}