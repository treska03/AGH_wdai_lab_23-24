from marshmallow import post_load
from sqlalchemy.orm import Mapped, mapped_column
from config import db, ma

class User(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    username: Mapped[str] = mapped_column(db.String, nullable=False)
    password: Mapped[str] = mapped_column(db.String, nullable=False)
    access_token: Mapped[str] = mapped_column(db.String, nullable=True)
    is_admin: Mapped[int] = mapped_column(db.Integer, nullable=False, default=0)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
    
    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)


class Product(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    title: Mapped[str] = mapped_column(db.String, nullable=False)
    description: Mapped[str] = mapped_column(db.String, nullable=False)
    thumbnail: Mapped[str] = mapped_column(db.String, nullable=False)
    price: Mapped[str] = mapped_column(db.String, nullable=False)

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
    
    @post_load
    def make_product(self, data, **kwargs):
        return Product(**data)
