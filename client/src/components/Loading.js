import BarLoader from 'react-spinners/HashLoader'
import './Loading.css'

function LoadingComponent() {
	/* const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: '#bdf347',
	} cssOverride={override} */

	return <BarLoader className='loaderChangeMarginTop' color={'#bdf347'} size={150} />
}
export default LoadingComponent

/* best loaders are:
HashLoader
PuffLoader
RingLoader */
