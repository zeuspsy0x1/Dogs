/* eslint-disable no-useless-escape */
import axios from 'axios'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTemperaments, setDetailObj } from '../../redux/actions'
import './CreateBreed.css'
import greenPaw from '../../utils/greenPaw.png'

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
		return () => {
			dispatch(setDetailObj())
		}
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
		if (name.length > 0) {
			return checkForSpecialChars(name) === false ? (
				<div className='correctInput'>Name looks ok</div>
			) : (
				<div className='error'>Name doesnt look like a real name</div>
			)
		} else return <div className='error'>Name doesnt look like a real name.</div>
	}

	const validationImage = (image) => {
		return isImage(image) === true ? (
			<div className='correctInput'>Image link is ok.</div>
		) : (
			<div className='error'>Image link doesnt have an image url, or it doesnt end in png, jpg...</div>
		)
	}

	const validationheightMin = () => {
		return minheight > 0 ? (
			<div className='correctInput'>Perfect</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}
	const validationheightMax = () => {
		return minheight < parseInt(maxheight) ? (
			<div className='correctInput'>Perfect</div>
		) : (
			<div className='error'>
				This should be a number greater than 0, and it cant be lower than minimum height
			</div>
		)
	}

	const validationweightMin = () => {
		return minweight > 0 ? (
			<div className='correctInput'>Perfect</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}
	const validationweightMax = () => {
		return minweight < parseInt(maxweight) ? (
			<div className='correctInput'>Perfect</div>
		) : (
			<div className='error'>
				This should be a number greater than 0, and it cant be lower than minimum weight
			</div>
		)
	}

	const validationMinLifeExpectancy = () => {
		return minLifeExpectancy > 0 ? (
			<div className='correctInput'>Perfect</div>
		) : (
			<div className='error'>This should be a number greater than 0</div>
		)
	}

	const validationMaxLifeExpectancy = () => {
		return minLifeExpectancy < parseInt(maxLifeExpectancy) ? (
			<div className='correctInput'>Perfect</div>
		) : (
			<div className='error'>
				This should be a number greater than 0, and it cant be lower than minimum life span
			</div>
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
			image.length > 10 &&
			parseInt(minheight) > 0 &&
			parseInt(minweight) > 0 &&
			parseInt(maxheight) > 0 &&
			parseInt(maxweight) > 0 &&
			parseInt(minLifeExpectancy) > 0 &&
			parseInt(maxLifeExpectancy) > 0 &&
			parseInt(minheight) < parseInt(maxheight) &&
			parseInt(minweight) < parseInt(maxweight) &&
			parseInt(minLifeExpectancy) < parseInt(maxLifeExpectancy)
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
		<>
			<form className='cb-container'>
				<div className='pawImage'>
					<Link to='/main'>
						<img className='pawImage' src={greenPaw} alt='ajndiawud'></img>
					</Link>
				</div>
				<div className='create-breed-title-main'> Create a new Breed </div>

				<h4 className='create-breed-titles localizationName'>Name</h4>
				<div className='localizationInputName'>
					<input
						className='inputCSS'
						name='name'
						placeholder='Breed name'
						onChange={(e) => {
							setBreedName(e.target.value)
						}}></input>
					{validationName(breedName)}
				</div>

				<h4 className='create-breed-titles localizationImage'>Image</h4>
				<div className='localizationInputImage'>
					<input
						className='inputCSS'
						placeholder='Image link'
						onChange={(e) => {
							setImage(e.target.value)
						}}></input>
					{validationImage(image)}
				</div>

				<h4 className='create-breed-titles localizationHeight'>Height</h4>
				<div className='localizationInputMinHeight'>
					<input
						className='inputCSS'
						type='number'
						placeholder='Min height in cm'
						onChange={(e) => {
							setMinheight(Math.floor(e.target.value))
						}}></input>
					{validationheightMin(minheight)}
				</div>
				<div className='localizationInputMaxHeight'>
					<input
						className='inputCSS'
						type='number'
						placeholder='Max height in cm'
						onChange={(e) => {
							setMaxheight(Math.floor(e.target.value))
						}}></input>
					{validationheightMax(maxheight)}
				</div>

				<h4 className='create-breed-titles localizationWeight'>Weight</h4>
				<div className='localizationInputMinWeight'>
					<input
						type='number'
						className='inputCSS'
						placeholder='Min weight in kg'
						onChange={(e) => {
							setMinweight(Math.floor(e.target.value))
						}}></input>
					{validationweightMin(minweight)}
				</div>

				<div className='localizationInputMaxWeight'>
					<input
						className='inputCSS'
						type='number'
						placeholder='Max weight in kg'
						onChange={(e) => {
							setMaxweight(Math.floor(e.target.value))
						}}></input>
					{validationweightMax(maxweight)}
				</div>

				<h4 className='create-breed-titles localizationLifeSpan'>Life span </h4>
				<div className='localizationInputMinLifeSpan'>
					<input
						className='inputCSS'
						type='number'
						placeholder='Min life in years'
						onChange={(e) => {
							setMinLifeExpectancy(Math.floor(e.target.value))
						}}></input>
					{validationMinLifeExpectancy(minLifeExpectancy)}
				</div>

				<div className='localizationInputMaxLifeSpan'>
					<input
						className='inputCSS'
						type='number'
						placeholder='Max life in years'
						onChange={(e) => {
							setMaxLifeExpectancy(Math.floor(e.target.value))
						}}></input>
					{validationMaxLifeExpectancy()}
				</div>

				<div className='localizationTemperaments create-breed-titles'>
					<h4 className='create-breed-titles-temperamentssc'>Temperaments</h4>
					<select
						className='selectTemperaments'
						size='10'
						multiple
						onChange={(e) => handleInputTemperaments(e)}>
						{mappedTemperaments}
					</select>
					<h4 className=''>Selected:</h4>
					<div className='locationSelected'>
						{temperaments.length > 0 ? (
							temperaments.map((t) => (
								<li className='selected' key={t}>
									{t.charAt(0).toUpperCase() + t.slice(1)}
								</li>
							))
						) : (
							<div className='error'>Click some temperaments, remove them by clicking them again.</div>
						)}
					</div>
				</div>
				<div className='cbline'></div>
				<button
					className='cb-button-create'
					type='submit'
					onClick={(e) => validateInputsThenSubmitVideogame(e)}>
					Create Breed
				</button>
			</form>
		</>
	)
}

export default CreateVideogame
