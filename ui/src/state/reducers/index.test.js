import reducer from '../reducers'
import {CREATE_SHORT_URL_SUCCESS,GET_DELETE_TOKEN} from '../actions'

const initialState = {
    urlItems: []
  };

describe("UserList", () => {
  it("createshorturlsucces append one element", () => {

    const item={hash:"",url:""}
    const action={type:CREATE_SHORT_URL_SUCCESS,payload:item}

    const storeResult=reducer(initialState,action)

    console.log(storeResult)
    expect(storeResult.urlItems.length).toEqual(1);
  });
});
