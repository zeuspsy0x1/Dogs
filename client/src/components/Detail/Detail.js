import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import greenPaw from '../../utils/greenPaw.png'
import { getById } from '../../redux/actions'
import './Detail.css'
//el click a cada carta de todos los juegos, abre Detail, nada mas.
//si le dan click a una, se toma el id de esa carta y se manda a Detail.
//detail hace fetch con ese id y trae toda la info de ese juego.

//Con el useParams traigo el id del videojuego que busco desde la url ej. localhost/detail/69
function Detail() {
	const dispatch = useDispatch()
	const params = useParams()

	useEffect(() => {
		//console.log(params.id)
		dispatch(getById(params.id))
	}, [dispatch, params.id])

	const breedById = useSelector((state) => state.breedById)
	console.log(breedById)

	if (breedById.error) {
		return <div>There is no breed by that id</div>
	}

	let breed = breedById

	let temperamentsArr = []

	if (Array.isArray(breed.temperaments)) {
		temperamentsArr = breed.temperaments?.map((t) => {
			return <li key={t.toString()}>{t.charAt(0).toUpperCase() + t.slice(1)}</li>
		})
	} else {
		temperamentsArr = <>No temperaments for this breed</>
	}

	let img = breed.image

	return (
		<>
			<div className='detail-container'>
				<Link to='/main'>
					<img className='main-homeImg' src={greenPaw} alt='ajndiawud'></img>
				</Link>
				<div className='detail-card-container'></div>

				<div className='detail-title-text'> {breed.name}</div>
				<img src={img} alt='img not found' className='detail-card-img' />

				<div className='detail-line'></div>
				<div className='detail-breedDetails'>
					<div>Height:    {breed.height} cm</div>
					<div>Weight:   {breed.weight} kg</div>
					<div>Life Span:  {breed.lifeExpectancy}</div>
				</div>
				<div className='detail-title-text-temperaments'>Temperaments:</div>
				<ul className='detail-temperaments'>{temperamentsArr}</ul>
			</div>
		</>
	)
}

export default Detail
