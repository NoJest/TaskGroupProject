from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class User(db.Model, SerializerMixin):

    __tablename__= 'users_table'

    id = db.Column(db.Integer, primary_key = True )
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)
    password_hash = db.Colunm(db.string)
# Models go here!
