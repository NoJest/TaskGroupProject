from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db

class User(db.Model, SerializerMixin):

    __tablename__= 'users_table'

    id = db.Column(db.Integer, primary_key = True )
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.Integer unique=True nullable=False)
    password_hash = db.Colunm(db.string)
# Models go here!

class Preference(db.Model, SerializerMixin):
    __tablename__ = "preference_table"
    
    id = db.Column(db.Integer, primary_key= True)
    commitment_time = db.Column(db.String)
    career_path = db.Column(db.Integer)
    notification_type = db.Column (db.String)
    # mood = db.Column(db.String)
    # Stretch goal
    
    # Relationships here
    # users = db.relationship('User', back_populates = "preferences")
    
    # Serializing rules here
    # serialize_rules = ('','', '', '')

class ProgressUpdate(db.Model, SerializerMixin):
    __tablename__ = 'progress_update'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    metric_value = db.Column(db.String, nullable=False)
    notes = db.Column(db.text)
