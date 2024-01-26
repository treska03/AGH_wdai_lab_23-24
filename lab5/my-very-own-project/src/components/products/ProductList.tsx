import {ProductProps, Product} from "./Product.tsx"
import "../../styles/productlist.css"

export interface ProductListProps {
    products : ProductProps[]
}

export const ProductList = ({products} : ProductListProps) => {
    
    return (
        <div className="productListHolder">
            {products.map(product => (
                <div key={product.id}>
                    <Product id={product.id} title={product.title} 
                    description={product.description} thumbnail={product.thumbnail}/>
                </div>
            ))}
        </div>
    )
}