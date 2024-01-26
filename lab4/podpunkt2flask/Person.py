from marshmallow import post_load
from sqlalchemy.orm import Mapped, mapped_column
from config import db, ma, app

class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(db.String, nullable=False)
    surname: Mapped[str] = mapped_column(db.String, nullable=False)
    job: Mapped[str] = mapped_column(db.String, nullable=False)

class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
    
    @post_load
    def make_user(self, data, **kwargs):
        return Person(**data)
    
with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="ser",surname="gouda",job='gastro'))
    db.session.add(Person(name="fiat",surname="126p",job='moto'))
    db.session.add(Person(name="Rocky",surname="Balboa",job='streetfight'))
    db.session.add(Person(name="Donald",surname="Trump",job='więzienie'))
    db.session.commit()
