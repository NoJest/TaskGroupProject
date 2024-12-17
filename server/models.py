from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import date

from config import db

# Models go here!
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