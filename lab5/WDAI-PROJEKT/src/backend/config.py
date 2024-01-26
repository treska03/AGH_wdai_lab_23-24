from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.json.sort_keys = False

#maybe remove database/
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)