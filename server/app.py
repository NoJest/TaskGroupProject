#!/usr/bin/env python3
from flask import request, session
from flask_restful import Resource
from config import app, db, api
from models import db, User, Goal, Preference, ProgressUpdate

# HELPER FUNCTIONS
def find_user_by_id(user_id):
    return User.query.where(User.id == user_id).first()
def find_preferences_by_id(user_id):
    return Preference.query.where(Preference.user_id == user_id).first()
def find_goals_by_id(user_id):
    return Goal.query.where(Goal.user_id == user_id).all()

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



# Goals CRUD
@app.get('/api/users/<int:user_id>/goals')
def get_goals_by_user(user_id):
    found_user_goals = find_goals_by_id(user_id) 

    if found_user_goals:
        return found_user_goals.to_dict(), 200
    else:
        return { "status": 404, "message": "NOT FOUND" }, 404

@app.post("/api/users/<int:user_id>/goals")
def create_new_user_goal():
    data = request.json
    
    try: 
        new_goal = Goal(title = data.get('title'),
                        description = data.get('description'),
                        start_date = data.get('start_date'),
                        end_date = data.get('end_date'),
                        status = data.get('status'),
                        unit = data.get('unit'),
                        frequency = data.get('frequency'),
                        goal_target = data.get('goal_target'),
                        alert_time = data.get('alert_time'),
                        phone_alert = data.get('phone_alert'),
                        email_alert = data.get('email_alert'))
        db.session.add(new_goal)
        db.session.commit()
        return new_goal.to_dict(), 201
    
    except Exception as error:
        return{"status": 400, 
               "message": "something went wrong...", 
               "error_text": str(error)
               }, 400

@app.patch("/api/goals/<int:id>")
def edit_goal(id):
    goal = Goal.query.get(id) 


@app.delete("/api/goals/<int:id>")
def delete_goal(id):
    goal = Goal.query.get(id)

    if goal:
        db.session.delete(goal)
        db.session.commit()
        return {}, 204
    else: 
        return {"status" : 404, "message": "NOT FOUND"}, 404

# ProgressUpdate CRUD

if __name__ == '__main__':
    app.run(port=5555, debug=True)