import { put, takeLatest, all, call } from "redux-saga/effects";
import {
  CREATE_SHORT_URL,
  CREATE_SHORT_URL_SUCCESS,
  CREATE_SHORT_URL_FAILURE,
  DELETE_URL,
  DELETE_URL_SUCCESS,
  DELETE_URL_FAILURE,
  GET_DELETE_TOKEN,
  GET_DELETE_TOKEN_FAILURE
} from "../actions";

export let createUrlFetchApi = async url => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  let response = await fetch("/", { method: "POST", headers: headers, body: JSON.stringify({ url: url }) });
  let result = await response.json();
  return result;
};

export function* createShortUrlSaga(action) {
  const { payload } = action;
  try {
    const data = yield call(createUrlFetchApi, payload);
    const date = new Date();
    yield put({ type: CREATE_SHORT_URL_SUCCESS, payload: { ...data, date: date } });
  } catch (e) {
    yield put({ type: CREATE_SHORT_URL_FAILURE });
  }
}

export const getRemoveTokenFetchApi = hash => {
  const headers = new Headers({
    Accept: "application/json"
  });
  return fetch(`/${hash}`, {
    headers: headers
  });
};

export function* getDeleteTokenUrlSaga(action) {
  const { payload } = action;
  try {
    const data = yield call(getRemoveTokenFetchApi, payload);
    const responseBody = data.json();
    const json = yield responseBody;
    yield put({ type: DELETE_URL, payload: { hash: payload, removeToken: json.removeToken } });
  } catch (e) {
    yield put({ type: GET_DELETE_TOKEN_FAILURE, payload: e });
  }
}
export const deleteFetchApi = (hash, removeToken) => {
  return fetch(`/${hash}/${removeToken}`, {
    method: "DELETE"
  });
};

export function* deleteUrlSaga(action) {
  const { payload } = action;
  try {
    const data = yield call(deleteFetchApi, payload.hash, payload.removeToken);
    const responseBody = data.json();
    const json = yield responseBody;
    yield put({ type: DELETE_URL_SUCCESS, payload: { hash: payload, removeToken: json.removeToken } });
  } catch (e) {
    yield put({ type: DELETE_URL_FAILURE, payload: e });
  }
}

//watchers
function* createShortUrlWatcher() {
  yield takeLatest(CREATE_SHORT_URL, createShortUrlSaga);
}
function* getDeleteTokenWatcher() {
  yield takeLatest(GET_DELETE_TOKEN, getDeleteTokenUrlSaga);
}

function* deleteUrlWatcher() {
  yield takeLatest(DELETE_URL, deleteUrlSaga);
}

export default function* rootSaga() {
  yield all([createShortUrlWatcher(), getDeleteTokenWatcher(), deleteUrlWatcher()]);
}
