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

const postBreedToDb = async (breedObject) => {
	try {
		const { name, temperament, image, weight, lifeExpectancy } = recipeObject
		const recipe = {
			title: title,
			summary: summary,
			healthScore: healthScore,
			image: image,
			steps: steps,
			created: created,
		}
		//console.log(recipe);

		let breedInDb = await Breed.findOrCreate({ where: { name: breed } })
		let recipeAndDietRelationship = []
		let createRecipe = await Recipe.create(recipe)
		for (let i = 0; i < recipeDiets.length; i++) {
			//console.log(vApiGenres[i]);
			recipeAndDietRelationship[i] = await createRecipe.addDiet(recipeDiets[i])
		}
		return 'Recipe and Diet relationship created'
	} catch (error) {
		console.log('an error occurred when trying to post the breed to db' + error)
	}
}
module.exports = {
	getTemperamentsAndSendThemToDb,
	postBreedToDb,
}
