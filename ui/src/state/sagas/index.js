import { put, takeLatest, all, call } from "redux-saga/effects";
import { CREATE_SHORT_URL, CREATE_SHORT_URL_SUCCESS, CREATE_SHORT_URL_FAILURE, DELETE_URL, DELETE_URL_SUCCESS, DELETE_URL_FAILURE, GET_DELETE_TOKEN, GET_DELETE_TOKEN_SUCCESS, GET_DELETE_TOKEN_FAILURE } from "../actions";

const createUrlFetch = url => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });
  return fetch("/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ url: url })
  });
};
function* createShortUrl(action) {
  const { payload } = action;
  try {
    const data = yield call(createUrlFetch, payload);
    const responseBody = data.json();
    const json = yield responseBody;
    yield put({ type: CREATE_SHORT_URL_SUCCESS, payload: { ...json, date: new Date() } });
  } catch (e) {
    yield put({ type: CREATE_SHORT_URL_FAILURE, payload: e });
  }
}

const getRemoveTokenFetch = hash => {
    const headers = new Headers({
      "Accept": "application/json"
    });
    return fetch(`/${hash}`, {
      headers: headers,
    });
  };
function* getDeleteTokenUrl(action) {
  const { payload } = action;
  try {
    const data = yield call(getRemoveTokenFetch, payload);
    const responseBody = data.json();
    const json = yield responseBody;
    yield put({ type: DELETE_URL, payload: { hash:payload,removeToken:json.removeToken } });
  } catch (e) {
    yield put({ type: GET_DELETE_TOKEN_FAILURE, payload: e });
  }
} 
const deleteFetch = (hash,removeToken) => {
    return fetch(`/${hash}/${removeToken}`, {
      method:"DELETE"
    });
  };
function* deleteUrl(action){
    const { payload } = action;
    try {
      const data = yield call(deleteFetch, payload.hash,payload.removeToken);
      const responseBody = data.json();
      const json = yield responseBody;
      yield put({ type: DELETE_URL_SUCCESS, payload: { hash:payload,removeToken:json.removeToken } });
    } catch (e) {
      yield put({ type: DELETE_URL_FAILURE, payload: e });
    }
}

//watchers
function* createShortUrlWatcher() {
  yield takeLatest(CREATE_SHORT_URL, createShortUrl);
}
function* getDeleteTokenWatcher() {
  yield takeLatest(GET_DELETE_TOKEN, getDeleteTokenUrl);
}

function* deleteUrlWatcher() {
    yield takeLatest(DELETE_URL, deleteUrl);
  }

export default function* rootSaga() {
  yield all([createShortUrlWatcher(), getDeleteTokenWatcher(),deleteUrlWatcher()]);
}
