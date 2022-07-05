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
			<input className='search-input' placeholder='Search breed by name' size='20' type='text'></input>
		</form>
	)
}

/* <button type='submit'>Enter</button> */

export default SearchByName
