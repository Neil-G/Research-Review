import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import mainReducer from './reducers'
import Firebase from 'firebase';

let store = createStore(mainReducer);


// connecting firebase
const firebaseRef = new Firebase("https://engineerprogress.firebaseio.com/")
const entriesRef = firebaseRef.child('entries')

let entries = []
entriesRef.once('value', dataSnapShot => {
	dataSnapShot.forEach( childSnapShot => {
		entries.push(childSnapShot.val())
	})
	store.dispatch({
		type: "SET_ENTRIES",
		entries: entries
	})
	console.log(entries)
})


render(
	<Provider store={store}>
		<AppContainer />
	</Provider>, 
	document.getElementById('root')
);
