import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Pagination from './Pagination'
import AllBreeds from './AllBreeds'
import SearchByName from './SearchByName'
import { getAllBreeds, getTemperaments, filtersActionFunction } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import {
	FILTER_BREEDS_TEMPERAMENT,
	FILTER_BREEDS_MIN_WEIGHT,
	FILTER_BREEDS_MAX_WEIGHT,
	FILTER_BREEDS_CREATED,
	FILTER_BREEDS_A_TO_Z,
	FILTER_BREEDS_Z_TO_A,
	CLEAR_FILTERS,
} from '../../redux/types'
import './Main.css'
import greenPaw from '../../utils/greenPaw.png'
import LoadingComponent from '../Loading'

function Main() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllBreeds())
		dispatch(getTemperaments())
	}, [dispatch])

	const navigate = useNavigate()
	const navigateToPostBreed = () => {
		navigate('/create')
	}
	const navigateToLanding = () => {
		navigate('/')
	}

	////////////////////////////////////////////////////////////    REDUX STATES
	let breeds = useSelector((state) => state.breeds)
	//console.log(breeds)
	let filteredBreeds = useSelector((state) => state.filteredBreeds)
	//console.log(filteredBreeds)
	let temperaments = useSelector((state) => state.temperaments)
	//console.log(filteredBreeds)

	////////////////////////////////////////////////////////////     PAGINATION THINGS
	const [page, setPage] = useState(1)
	const indexOfLastItem = page * 8 // 8 son las razas por pagina //1x8=8 2x8=16 3x8=24 4x8=32 5x8=40 6x8=48
	const indexOfFirstItem = indexOfLastItem - 8

	// funcion para pasarle al componente paginate, para que setee la pagina al darle click al numero
	const paginate = (number) => {
		setPage(number)
	}
	let alert=(error)=>{
		Swal.fire({
			text: error,
			icon: 'error',
			confirmButtonText: 'Continue'
		  })
		
		dispatch(getAllBreeds()) 
		
	}
	//////////////////////////////////////////////////////////// RENDERER function
	let renderer = () => {
		if (breeds[0] === 'no dog' || breeds === undefined) {
			return alert('There are 0 breeds by that name.')
		}
		if (filteredBreeds[0] === 'created is 0') {
			return alert('There is nothing to show by that filter.')
		}
		if (filteredBreeds.length > 0) {
			let currentItems = filteredBreeds.slice(indexOfFirstItem, indexOfLastItem)
			return <AllBreeds allBreeds={currentItems} />
		} else {
			let currentItems = breeds.slice(indexOfFirstItem, indexOfLastItem)
			return <AllBreeds allBreeds={currentItems} />
		}
	}

	//////////////////////////////////////////////////////////// TEMPERAMENTS MAP
	let mappedTemperaments = temperaments?.map((t) => {
		return <option key={t.name}>{t.name}</option>
	})

	return (
		<div className='main-container'>
			
			<img onClick={navigateToLanding} className='main-homeImg' src={greenPaw} alt='ajndiawud'></img>
		
		<div className='main-functionalityrow'>
			<div className='main-searchbar'>
				<SearchByName setPage={setPage} />
			</div>
			{/* FILTROS DE TEMPERAMENTO */}
			<select
				id='temperamentfilters'
				className='main-filter-temperament'
				onChange={(e) => {
					dispatch(filtersActionFunction(FILTER_BREEDS_TEMPERAMENT, e.target.value))
					setPage(1)
				}}>
				<option value='none'> Pick a temperament </option>
				{mappedTemperaments}
			</select>

				{/* ORDENAMIENTOS */}
			<select
				id='generalfilters'
				className='main-filter-general'
				onChange={(e) => dispatch(filtersActionFunction(e.target.value))}>
				<option value='none'> Select order </option>
				<option value={FILTER_BREEDS_MIN_WEIGHT}>By min weight</option>
				<option value={FILTER_BREEDS_MAX_WEIGHT}>By max weight</option>
				<option value={FILTER_BREEDS_A_TO_Z}>A - Z</option>
				<option value={FILTER_BREEDS_Z_TO_A}>Z - A</option>
				<option value={FILTER_BREEDS_CREATED}>Created</option>
			</select>
			<button
				className='main-button-clear-filters'
				onClick={() => {
					dispatch(filtersActionFunction(CLEAR_FILTERS))
					setPage(1)
					document.getElementById('generalfilters').value = 'none'
					document.getElementById('temperamentfilters').value = 'none'
				}}>
				Clear filters
			</button>

			<button className='main-button-post-breed' onClick={navigateToPostBreed}>
				Create Breed
			</button>

	</div>
			<div className='main-pagination-buttons'>
				{filteredBreeds.length > 0 ? (
					<Pagination breeds={filteredBreeds} paginate={paginate} />
				) : (
					<Pagination breeds={breeds} paginate={paginate} />
				)}
			</div>
			<div className='main-cards-renderer'>
				{breeds.length > 0 || filteredBreeds.length > 0 ? renderer() : <LoadingComponent />}
			</div>
		</div>
	)
}

export default Main
