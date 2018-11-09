import {CREATE_SHORT_URL,DELETE_URL} from '../actions'


export const createShortUrl=(url)=>{
    console.log('create url action creator'+url);
    return {
        type:CREATE_SHORT_URL,
        payload:url
    }
}
export const deleteUrl=(hash)=>{
    console.log("delete url: "+hash)

    return{
        type:DELETE_URL,
        payload:hash
    }
}