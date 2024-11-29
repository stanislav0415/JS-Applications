import { del } from '../api.js'


export async function onDelete(e){
   const confirmDelegation = confirm('are you sure you want to delete')
   if(confirmDelegation){
        del(`/data/tattoos/${e.target.id}`)
      }
}
