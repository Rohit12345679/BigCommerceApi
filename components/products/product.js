//import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'

const { products } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
})
const { product } = await getProduct({
    variables: { path: "/tiered-wire-basket/" },
    config,
    preview: true,
  });
  console.log(product);

const Product = () => {
    return { props: { post } }
}
export default Product;