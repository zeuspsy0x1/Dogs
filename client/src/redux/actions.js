import axios from 'axios'

import {
	GET_ALL_BREEDS,
	GET_BREED_BY_NAME,
	GET_BREED_BY_ID,
	GET_TEMPERAMENTS,
	LINK_GET_BREEDS,
	LINK_GET_BREED_BY_ID,
	LINK_GET_BREED_BY_NAME,
	LINK_GET_TEMPERAMENTS,
} from './types'

export const getAllBreeds = () => {
	return async (dispatch) => {
		const response = await axios.get(LINK_GET_BREEDS)
		dispatch({
			type: GET_ALL_BREEDS,
			payload: response.data,
		})
	}
}
export const getByName = (name) => {
	return async (dispatch) => {
		const response = await axios.get(LINK_GET_BREED_BY_NAME + name)
		dispatch({
			type: GET_BREED_BY_NAME,
			payload: response.data,
		})
	}
}

export const getByID = (id) => {
	return async (dispatch) => {
		const response = await axios.get(`${LINK_GET_BREED_BY_ID}${id}`)
		dispatch({
			type: GET_BREED_BY_ID,
			payload: response.data,
		})
	}
}

export const getTemperaments = () => {
	return async (dispatch) => {
		const response = await axios.get(LINK_GET_TEMPERAMENTS)
		dispatch({
			type: GET_TEMPERAMENTS,
			payload: response.data,
		})
	}
}
