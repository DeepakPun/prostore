// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
// await delay(3000)

import ProductList from "@/components/shared/product/product-list"
import sampleData from "@/db/sample-data"
console.log(sampleData)

export default function Homepage() {
  return (
    <>
      <ProductList data={sampleData.products} title="Newest Arrivals" />
    </>
  )
}
