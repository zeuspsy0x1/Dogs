import React from 'react'
import { useDispatch } from 'react-redux'
import { getByName, filtersActionFunction } from '../../redux/actions'
import { CLEAR_FILTERS } from '../../redux/types'

function SearchByName() {
	const dispatch = useDispatch()

	let handleTitleSubmit = (e) => {
		e.preventDefault()
		dispatch(filtersActionFunction(CLEAR_FILTERS))
		dispatch(getByName(e.target[0].value))
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				handleTitleSubmit(e)
			}}>
			<input type='text'></input>
			<button type='submit'>Click to search recipe name</button>
		</form>
	)
}

export default SearchByName
