import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

function Card(props) {
	const navigate = useNavigate()

	const { name, image, id, temperaments, weight } = props

	const moveToDetailsOfTheBreed = () => {
		navigate(`/detail/${id}`)
	}

	let temperamentsArr = []

	if (temperaments === 'no temperament :(' || temperaments === undefined || temperaments.length === 0) {
		temperamentsArr.push(<li key={Math.random()}>{'There are not temperaments for this breed'}</li>)
	} else {
		temperamentsArr = temperaments.map((t) => {
			return <li key={t}>{t}</li>
		})
	}

	return (
		//Solo muestro 5 temperamentos para que no me rompa las cartas
		<>
			<div className='card-container' onClick={moveToDetailsOfTheBreed}>
				<img src={image} alt='img' className='img' />
				<div className='card-details'>
					<b>{name}</b>
					<ul>{temperamentsArr.slice(0, 4)}</ul>
					<div>Weight: {weight} kg</div>
				</div>
			</div>
		</>
	)
}

export default Card
