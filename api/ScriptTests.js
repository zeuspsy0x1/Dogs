import axios from 'axios'

const getTemperaments = async () => {
	let get = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=fc1da327-5902-47e3-959f-36df672562da')
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
	notDuplicatedTempsCheck = notDuplicatedTempsCheck.filter((t) => t !== '')
	notDuplicatedTempsCheck = notDuplicatedTempsCheck.sort()

	if (notDuplicatedTempsCheck.length > 0) {
	}

	console.log(notDuplicatedTempsCheck)
	//return notDuplicatedTempsCheck
}
getTemperaments()
