import { GET_ALL_BREEDS, GET_BREED_BY_ID, GET_ERROR, GET_BREED_BY_NAME, GET_TEMPERAMENTS } from './types'
import {
	FILTER_BREEDS_TEMPERAMENT,
	FILTER_BREEDS_MIN_WEIGHT,
	FILTER_BREEDS_MAX_WEIGHT,
	FILTER_BREEDS_CREATED,
	FILTER_BREEDS_A_TO_Z,
	FILTER_BREEDS_Z_TO_A,
	CLEAR_FILTERS,
} from './types'
const initialState = {
	breeds: [],
	breedsBackup: [],
	filteredBreeds: [],
	temperaments: [],
	breedById: {},
	error: {},
}

const reducer = function (state = initialState, action) {
	switch (action.type) {
		//                                                          FETCH ALL INFORMATION
		case GET_ALL_BREEDS:
			return {
				...state,
				breeds: action.payload,
				breedsBackup: action.payload,
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
		case GET_ERROR:
			return {
				...state,
				error: action.payload,
			}
		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			}
		//                                                          FILTERS
		case FILTER_BREEDS_A_TO_Z:
			let atz = [
				...state.breeds.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) {
						return 1
					}
					if (a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1
					}
					return 0
				}),
			]
			return {
				...state,
				filteredBreeds: atz,
			}
		case FILTER_BREEDS_Z_TO_A:
			let zta = [
				...state.breeds.sort((a, b) => {
					if (a.name.toLowerCase() < b.name.toLowerCase()) {
						return 1
					}
					if (a.name.toLowerCase() > b.name.toLowerCase()) {
						return -1
					}
					return 0
				}),
			]
			return {
				...state,
				filteredBreeds: zta,
			}

		case FILTER_BREEDS_MIN_WEIGHT:
			//SACO DE WEIGHT Y HEIGHT LOS PERROS QUE TIENEN NaN EN ESOS DATOS
			let min = [...state.breeds].filter((b) => b.weight.includes('NaN') === false)
			let minWeight = [
				min.sort((a, b) => {
					let aaa = a.weight.split(' - ').reduce((bef, aft) => (parseInt(bef) + parseInt(aft)) / 2)
					let bbb = b.weight.split(' - ').reduce((bef, aft) => (parseInt(bef) + parseInt(aft)) / 2)
					return aaa - bbb //EXP, SI A ES MAYOR A B, A PASA A LA DERECHA Y B A LA IZQ
				}),
			]
			return {
				...state,
				filteredBreeds: minWeight[0],
			}
		case FILTER_BREEDS_MAX_WEIGHT:
			let max = [...state.breeds].filter((b) => b.weight.includes('NaN') === false)

			let maxWeight = [
				max.sort((a, b) => {
					let aaa = a.weight.split(' - ').reduce((bef, aft) => (parseInt(bef) + parseInt(aft)) / 2)
					let bbb = b.weight.split(' - ').reduce((bef, aft) => (parseInt(bef) + parseInt(aft)) / 2)
					return bbb - aaa
				}),
			]
			return {
				...state,
				filteredBreeds: maxWeight[0],
			}

		case FILTER_BREEDS_CREATED:
			let created = [
				...state.breeds.filter((b) => {
					return typeof b.id === 'string'
					//return b.id.length > 35 // Miro si el id es uuid, si si, es creado, si no no, ez
				}),
			]
			return {
				...state,
				filteredBreeds: created.length === 0 ? ['created is 0'] : created,
			}
		case FILTER_BREEDS_TEMPERAMENT:
			console.log(action.payload)

			let arr = [...state.breeds]
			console.log(arr)
			let filtered = arr.filter((b) => {
				return b.temperaments.includes(action.payload.toLowerCase()) === true
			})

			return {
				...state,
				filteredBreeds: filtered,
			}

		case CLEAR_FILTERS:
			return {
				...state,
				filteredBreeds: [],
				breeds: [...state.breedsBackup],
			}

		default:
			return state
	}
}
export default reducer
