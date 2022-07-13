import { render, screen } from '@testing-library/react'
import CreateBreed from './components/CreateBreed/CreateBreed'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import generateStore from './redux/store'
const store = generateStore()

test('Create a new Breed', () => {
	render(
		<BrowserRouter>
			<Provider store={store}>
				<CreateBreed />
			</Provider>
		</BrowserRouter>
	)
	expect(screen.getByText(/Create a new Breed/i)).toBeInTheDocument()
})
