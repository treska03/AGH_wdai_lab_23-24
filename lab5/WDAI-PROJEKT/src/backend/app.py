from flask import jsonify, request
from config import app, db
from models import Product, ProductSchema, User, UserSchema
from hashlib import sha256

DUMMY_THUMBNAIL = "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"

def hash_password(passwd : str):
    return sha256(passwd.encode('utf-8')).hexdigest()

def message(msg):
    return jsonify(msg=msg)


@app.route('/login', methods=["POST"])
def login():
    """
    Endpoint enabling user verification.
    Access via uri: /login

    Body args:
    {
        username: unhashed_username,
        password: unhashed_password 
    }

    Returns: 
        - {access_token: user_access_token}, 200
        - {msg: error_msg}, 400 on missing data
        - {msg: error_msg}, 422 on user not found
    """
    data_json = request.get_json(force=True)
    username = data_json["username"]
    password = data_json["password"]

    if not (username and password):
        return message("Please provide both username and password"), 400
    
    # FIX HASHING BECAUSE OUR CURRENT USERS PASSWORDS AREN'T HASHED IN THE DATABASE

    hashed_password = hash_password(password)

    user = User.query.filter_by(username=username, password=password).first()
    if not user:
        return message("User not found"), 422
    
    return jsonify(token=user.access_token), 200

# USED IN TESTING FOR USER ACCESS
@app.route('/users/all', methods=["GET"])
def get_users():
    users = UserSchema(many=True).dump(User.query.all())
    return jsonify(users), 200


@app.route('/products/all', methods=["GET"])
def get_products():
    """
    Endpoint enabling fetching of all product.
    Access via uri: /products/all

    Args: None

    Returns: 
    {
        [
            {
                id: product_id,
                title: product_title,
                description: product_description,
                thumbnail: thumbnail_uri,
                price: product_price
            }
        ]
    }, 200 on successful fetch
    """
    products = ProductSchema(many=True).dump(Product.query.all())
    return jsonify(products), 200

@app.route('/products/create', methods=["POST"])
def create_product():
    """
    Endpoint enablind adding a new.
    Access via uri: /products/create
    
    Body args: {
        title: new_title,
        description: new_description,
        thumbnail: thumbnail_uri,
        price: new_price
    }

    Returns: 
        - {product: new_product_details}, 200 on successful addition
        - {msg: error_msg}, 400 on missing data
    """
    data_json = request.get_json(force=True)

    title = data_json["title"]
    description = data_json["description"]
    thumbnail = data_json["thumbnail"]
    price = data_json["price"]

    if not (title and description and price):
        return message("Please provide title, description and price"), 400
    
    if not thumbnail:
        thumbnail = DUMMY_THUMBNAIL

    new_product = Product(title=title, description=description, thumbnail=thumbnail, price=price)
    db.session.add(new_product)
    db.session.commit()

    return ProductSchema().dumps(new_product), 200

@app.route('/products/delete/<id>', methods=["DELETE"])
def delete_product(id):
    """
    Endpoint enabling deletion of product.
    Access via uri: /products/delete/YOUR_PRODUCT_ID

    Path args: id

    Returns: 
        - {msg: success_msg}, 200 on successful deletion
        - {msg: error_msg}, 422 on product not found
    """
    if Product.query.filter_by(id=id).delete() == 0:
        return message("User not found"), 422
    db.session.commit()
    return message("Successfully deleted user"), 200


@app.route('/products/edit/<product_id>', methods=["POST"])
def edit_products(product_id):
    """
    Endpoint enablind editing of product.
    Access via uri: /products/edit/YOUR_PRODUCT_ID
    
    Body args: {
        title: new_title,
        description: new_description,
        thumbnail: uri_to_new_product_thumbnail,
        price: new_price
    }

    Returns: 
        - {product: new_product_details}, 200 on successful edit
        - {msg: error_msg}, 400 on missing data
        - {msg: error_msg}, 422 on product not found
    """
    data_json = request.get_json(force=True)

    title = data_json["title"]
    description = data_json["description"]
    thumbnail = data_json["thumbnail"]
    price = data_json["price"]

    if not (title or description or price or thumbnail):
        return message("Please change at least one value"), 400
    
    product = db.get_or_404(Product, ident=product_id)
    
    if not product:
        return message("Product with such ID wasn't found"), 422
    
    if title: product.title = title
    if description: product.description = description
    if thumbnail: product.thumbnail = thumbnail
    if price: product.price = price
    db.session.commit()

    return ProductSchema().dumps(db.get_or_404(Product, ident=product_id)), 200
    

if __name__ == '__main__':
    app.run(port=2137)
