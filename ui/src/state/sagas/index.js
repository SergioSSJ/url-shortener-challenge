import { put, takeLatest, all, call } from "redux-saga/effects";
import { CREATE_SHORT_URL, CREATE_SHORT_URL_SUCCESS, CREATE_SHORT_URL_FAILURE, DELETE_URL, DELETE_URL_SUCCESS, DELETE_URL_FAILURE } from "../actions";

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
    console.error(e);
  }
}

const getRemoveTokenFetch = url => {
    
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return fetch("/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ url: url })
    });
  };




function* deleteUrl(action) {
  console.log("deleteUrlGenerator");
}

//watchers
function* addTodoWatcher() {
  yield takeLatest(CREATE_SHORT_URL, createShortUrl);
}
function* deleteTodoWatcher() {
  yield takeLatest(DELETE_URL, deleteUrl);
}

export default function* rootSaga() {
  yield all([addTodoWatcher(), deleteTodoWatcher()]);
}
