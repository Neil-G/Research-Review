import { List, Map, fromJS } from 'immutable';

let index;

const entries = (state = [], action) => {
	switch (action.type) {
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
				if (entry.createdAt == action.entryID) index = i
			})
			state.splice(index, 1)
			return state;

		default:
			return state;
	}
}

export default entries;