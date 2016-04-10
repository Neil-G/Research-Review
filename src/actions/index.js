
export const addEntry = (entry) => {
	return {
		type: 'ADD_ENTRY',
		entry
	}
}

export const deleteEntry = (entryID) => {
	return {
		type: 'DELETE_ENTRY',
		entry
	}
}

export const editEntry = (entry) => {
	return {
		type: 'EDIT_ENTRY',
		entry
	}
}