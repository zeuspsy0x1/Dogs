import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import thunk from 'redux-thunk'
//thunk para poder hacer acciones con promesas

const generateStore = () => {
	const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
	return store
}

export default generateStore
