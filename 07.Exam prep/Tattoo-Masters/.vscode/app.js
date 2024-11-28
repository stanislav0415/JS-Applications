import page from '/node_modules/page/page.mjs'


import { myHomeView } from './view/homeView.js'
import { myLoginView } from './view/loginView.js'
import { myRegisterView } from './view/registerView.js'
import { myColectionView } from './view/colectionView.js'
import { mylogoutView } from './view/logoutView.js'
import { myAddTattooView } from './view/addTattooView.js'
import { myDetailsViews } from './view/detailsView.js'
import { myEditView } from './view/editView.js'




export function updateNavi(){
    const guest = document.getElementById('guest')
    const user = document.getElementById('user')
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if(userData){
        user.style.display = "inline-block"
        guest.style.display = 'none' 
    }else{
        user.style.display = "none"
        guest.style.display = 'inline-block' 
    }
}


updateNavi()

page('/', myHomeView)
page('/login', myLoginView)
page('/register', myRegisterView)
page('/colection', myColectionView)
page('/logout',mylogoutView)
page('/add', myAddTattooView)
page('/details/:id',myDetailsViews)
page('/edit/:id',myEditView)



page.start()

