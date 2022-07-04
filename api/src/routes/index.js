const { Router } = require('express')
const { Breed, Temperament } = require('../db')
const { getBreedsByName, getBreedsById, getBreeds } = require('../controllers/apiFunctions')
const { getBreedsFromDb, findBreedByNameInDb, findBreedByIdInDb } = require('../controllers/dbFunctions')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router()

//MAIN ROUTES
router.get('/breeds', async function (req, res) {
	let response = await getBreeds()
	let dbResponse = await getBreedsFromDb()

	if (response.length >= 1 && dbResponse.length >= 1) {
		const concatenationOfDbAndApi = [...dbResponse[0], ...response[0]]
		return res.status(200).json(concatenationOfDbAndApi)
	}
	if (response.length > 0 && dbResponse.length === 0) {
		let ApiData = [...response]
		return res.status(200).json(ApiData)
	}
	if (response.length === 0 && dbResponse.length > 0) {
		let dbData = [...dbResponse]
		return res.status(200).json(dbData)
	} else if (response.length === 0 && dbResponse.length === 0) {
		return res.status(400).json({ message: 'there was a problem fetching all breeds' })
	}
})
//http://localhost:5000/breeds/name?name=pug
router.get('/breeds/name?', async function (req, res) {
	const { name } = req.query
	let response = await getBreedsByName(name)
	let dbResponse = await findBreedByNameInDb(name)

	if (dbResponse === undefined) {
		// ESTO ES PORQUE LA getBreedsByName() ME DEVUELVE UNDEFINDED :( ???
		dbResponse = []
	}
	if (response === undefined) {
		// ESTO ES PORQUE LA findBreedInDb() ME DEVUELVE UNDEFINDED :( ???
		response = []
	}
	//console.log('RESPONSE ===' + response)
	//console.log('DBRESPONSE ===' + dbResponse)
	if (response.length >= 1 && dbResponse.length >= 1) {
		const concatenationOfDbAndApi = [...dbResponse[0], ...response[0]]
		return res.status(200).json(concatenationOfDbAndApi)
	}

	if (response.length >= 1 && dbResponse.length === 0) {
		let ApiData = [...response]
		return res.status(200).json(ApiData[0])
	}
	if (response.length === 0 && dbResponse.length >= 1) {
		let dbData = [...dbResponse]
		return res.status(200).json(dbData)
	} else if (response.length === 0 && dbResponse.length === 0) {
		return res.status(400).json({ message: 'There are 0 breeds with that name :(' })
	}
})
router.get('/breeds/:id', async function (req, res) {
	const { id } = req.params
	//con este for miro a ver si el id vale la pena buscarlo en la db
	if (id.toString().length > 7 && id.toString().length < 36) {
		return res.status(400).json({
			message:
				'The id should have only numbers and be under 10.000 OR it has to be a 36 characters string (UUIDV4)',
		})
	}

	let response = []
	let dbResponse = []

	if (id.toString().length < 7) {
		response = await getBreedsById(id)
	}
	if (id.toString().length === 36) {
		dbResponse = await findBreedByIdInDb(id)
	}

	if (response.length > 0) {
		return res.status(200).json(response[0] ? response[0] : {})
	}
	if (dbResponse.length > 0) {
		return res.status(200).json(dbResponse[0] ? dbResponse[0] : {})
	}

	if (true) {
		return res.status(400).json({ message: 'There are 0 breeds with that id :(' })
	}
})
router.get('/temperaments', async function (req, res) {
	let response = await Temperament.findAll()

	if (response.length > 0) {
		return res.status(200).json(response)
	} else {
		return res.status(400).json({ message: 'There was a problem fetching the temperaments from db' })
	}
})

//ACLARACION, SI SE LE PASA un nombre que ya existe en db, /createbreed DA ERROR el post Y SI SE LE PASA UN OBJ CON NOMBRE DE BREED QUE YA EXISTE EN DB, MANDA ERROR
router.post('/create', async function (req, res) {
	const { breedName, temperaments, image, weight, height, lifeExpectancy, createdInFront } = req.body

	let flag = await Breed.findOne({ where: { breedName: breedName || 'name was undefined' } })
	//console.log('flag', flag)

	let breedToCreate = {
		breedName: breedName || 'name was undefined',
		image: image,
		height: height,
		weight: weight,
		lifeExpectancy: lifeExpectancy,
		createdInFront: createdInFront,
	}

	//console.log(temperamentArr)

	if (flag === null) {
		let resultOfCreating = await Breed.create(breedToCreate)
		for (let i = 0; i < temperaments.length; i++) {
			await resultOfCreating.addTemperament(temperaments[i].toLowerCase())
		}
		let secondFlag = await Breed.findOne({
			where: { breedName: breedName },
		})
		if (secondFlag !== null) {
			return res.status(200).json({ message: 'Breed post successful' })
		} else {
		}
	}
	return res.status(400).json({ message: 'There was a problem posting the breed, try a different name' })
})

module.exports = router
