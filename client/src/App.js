import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import LandingPage from './components/LandingPage/LandingPage'
import Main from './components/Main/Main'
import CreateBreed from './components/CreateBreed/CreateBreed'
import Detail from './components/Detail/Detail'
import LoadingComponent from './components/Loading'

const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'))

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<Suspense fallback={<LoadingComponent />}>
							<LandingPage />
						</Suspense>
					}
				/>
				<Route
					path='/main'
					element={
						<Suspense fallback={<LoadingComponent />}>
							<Main />
						</Suspense>
					}
				/>
				<Route
					path='/create'
					element={
						<Suspense fallback={<LoadingComponent />}>
							<CreateBreed />
						</Suspense>
					}
				/>

				<Route
					path='/detail/:id'
					element={
						<Suspense fallback={<LoadingComponent />}>
							<Detail />
						</Suspense>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
