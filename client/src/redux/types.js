//ACTION TYPE NAMES

export const GET_ALL_BREEDS = 'GET_ALL_BREEDS'
export const GET_BREED_BY_NAME = 'GET_BREED_BY_NAME'
export const GET_BREED_BY_ID = 'GET_BREED_BY_ID'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_ERROR = 'GET_ERROR'
export const FILTER_BREEDS_TEMPERAMENT = 'FILTER_BREEDS_TEMPERAMENT'
export const FILTER_BREEDS_MIN_WEIGHT = 'FILTER_BREEDS_MIN_WEIGHT'
export const FILTER_BREEDS_MAX_WEIGHT = 'FILTER_BREEDS_MAX_WEIGHT'
export const FILTER_BREEDS_CREATED = 'FILTER_BREEDS_CREATED'
export const FILTER_BREEDS_A_TO_Z = 'FILTER_BREEDS_A_TO_Z'
export const FILTER_BREEDS_Z_TO_A = 'FILTER_BREEDS_Z_TO_A'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'
export const CLEAR_DETAILS = 'CLEAR_DETAILS'

//LINKS TO BACKEND (REST PETITIONS)
export const LINK_GET_BREEDS = 'http://localhost:5000/breeds'
export const LINK_GET_BREED_BY_NAME = 'http://localhost:5000/breeds/name?name='
export const LINK_GET_BREED_BY_ID = 'http://localhost:5000/breeds/'
export const LINK_GET_TEMPERAMENTS = 'http://localhost:5000/temperaments'
export const LINK_POST_BREED = 'http://localhost:5000/create'
