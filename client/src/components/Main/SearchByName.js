import React from 'react'
import { useDispatch } from 'react-redux'
import { getByName, filtersActionFunction } from '../../redux/actions'
import { CLEAR_FILTERS } from '../../redux/types'

function SearchByName({ setPage }) {
	const dispatch = useDispatch()

	let handleTitleSubmit = (e) => {
		e.preventDefault()
		dispatch(filtersActionFunction(CLEAR_FILTERS, 2))
		dispatch(getByName(e.target[0].value))
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				handleTitleSubmit(e)
				setPage(1)
				document.getElementById('nameInputToClear').value = ''
			}}>
			<input
				id='nameInputToClear'
				className='search-input'
				placeholder='Search breed by name'
				size='20'
				type='text'></input>
		</form>
	)
}

/* <button type='submit'>Enter</button> */

export default SearchByName
