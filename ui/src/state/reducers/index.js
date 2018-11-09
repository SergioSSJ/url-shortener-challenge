import { CREATE_SHORT_URL_SUCCESS } from "../actions";

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

    default:
      return state;
  }
};
export default reducer;
