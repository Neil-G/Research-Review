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
export const entriesRef = firebaseRef.child('entries')

let entries = []

// initial load from firebase
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


//fetch newly created
entriesRef.on("child_added", (childSnapShot, prevChildKey) => {
	store.dispatch({
		type: "ADD_ENTRY",
		entry: childSnapShot.val()
	})
})


render(
	<Provider store={store}>
		<AppContainer />
	</Provider>, 
	document.getElementById('root')
);
