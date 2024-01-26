import { useMemo, useState } from "react";
import {ProductList} from "./ProductList.tsx";
import { ProductProps } from "./Product.tsx";
import {useProducts} from "./Shop.tsx"

export const ProductPage = () => {
  const {products} = useProducts();
  
  const [params, setParams] = useState({ filterName: "", sortBy: "" });

  const compareAlph = (a : string, b : string) => {
    if (a.toLowerCase() < b.toLocaleLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
  };

  const filteredProducts = useMemo(
    () =>
      (products)
        .filter((product : ProductProps) =>
          product.title.toLowerCase().includes(params.filterName.toLowerCase())
        )
        .sort((first : ProductProps, second : ProductProps) => {
          if (!params.sortBy) return 0;
          const compareResult = compareAlph(first.title, second.title);
          return params.sortBy === "asc" ? compareResult : -compareResult;
        }),
    [products, params]
  );

  const handleChange = (params : any) => {
    setParams((prevParams) => ({ ...prevParams, ...params }));
  };

  return (
    <div>
      <div>
        <h4>Filter name:
          <input type="text" onChange={(event) => handleChange({filterName : event.currentTarget.value})}/> 
        </h4>
        <h4>Order by:
          <select
            id="sortby"
            onChange={(event) => handleChange({ sortBy: event.currentTarget.value })}>
            <option value="">Default</option>
            <option value="asc">Title asc</option>
            <option value="desc">Title desc</option>
          </select>
        </h4>
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
};
