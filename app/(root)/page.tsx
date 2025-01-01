// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
// openssl rand -base64 32

import ProductList from '@/components/shared/product/product-list'
import { getLatestProducts } from '@/lib/actions/product.actions'

const Homepage = async () => {
	// await delay(5000)
	const latestProducts = await getLatestProducts()
	return (
		<>
			<ProductList data={latestProducts} title='Newest Arrivals' limit={4} />
		</>
	)
}

export default Homepage
