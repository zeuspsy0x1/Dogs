import React from 'react'
import axios from 'axios'

//validaciones que se renderizan
export const validationName = (name) => {
	return name.length > 2 && name.length < 20 ? (
		<div className='correctInput'>Name length is ok</div>
	) : (
		<div className='error'>Name is too short or too long</div>
	)
}

export const validationImage = (image) => {
	return image.length > 20 ? (
		<div className='correctInput'>Image link is valid</div>
	) : (
		<div className='error'>Image link is too short</div>
	)
}

export const validationHeightMin = (heightMin) => {
	return heightMin !== 0 && Number.isInteger(heightMin) ? (
		<div className='correctInput'>This one is ok</div>
	) : (
		<div className='error'>This should be a number</div>
	)
}
export const validationHeightMax = (heightMax) => {
	return heightMax !== 0 && Number.isInteger(heightMax) ? (
		<div className='correctInput'>This one is ok</div>
	) : (
		<div className='error'>This should be a number</div>
	)
}

export const validationWeightMin = (weightMin) => {
	return weightMin !== 0 && Number.isInteger(weightMin) ? (
		<div className='correctInput'>This one is ok</div>
	) : (
		<div className='error'>This should be a number</div>
	)
}
export const validationWeightMax = (weightMax) => {
	return weightMax !== 0 && Number.isInteger(weightMax) ? (
		<div className='correctInput'>This one is ok</div>
	) : (
		<div className='error'>This should be a number</div>
	)
}

export const validationMinLifeExpectancy = (minLifeExpectancy) => {
	Number.isInteger(minLifeExpectancy) ? (
		<div className='correctInput'>This one is ok</div>
	) : (
		<div className='error'>This should be a number</div>
	)
}

export const validationMaxLifeExpectancy = (num) => {
	console.log(num)

	if (typeof num === 'number') {
		return <div className='correctInput'>This one is ok</div>
	}
	if (typeof num !== 'number') {
		return <div className='error'>This should be a number</div>
	}

	/* return typeof num === 'number' ? (
		<div className='correctInput'>This one is ok</div>
	) : (
		<div className='error'>This should be a number</div>
	) */
}
