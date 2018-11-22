import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

// why an array? 
const middleware = [thunk];

// // `[]` = reducer, `{}` = initial state
// const store = createStore(
// 	rootReducer, 
// 	initialState, 
// 	compose(
// 		applyMiddleware(...middleware),  // `...` = spread operator
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)  
// ); 

const enhancers = [];
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ...enhancers,
  ),
);

export default store;
