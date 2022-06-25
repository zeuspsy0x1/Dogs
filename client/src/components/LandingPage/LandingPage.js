import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllBreeds } from '../../redux/actions'
import './LandingPage.css'

function LandingPage() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllBreeds())
	}, [dispatch])

	const navigate = useNavigate()
	const aaaaa = () => {
		navigate('/main')
	}

	return (
		<>
			<div className='LandingPage'>
				<button onClick={aaaaa} className='Enter'>
					Enter
				</button>
			</div>
		</>
	)
}

export default LandingPage
