import page from '/node_modules/page/page.mjs'

import { registerView } from './views/registerView.js'
import { loginView } from './views/loginView.js'
import { logoutView } from './views/logoutView.js'
import { homeView } from './views/homeView.js'
import { dashboardView } from './views/dashboardView.js'
import { detailsViews } from './views/detailsView.js'
import { editView} from './views/editView.js'
import { addView } from './views/addView.js'

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

page('/', homeView)
page('/register', registerView)
page('/login', loginView)
page('/logout', logoutView)
page('/marketplace', dashboardView)
page('/details/:id',detailsViews)
page('/edit/:id',editView)
page('/sell',addView)



page.start()
