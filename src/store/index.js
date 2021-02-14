import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import reduxThunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch { }
};
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
const persisted_State = loadStateFromLocalStorage();
const store = createStore(
  reducers,
  persisted_State,
  composeEnhancers(applyMiddleware(reduxThunk))
);
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});
export default store;
