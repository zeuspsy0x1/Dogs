const { Router } = require('express')
const dbFunctions = require('../controllers/dbFunctions')
const { Breed, Temperament } = require('../db')
const { getBreedsByName, getBreedsById, getBreeds } = require('../controllers/apiFunctions')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/breeds', async function (req, res) {
	let response = await getBreeds()

	if (response.length > 0) {
		res.status(200).json(response)
	} else {
		res.status(400).json({ message: 'there was a problem fetching all breeds' })
	}
})

//breed?
router.get('/breeds/name?', async function (req, res) {
	const { name } = req.query
	let response = await getBreedsByName(name)

	if (response.length > 0) {
		//console.log(response)
		res.status(200).json(response)
	} else {
		res.status(400).json({ message: 'There are 0 breeds by that name :(' })
	}
})

router.get('/breeds/:id', async function (req, res) {
	let response = await getBreedsById(req.params.id)
	//console.log(response)
	if (response !== undefined && response !== {}) {
		res.status(200).json(response)
	} else {
		res.status(400).json({ message: 'There are 0 breeds by that id :(' })
	}
})
router.get('/temperaments', async function (req, res) {
	let response = await Temperament.findAll()

	if (response.length > 0) {
		res.status(200).json(response)
	} else {
		res.status(400).json({ message: 'There was a problem fetching the temperaments from db' })
	}
})

//ACLARACION, SI SE LE PASA EL MISMO NOMBRE, DA ERROR Y SI SE LE PASA UN OBJ CON NOMBRE DE BREED QUE YA EXISTE EN DB, MANDA ERROR
router.post('/createBreed', async function (req, res) {
	const { breedName, temperament, image, weight, height, lifeExpectancy, createdInFront } = req.body

	let flag = await Breed.findOne({ where: { breedName: breedName } })
	//console.log('flag', flag)

	let breedToCreate = {
		breedName: breedName,
		temperament: temperament,
		image: image,
		height: height,
		weight: weight,
		lifeExpectancy: lifeExpectancy,
		createdInFront: createdInFront,
	}

	let temperamentArr = temperament.split(', ')
	//console.log(temperamentArr)

	if (flag === null) {
		let resultOfCreating = await Breed.create(breedToCreate)
		for (let i = 0; i < temperamentArr.length; i++) {
			await resultOfCreating.addTemperament(temperamentArr[i].toLowerCase())
		}
		let secondFlag = await Breed.findOne({
			where: { breedName: breedName },
		})
		if (secondFlag !== null) {
			return res.status(200).json({ message: 'Breed post successful' })
		} else {
		}
	}
	res.status(400).json({ message: 'There was a problem posting the breed, try a different name' })
})

module.exports = router
