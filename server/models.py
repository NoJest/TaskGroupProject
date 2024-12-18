from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import validates
from config import db, bcrypt
import re 

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
    password_hash = db.Colunm(db.String)
    
    @property
    def password(self): 
        raise Exception("Passwords cannot be changed outside of the appropriate channels")
    
    @password.setter
    def password(self, value): 
        self.password_hash = bcrypt.generate_password_hash(value).decode('utf-8')
    def authenticate(self, user_password):
        return bcrypt.check_password_hash(self.password_hash, user_password)
    
    # Validation for email and phone
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
            raise ValueError("Invalid email format")
        return email

    @validates('phone')
    def validate_phone(self, key, phone):
         # Adjust phone validation to allow optional spaces, hyphens, or parentheses
        if not re.match(r"^\+?\d{10,15}$", phone):
            raise ValueError("Invalid phone number format")
        return phone
    
class Preference(db.Model, SerializerMixin):
    __tablename__ = "preference_table"
    
    id = db.Column(db.Integer, primary_key= True)
    commitment_time = db.Column(db.String)
    career_path = db.Column(db.Integer)
    avatar = db.Column (db.String, nullable =True)
    # mood = db.Column(db.String)
    # Stretch goal
    
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))
    # Relationships here
    # users = db.relationship('User', back_populates = "preferences")
    
    # Serializing rules here
    # serialize_rules = ('','', '', '')

class ProgressUpdate(db.Model, SerializerMixin):
    __tablename__ = 'progress_update'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    metric_value = db.Column(db.String, nullable=False)
    notes = db.Column(db.Text)

