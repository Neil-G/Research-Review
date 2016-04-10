import { List, Map, fromJS } from 'immutable';

const entries = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ENTRY':
		console.log("entry would be created here in reducer")
			return [...state, action.entry];
		default:
			return state;
	}
}

export default entries;