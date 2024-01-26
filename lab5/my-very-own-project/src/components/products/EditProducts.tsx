import {useProducts} from "./Shop.tsx"
import { useParams } from 'react-router';


export const EditProducts = () => {
    const {products, setProducts} = useProducts()
    
    const item = products.find(({ id }) => id.toString() === useParams().id);
    
    if(!item) return (<h1>Page not found :C</h1>)

    const handleChange = (event : any) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const formJson = Object.fromEntries(formData.entries());
        const productsCopy = [...products];
        const newItem = {
            id: item.id,
            title: formJson.newTitle.toString(),
            description: formJson.newDescription.toString(),
            thumbnail: item.thumbnail
        };
        productsCopy[products.findIndex(({ id }) => id === item.id)] = newItem;
        
        setProducts(productsCopy);
        
    }
    
    return (
        <>
        <form id={`${item.id}`} onSubmit={(e) => handleChange(e)}>
            <label > Edit title</label>
            <input 
                type="text"
                name="newTitle"
                className="productDesc"
                defaultValue={item.title}/>
            <label > Edit Description</label>
            <input 
                type="text"
                name="newDescription"
                className="productDesc"
                defaultValue={item.description}/>
            <img src={item.thumbnail} width={200} height={135} alt="Item" className="productImg" />
            <p>{item.id}</p>
            <input type="submit"/>
        </form>
        </>
    )
}