import { put, takeLatest, all, call } from "redux-saga/effects";
import {CREATE_SHORT_URL,DELETE_URL} from "../actions"



function* createShortUrl(action){
console.log('createShortUrlGenerator');


}

function* deleteUrl(action){
console.log('deleteUrlGenerator');


}




//watcher add todo
function* addTodoWatcher() {
    yield takeLatest(CREATE_SHORT_URL, createShortUrl);
  }
  //watcher delete todo
  function* deleteTodoWatcher() {
    yield takeLatest(DELETE_URL, deleteUrl);
  }
  
  export default function* rootSaga() {
    yield all([addTodoWatcher(),deleteTodoWatcher()]);
  }