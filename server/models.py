from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class ProgressUpdate(db.Model, SerializerMixin):
    __tablename__ = 'progress_update'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    metric_value = db.Column(db.String, nullable=False)
    notes = db.Column(db.text)
