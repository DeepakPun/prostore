// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
// await delay(3000)

import ProductList from "@/components/shared/product/product-list"
import { getLatestProducts } from "@/lib/actions/product.actions"

export default async function Homepage() {
  const latestProducts = await getLatestProducts()

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" />
    </>
  )
}
