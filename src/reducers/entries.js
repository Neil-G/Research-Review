import { List, Map, fromJS } from 'immutable';

const entries = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ENTRY':
			return state;
		default:
			return state;
	}
}

export default entries;