import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Main from './components/Main/Main'
import CreateBreed from './components/CreateBreed/CreateBreed'
import Detail from './components/Detail/Detail'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/main' element={<Main />} />
				<Route path='/create' element={<CreateBreed />} />
				<Route path='/detail/:id' element={<Detail />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
