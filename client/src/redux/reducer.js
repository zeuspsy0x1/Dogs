import { GET_ALL_BREEDS, GET_BREED_BY_ID, GET_BREED_BY_NAME, GET_TEMPERAMENTS } from './types'

const initialState = {
	breeds: [],
	filteredBreeds: [],
	temperaments: [],
	breedById: [],
}

const reducer = function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_BREEDS:
			return {
				...state,
				breeds: action.payload,
			}
		case GET_BREED_BY_NAME:
			return {
				...state,
				breeds: action.payload,
			}
		case GET_BREED_BY_ID:
			return {
				...state,
				breedById: action.payload,
			}
		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			}

		default:
			return state
	}
}
export default reducer
