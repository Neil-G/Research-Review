import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import mainReducer from './reducers'

let store = createStore(mainReducer);

render(
	<Provider store={store}>
		<AppContainer />
	</Provider>, 
	document.getElementById('root')
);
