import '../../styles/products.css'

export const ProductList = (products) => {

    function addToCart(product){
        if(JSON.parse(localStorage.getItem("cart") == null)) {
            var emptyCart = [];
            emptyCart.push(product);
            localStorage.setItem("cart",JSON.stringify(emptyCart));
        } else {
            var cart = JSON.parse(localStorage.getItem("cart"));
            // if item not already in cart, then add it 
            if(!cart.some(prod => prod.id === product.id)) {
                cart.push(product);
                localStorage.cart = JSON.stringify(cart);
            }
        }

    }

    return (
        <>
            {products.products.map((product) => {
                return (
                    <li key={product.id} className="productList__item flex">
                        <div className="imageContainer">
                            <img src={`${product.thumbnail}`} alt="" className="productList__image"/>
                        </div>
                        <div className="valuesContainer"> 
                            <h4 className="title">{product.title}</h4>
                            <p className="desc">{product.description}</p>
                            <p className="price">{product.price} zł</p>
                        </div>
                        <div className="buttonContainer">
                            <button className="cartButton" onClick={() => addToCart(product)}>Dodaj do koszyka</button>
                            <button className="buyButton">Kup teraz</button>
                        </div>
                    </li>
                )
            })}
        </>
    )
}