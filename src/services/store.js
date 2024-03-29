import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from './reducers';
// import { compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)))