// this Redux 'store' will be called on every time an action is dispatched, will save the new state and will trigger any associated "listening" callback functions to read the new state values
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer)

export default store