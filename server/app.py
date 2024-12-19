#!/usr/bin/env python3
from flask import request, session, jsonify
from flask_restful import Resource
from config import app, db, api
from models import db, User, Goal, Preference, ProgressUpdate

# HELPER FUNCTIONS
def find_user_by_id(user_id):
    return User.query.where(User.id == user_id).first()
def find_preferences_by_id(user_id):
  return Preference.query.where(Preference.user_id == user_id).all()
def find_goals_by_id(user_id):
    return Goal.query.where(Goal.user_id == user_id).all()
def find_updates_by_id(goal_id):
    return ProgressUpdate.query.where(ProgressUpdate.goal_id == goal_id).all()

# Preferences
#get request
@app.get("/api/preferences/<int:user_id>")
def get_preferences_by_id(user_id):
    #1 find user with that id
    found_user = find_user_by_id(user_id)
    #if user exists return there preferences
    if found_user:
        preferences = find_preferences_by_id(user_id)
        
        #if preferences exist return them as a list of dictionaries
        if preferences:
            #probably wont jsonify, probably will do plaint text but leaving this for now
            return jsonify([p.todict() for p in preferences]), 200
        else:
            return jsonify({"status": 404, "message": "No preferences found for this user" }), 404
    else:
        return "User not found", 404
#post request 
@app.post('/api/preferences/<int:user_id>')
def create_new_preferences():
    data = request.json
    try: 
        new_preferences = Preference(
            commitment_time= data.get('commitment_time'),
            career_path = data.get('career_path'),
            avatar = data.get('avatar'),
            user_id = data.get('user_id')
        )
        
        db.session.add(new_preferences)
        db.session.commit()
        return new_preferences.to_dict(), 201
    except ValueError as validation_error:
        return {
            "status":400,
            "message": "Invalid data entry",
            "error_text": str(validation_error)
        }, 400
    except Exception as error: 
        return {
            "status": 400,
            "message" : "something went really wrong, why did you set your preferences like that",
            "error_text": str(error)
            }, 400

#dont think we need this but if we do i need to fix the logic here
# #delete request 
# @app.delete('/api/preferences/<int:user_id>')
# def delete_preferences_by_id(user_id):
#     found_preferences=Preference.query.get(user_id)
#     if found_preferences:
#         db.session.delete(found_preferences)
#         db.session.commit()
#         return {}, 204
#     #204 stands for no content, so empty message
#     else:
#         return {"status": 404, "message": "NOT FOUND" }, 404
    
#patch request
@app.patch('/api/preferences/<int:user_id>')
def edit_preferences(user_id):
    found_user= find_user_by_id(user_id)
    
    if found_user:
        #find preferences for this user
        preferences = find_preferences_by_id(user_id)
        
        if preferences:
            try:
                data = request.get_json()
                print(data) #debugging
                if not data:
                    return {"status":400,
                            "message": "Invalid or empty JSON in request" }, 400
                for found_preference in preferences:
                    for key, value in data.items():
                        if hasattr(found_preference,key):
                            setattr(found_preference, key, value)
                db.session.commit()
                updated_preferences = [pref.to_dict() for pref in preferences]
                return jsonify(updated_preferences),202
        
            except Exception as e:
                return { "status": 400, 
                        "message": "Something is amiss updating preferences",
                        "error_text": str(e)}, 400
        else: 
            return { "status": 404, 
                        "message": "No preferences for this user"}, 400
    else:
        return {"status": 404, "message": "User not found"}, 404
    


#authentication and user login
@app.post('/api/user')
def create_user():
    data = request.json
    try:
        new_user = User(email=data['email'])
        new_user.phone = data ['phone']
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

    if goal:
        try: 
            data = request.json

            for attr, value in data.items(): 
                if hasattr(goal, attr):
                    setattr(goal, attr, value)
                else: 
                    return {"status": 400, "message": f"Invalid attribute: {attr}"}, 400
            db.session.commit()
            return goal.to_dict(), 202
        
        except Exception as e:
            return {"status": 400, "message": f"An error occurred: {str(e)}"}, 400
    else:
        return {"status": 404, "message": "Goal not found"}, 404

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
@app.get("/api/goals/<int:goal_id>/progress-updates")
def get_progress_updates(goal_id):
    found_progress_updates = find_updates_by_id(goal_id) 

    if found_progress_updates: 
        return found_progress_updates.to_dict(), 200
    else: 
        return { "status": 404, "message": "NOT FOUND"}, 404

@app.post("/api/goals/<int:goal_id>/progress-updates")
def create_new_progress_update(): 
    data = request.json

    try: 
        new_update = ProgressUpdate(date = data.get('date'),
                                    metric_value = data.get('metric_value'),
                                    notes = data.get('notes'))
        db.session.add(new_update)
        db.session.commit()
        return new_update.to_dict(), 201
    
    except Exception as e:
        return{"status": 400,
               "message": "something went wrong...",
               "error_text": str(error)
               }, 400

@app.patch("/api/progress-updates/<int:id>")
def edit_progress_update(id):
    update = ProgressUpdate.query.get(id)

    if update: 
        try: 
            data = request.json

            for attr, value in data.items():
                if hasattr(update, attr):
                    setattr(update, attr, value)
                else: 
                    return {"status": 400, "message": f"Invalid attribute: {attr}"}, 400
                db.session.commit()
                return update.to_dict(), 202
            
        except Exception as e: 
            return {"status": 404, "message": f"An error occurred: {str(e)}"}, 400
    else:
        return {"status": 404, "message": "Update not found"}, 404

@app.delete("/api/progress-updates/<int:id>")
def delete_progress_update(id):
    update = ProgressUpdate.query.get(id)

    if update:
        db.session.delete(update)
        db.session.commit()
        return {}, 204
    else:
        return {"status": 404, "message": "NOT FOUND"}, 404


if __name__ == '__main__':
    app.run(port=5555, debug=True)