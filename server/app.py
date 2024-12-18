#!/usr/bin/env python3
from flask import request, session, jsonify
from flask_restful import Resource
from config import app, db, api
from models import db, User, Goal, Preference, ProgressUpdate


def find_user_by_id(user_id):
    return User.query.where(User.id == user_id).first()
def find_preferences_by_id(user_id):
    return Preference.query.where(Preference.user_id == user_id).all()


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

#delete request 
@app.delete('/api/preferences/<int:user_id>')
def delete_preferences_by_id(user_id):
    found_preferences = find_user_by_id(user_id)
    if found_preferences:
        db.session.delete(found_preferences)
        db.session.commit()
        return {}, 204
    #204 stands for no content, so empty message
    else:
        return {"status": 404, "message": "NOT FOUND" }, 404
    
#patch request
@app.patch('/api/preferences/<int:user_id>')
def edit_preferences(user_id):
    found_user= find_user_by_id(user_id)
    
    if found_user:
        #find preferences for this user
        preferences = find_preferences_by_id(user_id)
        
        if preferences:
            try:
                data = request.json
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)


