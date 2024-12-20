from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import validates
from config import db, bcrypt
import re , datetime

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals_table'

    id =  db.Column(db.Integer, primary_key=True)
    title =  db.Column(db.String)
    description =  db.Column(db.String, nullable=False)
    start_date =  db.Column(db.Date, default=date.today)
    end_date =  db.Column(db.Date)
    # if end_date < date.today status == 'inactive'
    # status = db.Column(db.String)
    # categorical variables, need dropdown to select from
    metric_unit = db.Column(db.String)
    update_frequency = db.Column(db.String)
    goal_target = db.Column(db.String)
    alert_time = db.Column(db.Time)
    phone_alert = db.Column(db.Boolean)
    email_alert = db.Column(db.Boolean)
    
    #foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))
    
    #relationships
    progress_updates = db.relationship("ProgressUpdate", back_populates="goal", cascade= "all, delete-orphan" )
    user = db.relationship('User', back_populates="goals")
    
    #serializin
    serialize_rules = ('-user.goals',"-progress_updates.goal")
    
    @property
    def status(self):
        # """Calculate status dynamically based on end_date"""
        if self.end_date and self.end_date < date.today():
            return 'inactive'
        return 'active'
    
    @validates('end_date')
    def validate_end_date(self, key, end_date):
        if end_date and end_date < self.start_date:
            raise ValueError("End date cannot be before the start date")
        return end_date
    
    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = ['active', 'inactive', 'completed']
        if status not in valid_statuses:
            raise ValueError(f"Invalid status. Allowed options: {', '.join(valid_statuses)}")
        return status
    @validates('alert_time')
    def validate_alert_time(self, key, alert_time):
        if alert_time and alert_time < datetime.now().time():
            raise ValueError("Alert time cannot be in the past")
        return alert_time   
    # Debugging __repr__ method
    def __repr__(self):
        return (f"<Goal(id={self.id}, title={self.title}, description={self.description}, "
                f"start_date={self.start_date}, end_date={self.end_date}, status={self.status}, "
                f"goal_target={self.goal_target}, alert_time={self.alert_time})>")

class User(db.Model, SerializerMixin):

    __tablename__= 'users_table'

    id = db.Column(db.Integer, primary_key = True )
    name= db.Column (db.Integer, unique=True, nullable= False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String)
    
    #relationships
    goals = db.relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    preferences = db.relationship("Preference", back_populates='user', cascade= "all, delete-orphan")
    
    #serializin
    serialize_rules = ('-goals.user', '-preferences.user',"-password_hash",)
    @property
    def password(self): 
        raise Exception("Passwords cannot be changed outside of the appropriate channels")
    
    @password.setter
    def password(self, value): 
        self.password_hash = bcrypt.generate_password_hash(value).decode('utf-8')
    def authenticate(self, user_password):
        return bcrypt.check_password_hash(self.password_hash, user_password)
    
    
    @validates('password')
    def validate_password(self, key, password):
    # Password must be at least 8 characters long and include at least one number, one uppercase letter, and one special character
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"\d", password):
            raise ValueError("Password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            raise ValueError("Password must contain at least one special character")
        return password
    
    
    @validates('email')
    def validate_email(self, key, email):
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError("Email address is already taken")
        return email

    @validates('phone')
    def validate_phone(self, key, phone):
        existing_user = User.query.filter_by(phone=phone).first()
        if existing_user:
            raise ValueError("Phone number is already taken")
        
           # Adjust phone validation to allow optional spaces, hyphens, or parentheses
        if not re.match(r"^(\+?\d{1,4}[-\s]?)?(\(?\d{1,3}\)?[-\s]?)?(\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4})$", phone):
            raise ValueError("Invalid phone number format. It should contain 10 to 15 digits.")
    
        return phone
    
    # Validation for email and phone
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
            raise ValueError("Invalid email format")
        return email
    
     # Debugging __repr__ method
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, phone={self.phone})>"
    
class Preference(db.Model, SerializerMixin):
    __tablename__ = "preference_table"
    
    id = db.Column(db.Integer, primary_key= True)
    commitment_time = db.Column(db.String)
    career_path = db.Column(db.String)
    avatar = db.Column (db.String, nullable =True)
    mood = db.Column(db.String, nullable= True)
    # Stretch goal
    
    #foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))
    
    # Relationships here
    user = db.relationship('User', back_populates="preferences")
    
    # Serializing rules here
    serialize_rules = ('-user.preferences',)

    #THESE NEED TO BE DECIDED ON 
    # @validates('commitment_time')
    # def validate_commitment_time(self, key, commitment_time):
    # # A simple regex or more complex validation can be used here
    #     if not re.match(r"^\d+\s*(hours|hour)\s*(\/week|\/month)$", commitment_time):
    #         raise ValueError("Invalid commitment time format. Example: '3 hours/week'")
    #     return commitment_time
    
    #probably want to leave it open ended,but this is an example
    # @validates('career_path')
    # def validate_career_path(self, key, career_path):
    #     valid_paths = ["Software Engineer", "Data Scientist", "Product Manager"]
    #     if career_path not in valid_paths:
    #         raise ValueError(f"Invalid career path. Allowed options: {', '.join(valid_paths)}")
    #     return career_path
    
    # Debugging __repr__ method
    def __repr__(self):
        return (f"<Preference(id={self.id}, commitment_time={self.commitment_time}, "
                f"career_path={self.career_path}, avatar={self.avatar})>")
        
class ProgressUpdate(db.Model, SerializerMixin):
    __tablename__ = 'progress_update_table'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today)
    metric_value = db.Column(db.String, nullable=False)
    notes = db.Column(db.Text)

    #foreign key
    goal_id = db.Column(db.Integer, db.ForeignKey("goals_table.id"))
    
    #relationship 
    goal = db.relationship('Goal', back_populates="progress_updates")
    
    #serializin
    serialize_rules= ('-goal.progress_updates', )
    
    # Debugging __repr__ method
    def __repr__(self):
        return (f"<ProgressUpdate(id={self.id}, date={self.date}, metric_value={self.metric_value}, "
                f"notes={self.notes})>")
        
    # Validate the progress update date to ensure it is not in the future (can update the past if you forgot, but cannot update progress in the future)
    @validates('date')
    def validate_date(self, key, date_value):
        if date_value > date.today():
            raise ValueError("The progress update date cannot be in the future.")
        return date_value