import { CREATE_SHORT_URL_SUCCESS, GET_DELETE_TOKEN } from "../actions";

const initialState = {
  urlItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHORT_URL_SUCCESS: {
      console.log("create short url success");
      console.table(action);

      return {
        ...state,
        urlItems: [action.payload,...state.urlItems]
      };
    }
    case GET_DELETE_TOKEN:{
      console.log("get delete token in reducer")
      console.log(action.payload);
      return {
        ...state,
        urlItems:state.urlItems.filter((el)=>{
          if(el.hash==action.payload){
            return false
          }else{
            return true
          }
        })
      }
      

    }

    default:
      return state;
  }
};
export default reducer;
