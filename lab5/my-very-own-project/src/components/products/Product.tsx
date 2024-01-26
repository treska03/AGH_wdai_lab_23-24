import {Link} from "react-router-dom";

export interface ProductProps {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
}

export const Product:React.FC<ProductProps> = (item) => {
    return (
        <section id={`${item.id}`}>
            <hr/>
            <h4 className="productTitle">{item.title}</h4>
            <img src={item.thumbnail} width={200} height={135} alt="Item" className="productImg" />
            <h5 className="productDesc">{item.description}</h5>
            <p>{item.id}</p>
            <Link to={`/sklep/edytuj/${item.id}`}>Edytuj produkt</Link>
        </section>
    );
}