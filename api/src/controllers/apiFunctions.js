const axios = require('axios')
const { Breed, Temperament } = require('../db')
const { API_KEY } = process.env

const getBreeds = async () => {
	try {
		let breedsByName = await axios.get(`https://api.thedogapi.com/v1/breeds`)

		let breedObj = breedsByName.data?.map((b) => {
			return {
				id: b.id ? b.id : Math.random(),
				image: b.image.url !== undefined ? b.image.url : 'https://i.ibb.co/SVX03GV/pom404.png',
				name: b.name ? b.name : 'no name :(',
				temperaments: b.temperament ? b.temperament.toLowerCase().split(', ') : 'no temperament :(',
				weight: b.weight.metric !== NaN && b.weight.metric !== undefined ? b.weight.metric : '0',
			}
		})
		//console.log(breedObj)
		return breedObj !== undefined ? [breedObj] : []
	} catch (error) {
		console.log('error in getBreedByName' + error)
	}
}

const getBreedsByName = async (name) => {
	try {
		//console.log(name)
		let breeds = await axios.get(`https://api.thedogapi.com/v1/breeds`)
		let filteredByName = breeds.data.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()) === true)
		if (filteredByName === undefined || filteredByName.length === 0) {
			return []
		}
		let fbn = filteredByName?.map((b) => {
			return {
				id: b.id ? b.id : Math.random(),
				image: b.image.url !== undefined ? b.image.url : 'https://i.ibb.co/SVX03GV/pom404.png',
				name: b.name ? b.name : 'no name :(',
				temperaments: b.temperament ? b.temperament.toLowerCase().split(', ') : 'no temperament :(',
				weight: b.weight.metric ? b.weight.metric : '0',
			}
		})

		//console.log(breedObj)
		return fbn !== undefined ? [fbn] : []
	} catch (error) {
		console.log('error in getBreedsByName' + error)
	}
}

const getBreedsById = async (id) => {
	try {
		if (id.toString().length > 7) {
			return []
		}
		let breedsById = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)

		if (Object.keys(breedsById).length === 0) {
			return []
		}

		let img = breedsById.data.reference_image_id
		let fetchImage = await axios.get(`https://api.thedogapi.com/v1/images/${img}`)

		let breedByIdOk = {
			name: breedsById.data.name ? breedsById.data.name : 'no name :(',
			temperaments: breedsById.data.temperament
				? breedsById.data.temperament.toLowerCase().split(', ')
				: 'no temperament :(',
			image: fetchImage.data.url ? fetchImage.data.url : 'https://i.ibb.co/SVX03GV/pom404.png',
			height: breedsById.data.height.metric ? breedsById.data.height.metric : '0',
			weight:
				breedsById.data.weight.metric !== NaN && breedsById.data.weight.metric !== undefined
					? breedsById.data.weight.metric
					: '0',
			lifeExpectancy: breedsById.data.life_span ? breedsById.data.life_span : 'no life_span :(',
		}

		return breedByIdOk !== undefined ? [breedByIdOk] : []
	} catch (error) {
		console.log('error in getBreedsById' + error)
	}
}

module.exports = {
	getBreedsByName,
	getBreedsById,
	getBreeds,
}
