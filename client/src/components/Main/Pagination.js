import React from 'react'

function Pagination({ breeds, paginate }) {
	const pageNumbers = []
	const recipesPerPage = 8 // son 8 para el pi de dogs

	for (let i = 1; i <= Math.ceil(breeds.length / recipesPerPage); i++) {
		pageNumbers.push(i)
	}
	return (
		<nav className='adawdadwawd'>
			{pageNumbers &&
				pageNumbers.map((number) => (
					<button className='pagination-buttons' key={number} onClick={() => paginate(number)}>
						{number}
					</button>
				))}
		</nav>
	)
} //SOLO RENDERIZO LOS PRIMEROS 20, LA IDEA ES DESPUES DE UNOS 15, MOSTRAR UN NEXT

export default Pagination
