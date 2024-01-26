import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { ProductProps } from "./Product";

type ContextType = { products: ProductProps[], setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>> };

export const Shop = () => {
  console.log("HUJ");
  console.log("HUJ");
  console.log("HUJ");
  console.log("HUJ");
  
    const [products, setProducts] = useState<ContextType>();
    
    useEffect(() => {
        const fetchProducts = async () => {
          console.log("Fetching data");
          const response = await fetch("https://dummyjson.com/products");
          const { products } = await response.json();
          setProducts(products);
        };
        fetchProducts();
      }, []);
    
    if(!products) {
      return (
        <h2>Loading...</h2>
      )
    }

    return (
        <>
            <Outlet context={{ products, setProducts }} />
        </>
    )
}

export function useProducts() {
  return useOutletContext<ContextType>();
}
