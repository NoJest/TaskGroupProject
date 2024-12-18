#!/usr/bin/env python3
from flask import request, session
from flask_restful import Resource
from config import app, db, api
from models import db, User, Goal, Preference, ProgressUpdate


def find_user_by_id(user_id):
    return User.query.where(User.id == user_id).first()
def find_preferences_by_id(user_id):
    return Preference.query.where(Preference.user_id == user_id).first()


# Preferences
@app.get("/preferences/<int:user_id>")
def get_preferences_by_id(user_id):
    #1 find user with that id
    found_user = find_user_by_id(user_id)
    
       #too troubleshoot for none ids 
    if found_user:
        
    #2 send it to the (client)
        return found_user.preferences.to_dict(), 200
    
    else:
        #3 send a 404 if it doesnt exist
        return {"status": 404, "message": "NOT FOUND" }, 404



#authentication and user login
@app.post('/api/user')
def create_user():
    data = request.json
    try:
        new_user = User(email=data['email'])
        new_user.password = data['password']
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id  
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 400

@app.get('/api/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.where(User.id == user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return {}, 204
    
@app.post('/api/login')
def login():
    data = request.json 
    user = User.query.where(User.email == data.get('email')).first()
    if user and user.authenticate(data.get('password')):
        session['user_id'] = user.id
        return user.to_dict(), 202
    else: 
        return {"error": "invalid email or password"}, 401
    
@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204


if __name__ == '__main__':
    app.run(port=5555, debug=True)


