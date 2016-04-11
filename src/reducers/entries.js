import { List, Map, fromJS } from 'immutable';

let index;

const entries = (state = [], action) => {
	switch (action.type) {
		case 'SET_ENTRIES':
			return action.entries;

		case 'ADD_ENTRY':
			return [...state, action.entry];

		case 'EDIT_ENTRY':
			state.forEach( (entry, i) => {
				if (entry.createdAt == action.entry.createdAt) index = i
			})
			state[index] = action.entry
			return state

		case 'DELETE_ENTRY':
			state.forEach( (entry, i) => {
				if (entry.createdAt == action.entryID) {
					index = i
					console.log("entry.createdAt", entry.createdAt)
					console.log("action.entryID", action.entryID)
				}
			})
			console.log("entry being removed", state[index])
			state.splice(index, 1)
			return state;

		default:
			return state;
	}
}

export default entries;