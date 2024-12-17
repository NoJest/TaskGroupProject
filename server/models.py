from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import date
from sqlalchemy.orm import validates
from config import db


class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals_table'

    id =  db.Column(db.Integer, primary_key=True)
    user_id =  db.Column(db.Integer, db.ForeignKey('users_table.id'))
    title =  db.Column(db.String)
    description =  db.Column(db.String, nullable=False)
    start_date =  db.Column(db.Date, default=date.today)
    end_date =  db.Column(db.Date)
    # if end_date < date.today status == 'inactive'
    status = db.Column(db.String)
    # categorical variables, need dropdown to select from
    metric_unit = db.Column(db.String)
    update_frequency = db.Column(db.String)
    goal_target = db.Column(db.String)
    alert_time = db.Column(db.Time)
    phone_alert = db.Column(db.Boolean)
    email_alert = db.Column(db.Boolean)

class User(db.Model, SerializerMixin):

    __tablename__= 'users_table'

    id = db.Column(db.Integer, primary_key = True )
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)
    password_hash = db.Colunm(db.string)
# Models go here!

class Preference(db.Model, SerializerMixin):
    __tablename__ = "preference_table"
    
    id = db.Column(db.Integer, primary_key= True)
    commitment_time = db.Column(db.String)
    career_path = db.Column(db.Integer)
    avatar = db.Column (db.String, nullable =True)
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

