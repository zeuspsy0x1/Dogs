import axios from 'axios'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllBreeds, getByName, getByID, getTemperaments } from '../../redux/actions'

function CreateVideogame() {
	const dispatch = useDispatch()
	const [breedName, setBreedName] = useState('')
	const [image, setImage] = useState('')
	const [minHeight, setMinHeight] = useState(0)
	const [minWeight, setMinWeight] = useState(0)
	const [maxHeight, setMaxHeight] = useState(0)
	const [maxWeight, setMaxWeight] = useState(0)
	const [minLifeExpectancy, setMinLifeExpectancy] = useState(0)
	const [maxLifeExpectancy, setMaxLifeExpectancy] = useState(0)
	const [temperaments, setTemperaments] = useState([])
	//const [buttonSumbit, setButtonSumbit] = useState(false)

	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

	let temperamentsFromRedux = useSelector((state) => state.temperaments)

	let mappedTemperaments = temperamentsFromRedux.map((t) => {
		return (
			<Fragment key={t.name}>
				<option value={t.name}>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>
			</Fragment>
		)
	})

	const handleInputTemperaments = (e) => {
		e.preventDefault()
		if (temperaments.includes(e.target.value)) {
			let arr = temperaments.filter((t) => t !== e.target.value)
			setTemperaments(arr)
		} else setTemperaments([...temperaments, e.target.value])
	}

	//VALIDACIONES QUE SE RENDERIZAN EN EL FORM
	const validationName = (name) => {
		return name.length > 2 && name.length < 20 ? (
			<div className='correctInput'>Name length is ok</div>
		) : (
			<div className='error'>Name is too short or too long</div>
		)
	}

	const validationImage = (image) => {
		return image.length > 20 ? (
			<div className='correctInput'>Image link is valid</div>
		) : (
			<div className='error'>Image link is too short</div>
		)
	}

	const validationHeightMin = () => {
		return minHeight > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}
	const validationHeightMax = () => {
		return maxHeight > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}

	const validationWeightMin = () => {
		return minWeight > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}
	const validationWeightMax = () => {
		return maxWeight > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}

	const validationMinLifeExpectancy = () => {
		return minLifeExpectancy > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}

	const validationMaxLifeExpectancy = () => {
		return maxLifeExpectancy > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}

	//VALIDACIONES AL ENVIAR INPUT
	const validateInputsThenSubmitVideogame = async (e) => {
		e.preventDefault()

		if (
			breedName !== '' &&
			image !== '' &&
			minHeight !== 0 &&
			minWeight !== 0 &&
			maxHeight !== 0 &&
			maxWeight !== 0 &&
			minLifeExpectancy !== 0 &&
			maxLifeExpectancy !== 0
		) {
			let newBreed = {
				breedName: breedName,
				image: image,
				height: `${minHeight} - ${maxHeight}`,
				weight: `${minWeight} - ${maxWeight}`,
				lifeExpectancy: `${minLifeExpectancy} - ${maxLifeExpectancy} years`,
				temperaments: temperaments,
				createdInFront: true,
			}

			//console.log(JSON.stringify(videogame));
			let post = await axios.post(`http://localhost:5000/create`, newBreed)
			console.log(post.data)

			if (post.status === 200) {
				alert('Breed creation successfull')
			} else if (post.status !== 200) {
				alert(
					'Breed creation failed, change the name of the videogame, there cant be duplicated breed names so maybe that was the problem'
				)
			}
		} else {
			alert('Please fill all the inputs')
		}
	}

	return (
		<Fragment>
			<form>
				<div> Create a videogame here </div>
				<h4>Breed name</h4>
				<input
					name='name'
					onChange={(e) => {
						setBreedName(e.target.value)
					}}></input>
				{validationName(breedName)}

				<h4>Image link</h4>
				<input
					type={'link'}
					onChange={(e) => {
						setImage(e.target.value)
					}}></input>
				{validationImage(image)}

				<h4>Minimum Height in cm</h4>
				<input
					type='number'
					onChange={(e) => {
						setMinHeight(e.target.value)
					}}></input>
				{validationHeightMin(minHeight)}

				<h4>Maximum Height in cm</h4>
				<input
					type='number'
					onChange={(e) => {
						setMaxHeight(e.target.value)
					}}></input>
				<div>{validationHeightMax(maxHeight)}</div>

				<h4>Minimum Weight in kg</h4>
				<input
					type='number'
					onChange={(e) => {
						setMinWeight(e.target.value)
					}}></input>
				{validationWeightMin(minWeight)}

				<h4>Maximum Weight in kg</h4>
				<input
					type='number'
					onChange={(e) => {
						setMaxWeight(e.target.value)
					}}></input>
				{validationWeightMax(maxWeight)}

				<h4>Minimum Life Expectancy in years</h4>
				<input
					type='number'
					onChange={(e) => {
						setMinLifeExpectancy(e.target.value)
					}}></input>
				{validationMinLifeExpectancy(minLifeExpectancy)}

				<h4>Maximum Life Expectancy in years</h4>
				<input
					type='number'
					onChange={(e) => {
						setMaxLifeExpectancy(e.target.value)
					}}></input>
				{validationMaxLifeExpectancy()}

				<br />
				<br />

				<div>
					<h4>Temperaments</h4>
					{temperaments.length > 0 ? (
						temperaments.map((t) => <li key={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</li>)
					) : (
						<>Click some Platforms down here, remove them by clicking them again:</>
					)}
					<br />
					<select size='10' multiple onChange={(e) => handleInputTemperaments(e)}>
						{mappedTemperaments}
					</select>
				</div>

				<br />
				<br />
				<button type='submit' onClick={(e) => validateInputsThenSubmitVideogame(e)}>
					AAAAAAAA
				</button>
			</form>
		</Fragment>
	)
}

export default CreateVideogame
