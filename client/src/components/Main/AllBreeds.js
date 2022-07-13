import React from 'react'
import Card from './Card'

function allBreeds({ allBreeds }) {
	//const allRecipes = useSelector((state) => state.recipes) // manda los filtrados si hay title, si no hay title de receta valido, manda todas las recetas sin filtros.

	//console.log('no hay title ni filtrados para buscar entonces all recipes renderiza api y db')

	const mapeo = allBreeds?.map((item) => {
		return (
			<div className='allbreeds-cards-container' key={allBreeds.indexOf(item)}>
				<Card
					name={item.name}
					id={item.id}
					image={item.image}
					temperaments={item.temperaments}
					weight={item.weight}
				/>
			</div>
		)
	})

	return mapeo
}

export default allBreeds
