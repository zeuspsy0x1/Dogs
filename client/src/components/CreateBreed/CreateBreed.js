import axios from 'axios'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTemperaments } from '../../redux/actions'

function CreateVideogame() {
	const dispatch = useDispatch()
	const [breedName, setBreedName] = useState('')
	const [image, setImage] = useState('')
	const [minheight, setMinheight] = useState(0)
	const [minweight, setMinweight] = useState(0)
	const [maxheight, setMaxheight] = useState(0)
	const [maxweight, setMaxweight] = useState(0)
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
		//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOH
		return checkForSpecialChars(name) === false ? (
			<div className='correctInput'>Name looks ok</div>
		) : (
			<div className='error'>Name doesnt look like a real name</div>
		)
	}

	const validationImage = (image) => {
		return isImage(image) === true ? (
			<div className='correctInput'>Image link is ok.</div>
		) : (
			<div className='error'>Image link doesnt have an image url.</div>
		)
	}

	const validationheightMin = () => {
		return minheight > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}
	const validationheightMax = () => {
		return maxheight > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}

	const validationweightMin = () => {
		return minweight > 0 ? (
			<div className='correctInput'>This one is ok</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}
	const validationweightMax = () => {
		return maxweight > 0 ? (
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
	function checkForSpecialChars(str) {
		const specialChars = /[`!@1234567890#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
		return specialChars.test(str)
	}
	function isImage(url) {
		return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
	}

	const validateInputsThenSubmitVideogame = async (e) => {
		e.preventDefault()

		if (
			checkForSpecialChars(breedName) === false &&
			breedName.length > 1 &&
			isImage(image) === true &&
			image.length > 13 &&
			minheight !== 0 &&
			minweight !== 0 &&
			maxheight !== 0 &&
			maxweight !== 0 &&
			minLifeExpectancy !== 0 &&
			maxLifeExpectancy !== 0
		) {
			let newBreed = {
				breedName: breedName.toLowerCase(),
				image: image.length > 13 ? image : 'https://i.ibb.co/SVX03GV/pom404.png',
				height: `${minheight} - ${maxheight}`,
				weight: `${minweight} - ${maxweight}`,
				lifeExpectancy: `${minLifeExpectancy} - ${maxLifeExpectancy}`,
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
			alert('Please fill all the inputs with correct data')
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
					onChange={(e) => {
						setImage(e.target.value)
					}}></input>
				{validationImage(image)}

				<h4>Minimum height in cm</h4>
				<input
					type='number'
					onChange={(e) => {
						setMinheight(e.target.value)
					}}></input>
				{validationheightMin(minheight)}

				<h4>Maximum height in cm</h4>
				<input
					type='number'
					onChange={(e) => {
						setMaxheight(e.target.value)
					}}></input>
				<div>{validationheightMax(maxheight)}</div>

				<h4>Minimum weight in kg</h4>
				<input
					type='number'
					onChange={(e) => {
						setMinweight(e.target.value)
					}}></input>
				{validationweightMin(minweight)}

				<h4>Maximum weight in kg</h4>
				<input
					type='number'
					onChange={(e) => {
						setMaxweight(e.target.value)
					}}></input>
				{validationweightMax(maxweight)}

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
