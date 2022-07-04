const axios = require('axios')
const { Breed, Temperament } = require('../db')
const { API_KEY } = process.env

const getTemperamentsAndSendThemToDb = async () => {
	try {
		let InDbOrNot = await Temperament.findAll()

		if (InDbOrNot.length === 124) {
			console.log('NICE!-all temperaments are in db')
		}

		if (InDbOrNot.length < 124) {
			let get = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
			let res = get.data.map((breed) => breed.temperament)
			let temperaments = res.join(', ').toLowerCase()
			let pushos = []
			temperaments.split(', ').map((t) => pushos.push(t))
			let notDuplicatedTempsCheck = []

			for (let i = 0; i < pushos.length; i++) {
				if (!notDuplicatedTempsCheck.includes(pushos[i])) {
					notDuplicatedTempsCheck.push(pushos[i])
				}
			}
			notDuplicatedTempsCheck = notDuplicatedTempsCheck.filter((t) => t.length > 0)
			notDuplicatedTempsCheck = notDuplicatedTempsCheck.sort()

			if (notDuplicatedTempsCheck.length > 0) {
				for (let i = 0; i < notDuplicatedTempsCheck.length; i++) {
					await Temperament.findOrCreate({ where: { name: notDuplicatedTempsCheck[i] } })
				}
			}
			console.log(
				'NICE!-all temperaments should be in db now, if you dont see them refresh pg or restart the server'
			)
		}
	} catch (error) {
		console.log('an error occurred when trying to get the temperaments' + error)
	}
}

const getBreedsFromDb = async () => {
	try {
		let breeds = await Breed.findAll({
			include: [
				{
					model: Temperament,
					as: 'temperaments',
					attributes: ['name'],
				},
			],
		})
		//console.log(breeds.map((b) => b.dataValues))
		let mappedDbBreeds = breeds.map((b) => {
			return {
				id: b.dataValues.id ? b.dataValues.id : Math.random(),
				image: b.dataValues.image ? b.dataValues.image : 'https://i.ibb.co/SVX03GV/pom404.png',
				name: b.dataValues.breedName ? b.dataValues.breedName : 'no name',
				temperaments: b.dataValues.temperaments
					? b.dataValues.temperaments.map((t) => t.dataValues.name)
					: 'no temperaments',
				weight: b.dataValues.weight ? b.dataValues.weight : '0',
			}
		})

		return mappedDbBreeds !== undefined ? [mappedDbBreeds] : []
	} catch (error) {
		console.log('an error occurred when trying to fetch all Breeds from db' + error)
	}
}

const findBreedByNameInDb = async (name) => {
	try {
		let breeds = await Breed.findAll({
			include: [
				{
					model: Temperament,
					as: 'temperaments',
					attributes: ['name'],
				},
			],
		})
		//console.log('breeds   ' + breeds[0].dataValues.breedName)

		let filteredByName = breeds.filter(
			(b) => b.dataValues.breedName?.toLowerCase().includes(name.toLowerCase()) === true
		)
		//console.log('filtered   ' + filteredByName)
		if (filteredByName === undefined || filteredByName.length === 0) {
			return []
		}
		let mappedDbBreeds = filteredByName.map((b) => {
			return {
				id: b.dataValues.id ? b.dataValues.id : Math.random(),
				image: b.dataValues.image ? b.dataValues.image : 'https://i.ibb.co/SVX03GV/pom404.png',
				name: b.dataValues.breedName ? b.dataValues.breedName : 'no name',
				temperaments: b.dataValues.temperaments
					? b.dataValues.temperaments.map((t) => t.dataValues.name)
					: 'no temperaments',
				weight: b.dataValues.weight ? b.dataValues.weight : '0',
			}
		})

		return mappedDbBreeds !== undefined ? [mappedDbBreeds] : []
	} catch (error) {
		console.log('an error occurred when trying to fetch Breeds BY NAME from db' + error)
	}
}
//getBreedsFromDb()
//NO LA NECESITO, MEJOR ME TRAIGO TODO LO DE LA DB Y LO FILTRO A VER SI CONTIENEN EL NOMBRE QUE LE PASE POR LA URL
/* const findBreedInDb = async (name) => {
	try {
		let breedInDb = await Breed.findOne({
			where: { breedName: name },
			include: [
				{
					model: Temperament,
					as: 'temperaments',
					attributes: ['name'],
				},
			],
		})

		let breed = breedInDb.dataValues
		console.log(breed)

		let breedObj = {
			id: breed.id ? breed.id : Math.random(),
			image: breed.image.url !== undefined ? breed.image.url : 'https://i.ibb.co/SVX03GV/pom404.png',
			name: breed.breedName ? breed.breedName : 'no name :(',
			temperaments: breed.temperaments ? breed.temperaments.map((t) => t.name) : 'no temperament :(',
			weight: breed.weight ? breed.weight : 'no weight :(',
		}
		return breedObj ? [breedObj] : []
	} catch (error) {
		console.log('an error occurred when trying to find the breed in db' + error)
	}
} */

const findBreedByIdInDb = async (id) => {
	try {
		let breedInDb = await Breed.findOne({
			where: { id: id },
			include: [
				{
					model: Temperament,
					as: 'temperaments',
					attributes: ['name'],
				},
			],
		})

		let breed = breedInDb.dataValues
		console.log('ESSSSSSSSTEEEEEEEEEEE' + breed)

		let breedObj = {
			image: breed.image ? breed.image : 'https://i.ibb.co/SVX03GV/pom404.png',
			name: breed.breedName ? breed.breedName : 'no name :(',
			temperaments: breed.temperaments ? breed.temperaments.map((t) => t.name) : 'no temperament :(',
			weight: breed.weight ? breed.weight : '0',
			height: breed.height ? breed.height : '0',
			lifeExpectancy: breed.lifeExpectancy ? breed.lifeExpectancy : 'no life expectancy data :(',
		}
		return breedObj ? [breedObj] : []
	} catch (error) {
		console.log('an error occurred when trying to find the breed in db' + error)
	}
}

module.exports = {
	getTemperamentsAndSendThemToDb,
	getBreedsFromDb,
	findBreedByNameInDb,
	findBreedByIdInDb,
}
