from flask import jsonify, request
from marshmallow import ValidationError
from Person import Person, PersonSchema
from config import app, db

@app.route('/')
def welcome():
    return jsonify({"Welcome to my site!" : "Value"})

@app.route('/person/add')
def create_person():
    try:
        person = PersonSchema().load(request.args.to_dict())
    except ValidationError:
        return "Wrong arguments, please make sure to pass /person/add?name=YOURNAME&surname=YOURSURNAME&job=YOURJOB"
    
    db.session.add(person)
    db.session.commit()

    return f"Succesfully created person with params: {(request.args.to_dict())}"

@app.route('/person/get')
def get_user_by():
    # Optional parameter - id
    sought_id = request.args.get("id")
    if sought_id:
        return PersonSchema().dump(db.get_or_404(Person, ident=sought_id))
    else:
        return PersonSchema(many=True).dump(Person.query.all())

@app.route('/<arg>')
def greeting(arg):
    return "Hello " + arg

if __name__ == '__main__':
    app.run()