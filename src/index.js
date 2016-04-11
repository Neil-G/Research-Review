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
let entry;

// initial load from firebase
entriesRef.once('value', dataSnapShot => {
	dataSnapShot.forEach( childSnapShot => {
		entry = childSnapShot.val()
		entry.firebaseID = childSnapShot.key()

		entries.push(entry)
	})
	store.dispatch({
		type: "SET_ENTRIES",
		entries: entries
	})
	console.log(entries)
})


//fetch newly created
entriesRef.on("child_added", (childSnapShot, prevChildKey) => {
	entry = childSnapShot.val()
	entry.firebaseID = childSnapShot.key()
	store.dispatch({
		type: "ADD_ENTRY",
		entry: entry
	})
})

//remove deleted entry
entriesRef.on("child_removed", oldChildSnapshot => {
	console.log("oldChildSnapshot", oldChildSnapshot.val())
	store.dispatch({
		type: "DELETE_ENTRY",
		entryID: oldChildSnapshot.val().createdAt
	})
})

//remove deleted entry
entriesRef.on("child_changed", (childSnapShot, prevChildKey) => {
	entry = childSnapShot.val()
	entry.firebaseID = childSnapShot.key()
	console.log("childSnapShot", childSnapShot.val())
	store.dispatch({
		type: "EDIT_ENTRY",
		entry: entry
	})
})

render(
	<Provider store={store}>
		<AppContainer />
	</Provider>, 
	document.getElementById('root')
);
