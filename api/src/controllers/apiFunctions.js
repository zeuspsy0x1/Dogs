const axios = require('axios')
const { Breed, Temperament } = require('../db')
const { API_KEY } = process.env

const getBreeds = async () => {
	try {
		let breedsByName = await axios.get(`https://api.thedogapi.com/v1/breeds`)

		let breedObj = breedsByName.data?.map((b) => {
			return {
				image: b.image.url !== undefined ? b.image.url : 'no image :(',
				name: b.name ? b.name : 'no name :(',
				temperaments: b.temperament ? b.temperament.split(', ') : 'no temperament :(',
				weight: b.weight.metric ? b.weight.metric : 'no weight :(',
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
		let filteredByName = breeds.data.filter((b) => b.name.toLowerCase() === name.toLowerCase())
		if (filteredByName === undefined || filteredByName.length === 0) {
			return []
		}
		let fbn = filteredByName[0]

		let breedObjByName = {
			image: fbn.image.url !== undefined ? fbn.image.url : 'no image :(',
			name: fbn.name ? fbn.name : 'no name :(',
			temperaments: fbn.temperament ? fbn.temperament : 'no temperament :(',
			weight: fbn.weight.metric ? fbn.weight.metric : 'no weight :(',
		}
		//console.log(breedObj)
		return breedObjByName !== undefined ? [breedObjByName] : []
	} catch (error) {
		console.log('error in getBreedByName' + error)
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
			temperament: breedsById.data.temperament ? breedsById.data.temperament.split(', ') : 'no temperament :(',
			image: fetchImage.data.url ? fetchImage.data.url : 'no image :(',
			height: breedsById.data.height.metric ? breedsById.data.height.metric : 'no height :(',
			weight: breedsById.data.weight.metric ? breedsById.data.weight.metric : 'no weight :(',
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
