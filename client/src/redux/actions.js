import axios from 'axios'

import {
	GET_ALL_BREEDS,
	GET_BREED_BY_NAME,
	GET_BREED_BY_ID,
	GET_ERROR,
	GET_TEMPERAMENTS,
	LINK_GET_BREEDS,
	LINK_GET_BREED_BY_ID,
	LINK_GET_BREED_BY_NAME,
	LINK_GET_TEMPERAMENTS,
	CLEAR_DETAILS,
} from './types'

export function getAllBreeds() {
	return function (dispatch) {
		axios
			.get(LINK_GET_BREEDS)
			.then((res) => {
				return res.data
			})
			.then((res) => {
				dispatch({
					type: GET_ALL_BREEDS,
					payload: res,
				})
			})
			.catch((err) => {
				console.log(err)
				dispatch({
					type: GET_ERROR,
					payload: { error: 'A problem ocurred trying to fetch all breeds - actions.js' },
				})
			})
	}
}

//NO NECESITO GETBYNAME PARA ESTE PI, PUEDO SOLO FILTRAR LOS QUE ME TRAIGO Y YA, pero aun asi la uso
export function getByName(name) {
	return (dispatch) => {
		axios
			.get(LINK_GET_BREED_BY_NAME + name)
			.then((res) =>
				dispatch({
					type: GET_BREED_BY_NAME,
					payload: res.data,
				})
			)
			.catch((err) => {
				console.log(err + '  this was the error when trying to get breeds BY NAME')
			})
	}
}

export function getTemperaments() {
	return function (dispatch) {
		axios
			.get(LINK_GET_TEMPERAMENTS)
			.then((res) => {
				dispatch({
					type: GET_TEMPERAMENTS,
					payload: res.data,
				})
			})
			.catch((err) => {
				console.log(err + '  this was the error when trying to get all the temperaments')
			})
	}
}

export function getById(id) {
	return function (dispatch) {
		axios
			.get(`${LINK_GET_BREED_BY_ID}${id}`)
			.then((res) => {
				return res.data
			})
			.then((res) => {
				dispatch({
					type: GET_BREED_BY_ID,
					payload: res,
				})
			})
			.catch((err) => {
				console.log(err)
				dispatch({
					type: GET_ERROR,
					payload: { error: 'There is no breed by that id' },
				})
			})
	}
}

export function setDetailObj(payload = {}) {
	return function (dispatch) {
		dispatch({
			type: CLEAR_DETAILS,
			payload: payload,
		})
	}
}

export function filtersActionFunction(filterType, payload = 0) {
	return function (dispatch) {
		dispatch({
			type: filterType,
			payload: payload,
		})
	}
}

//Si se hace de la primera forma se rompe el estado de redux y no me trae nada:
/* export const getByName = (name) => {
	return (dispatch) => {
		const response = axios.get(LINK_GET_BREED_BY_NAME + name)
		dispatch({
			type: GET_BREED_BY_NAME,
			payload: response.data,
		})
	}
} */
