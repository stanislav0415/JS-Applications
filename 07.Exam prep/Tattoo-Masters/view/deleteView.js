import { del } from '../api.js'
import page from '../node_modules/page/page.mjs'


export async function onDelete(e){
   const confirmDelegation = confirm('are you sure you want to delete')
   if(confirmDelegation){
        del(`/data/tattoos/${e.target.id}`)
        page.redirect('/colection')
      }
}
