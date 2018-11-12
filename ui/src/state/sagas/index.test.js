import reducer from "../reducers";
import { CREATE_SHORT_URL_SUCCESS, GET_DELETE_TOKEN, CREATE_SHORT_URL_FAILURE, DELETE_URL, GET_DELETE_TOKEN_FAILURE, DELETE_URL_SUCCESS, DELETE_URL_FAILURE } from "../actions";
import { createShortUrlSaga, createUrlFetchApi,getDeleteTokenUrlSaga,getRemoveTokenFetchApi,deleteUrlSaga,deleteFetchApi } from "./index.js";
import { put, takeLatest, all, call } from "redux-saga/effects";
import * as sagas from "./index.js";
import { throwError } from "rxjs";

describe("sagas testing", () => {
  it("create short url saga success", () => {
    const gen = createShortUrlSaga({ payload: "url" });
    expect(gen.next().value).toEqual(call(createUrlFetchApi, "url"));
    const date = new Date();
    Date = jest.fn(() => date);
    expect(gen.next().value).toEqual(put({ type: CREATE_SHORT_URL_SUCCESS, payload: { ...undefined, date: date } }));
  });

  it("create short url saga failure", () => {
    const gen = createShortUrlSaga({ payload: "url" });
    expect(gen.next().value).toEqual(call(createUrlFetchApi, "url"));
    expect(gen.throw("error").value).toEqual(put({ type: CREATE_SHORT_URL_FAILURE }));
  });

  it("get delete token url saga",()=>{
      const gen=getDeleteTokenUrlSaga({payload:"hash"})
      expect(gen.next().value).toEqual(call(getRemoveTokenFetchApi,"hash"));
      expect(gen.next().value).toEqual(put({ type: DELETE_URL, payload: { hash:"hash",removeToken:undefined } }));
  })
  it("get delete token url failure",()=>{
    const gen=getDeleteTokenUrlSaga({payload:"hash"})
    expect(gen.next().value).toEqual(call(getRemoveTokenFetchApi,"hash"));
    expect(gen.throw("error").value).toEqual(put({ type: GET_DELETE_TOKEN_FAILURE }));
  })

  it("delete url with token success",()=>{
      const payload={removeToken:"removeToken",hash:"hash"}
    const gen=deleteUrlSaga({payload:payload})
    expect(gen.next().value).toEqual(call(deleteFetchApi,payload.hash,payload.removeToken));
    expect(gen.next().value).toEqual(put({ type: DELETE_URL_SUCCESS, payload: payload }));
  })

  it("delete url with token failure",()=>{
    const payload={removeToken:"removeToken",hash:"hash"}
  const gen=deleteUrlSaga({payload:payload})
  expect(gen.next().value).toEqual(call(deleteFetchApi,payload.hash,payload.removeToken));
  expect(gen.throw("error").value).toEqual(put({ type: DELETE_URL_FAILURE}));
})

});
