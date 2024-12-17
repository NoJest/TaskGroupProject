from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db

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