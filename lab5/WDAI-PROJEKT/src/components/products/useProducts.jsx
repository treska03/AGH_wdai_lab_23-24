import { useState, useEffect } from "react";

export const useProducts = () => {
    const [products, setProductList] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:2137/products/all')
        .then((response) => response.json())
        .then(data => setProductList(data))
        .catch((error) => { console.log(error) });
    },[]);

    return [products, setProductList];
}