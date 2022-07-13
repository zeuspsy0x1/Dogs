import { GET_ALL_BREEDS, GET_BREED_BY_ID, GET_ERROR, GET_BREED_BY_NAME, GET_TEMPERAMENTS } from './types'
import {
	FILTER_BREEDS_TEMPERAMENT,
	FILTER_BREEDS_MIN_WEIGHT,
	FILTER_BREEDS_MAX_WEIGHT,
	FILTER_BREEDS_CREATED,
	FILTER_BREEDS_A_TO_Z,
	FILTER_BREEDS_Z_TO_A,
	CLEAR_FILTERS,
	CLEAR_DETAILS,
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
				breedById: [],
				breeds: action.payload,
			}
		case GET_BREED_BY_ID:
			return {
				...state,
				breedById: action.payload,
			}
		case CLEAR_DETAILS:
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
				...state.breedsBackup.sort((a, b) => {
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
				...state.breedsBackup.sort((a, b) => {
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
			let min = [...state.breedsBackup].filter((b) => b.weight.includes('NaN') === false)
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
			let max = [...state.breedsBackup].filter((b) => b.weight.includes('NaN') === false)

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
				...state.breedsBackup.filter((b) => {
					return typeof b.id === 'string'
					//return b.id.length > 35 // Miro si el id es uuid, si si, es creado, si no no, ez
				}),
			]
			return {
				...state,
				filteredBreeds: created.length === 0 ? ['created is 0'] : created,
			}
		case FILTER_BREEDS_TEMPERAMENT:
			//console.log(action.payload)

			let arr = [...state.breedsBackup]
			//console.log(arr)
			let filtered = arr.filter((b) => {
				return b.temperaments.includes(action.payload.toLowerCase()) === true
			})

			return {
				...state,
				filteredBreeds: filtered,
			}

		case CLEAR_FILTERS:
			let filteredToSend = []
			let breedsToSend = []

			if (action.payload === 2) {
				//EL DOS SE LO MANDO EN EL SEARCHBREED COMPONENT, SIGNIFICA QUE ESTOY BUSCANDO POR NOMBRE Y QUIERO QUE ME SALGA ERROR SI NO HAY NINGUNA RAZA POR ESE NOMBRE
				filteredToSend = []
				breedsToSend = []
			}
			if (action.payload === 0) {
				filteredToSend = []
				breedsToSend = [...state.breedsBackup]
			}

			return {
				...state,
				filteredBreeds: filteredToSend,
				breeds: breedsToSend,
			}

		default:
			return state
	}
}
export default reducer
