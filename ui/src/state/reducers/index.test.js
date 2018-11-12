import reducer from "../reducers";
import { CREATE_SHORT_URL_SUCCESS, GET_DELETE_TOKEN } from "../actions";

describe("UserList", () => {
  it("createshorturlsucces append one element", () => {
    const initialState = {
      urlItems: []
    };
    const item = { hash: "todelete", url: "" };
    const action = { type: CREATE_SHORT_URL_SUCCESS, payload: item };
    const storeResult = reducer(initialState, action);
    expect(storeResult.urlItems.length).toEqual(1);
  });

  it("get delete one item that contains de hash contained in the payload", () => {
    const initialState = {
      urlItems: [{ hash: "todelete", url: "" }, { hash: "to", url: "" }]
    };
    const action = { type: GET_DELETE_TOKEN, payload: "todelete" };
    const storeResult = reducer(initialState, action);
    expect(storeResult.urlItems.length).toEqual(1);
  });

});
