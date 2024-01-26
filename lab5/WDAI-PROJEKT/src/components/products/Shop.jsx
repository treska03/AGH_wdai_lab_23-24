import { useMemo, useState } from "react";
import { ProductList } from "./ProductList";
import { Filters } from "./Filters";
import { useProducts } from "./useProducts";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";

export const Shop = () => {

    const [products, setProducts] = useProducts();
    
    const initialFilters = {
        searchFor: "",
        orderBy: "",
        priceMin: -Infinity,
        priceMax: Infinity
    };

    const [filters, setFilters] = useState(initialFilters);

    const compareAlph = (a, b) => {
        if (a.title.toLowerCase() < b.title.toLocaleLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
    };

    const comparePrice = (a, b) => {
        if(parseFloat(a.price) < parseFloat(b.price)) return -1;
        if(parseFloat(a.price) > parseFloat(b.price)) return 1;
        return 0;
    }

    const filterProducts = (prod) => {
        return (prod.title.toLocaleLowerCase().includes(filters.searchFor) && 
                parseFloat(prod.price) >= filters.priceMin && parseFloat(prod.price) <= filters.priceMax);
    }

    const orderProducts = (first, second) => {
            const orderOption = filters.orderBy;
            if(!orderOption) return 0;
            if(orderOption == "alpha") return compareAlph(first, second);
            return (orderOption == "priceAsc") ? comparePrice(first, second) : -comparePrice(first, second)
    }

    const filteredProducts = useMemo(
        () => products        
            .filter((prod) => filterProducts(prod))
            .sort((a, b) => orderProducts(a, b)),
        [products, filters]
    );

    const handleChange = (newParams) => {
        const paramName = Object.keys(newParams)[0];
        const paramVal = Object.values(newParams)[0];
        if((paramName == "priceMin" || paramName == "priceMax") && isNaN(paramVal)) {
            // if price is not a number, remove the filter.
            newParams = {...newParams, ...initialFilters};
        }
        setFilters((prevParams) => ({...prevParams, ...newParams}))
    }

    if(!products || products.length == 0) return <h2>Ładowanie produktów, prosimy czekać.</h2>

    return (
        <div className="flex">
            <div className="flex flexLeft flexColumn filterContainer">
                <Filters handleChange={handleChange}/>
            </div>
            <div className="flex flexRight">
                <ul className="productList flex flexColumn">
                        <ProductList products={filteredProducts}/>
                    <li>
                        {localStorage.getItem("token") != null && (
                            <ul className="managementButtonContainer">
                                <RemoveButton className="managementButton"/>
                                <AddButton className="managementButton"/>
                            </ul>  
                        )}
                    </li>
                </ul>
                
            </div>
        </div>
    )

}
