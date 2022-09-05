import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import landingDogs from '../../utils/landingdogo.png'
import linkedin from '../../utils/linkedin.PNG'
import github from '../../utils/github.PNG'

function LandingPage() {
	const navigate = useNavigate()
	const navigateToMain = () => {
		navigate('/main')
	}

	

	return (
		<div className='landing-container'>
			<div className='landing-header'> Dog Breeds App </div>
			<img className='landing-dogsImage' src={landingDogs} alt='Dogs Img' />
			<div className='landing-button-div'>
				<button onClick={navigateToMain} className='landing-button'>
					Enter
				</button>
			</div>

			<div className='landing-links'>
				<a href='https://www.linkedin.com/in/zeus1337'>
					<img className='landing-imgLinkedin' src={linkedin} alt='linkedin Img' />
				</a>
				<a href='https://github.com/zeuspsy0x1'>
					<img className='landing-imgGithub' src={github} alt='github Img' />
				</a>
			</div>
		</div>
	)
}

export default LandingPage
