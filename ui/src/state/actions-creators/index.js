import {CREATE_SHORT_URL,GET_DELETE_TOKEN} from '../actions'


export const createShortUrl=(url)=>{
    return {
        type:CREATE_SHORT_URL,
        payload:url
    }
}
export const deleteUrl=(hash)=>{
    return{
        type:GET_DELETE_TOKEN,
        payload:hash
    }
}