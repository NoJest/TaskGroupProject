#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from config import bcrypt
from models import User, Goal, Preference, ProgressUpdate
from datetime import date, time

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Goal.query.delete()
        Preference.query.delete()
        ProgressUpdate.query.delete()
        
        # Create instances of each model
        user_seed = User(
            name="John Doe",
            email="johndoe@example.com",
            phone="123-456-7890",
            password_hash=bcrypt.generate_password_hash("123").decode('utf-8')
        )

        db.session.add(user_seed)
        db.session.commit()  # Commit user to generate id

        # Now that the user has an id, create the goal and preference
        goal_seed = Goal(
            title="Daily Water Intake",
            description="Track daily water intake to stay hydrated.",
            start_date=date(2024, 1, 1),
            end_date=date(2024, 12, 31),
            metric_unit="liters",
            update_frequency="daily",
            goal_target="2 liters", 
            phone_alert=True,
            email_alert=True,
            user_id=user_seed.id  # Use the id from the committed user
        )

        preference_seed = Preference(
            commitment_time="30 minutes daily",
            career_path="Software Engineering",
            mood="motivated",
            user_id=user_seed.id  # Use the id from the committed user
        )

        progress_update_seed = ProgressUpdate(
            date=date(2024, 12, 19),
            metric_value="1.5 liters",
            notes="Felt good about reaching 75% of my daily water intake target.",
            goal_id=goal_seed.id  # Use the id from the committed goal
        )
        
        # Add all objects to the session and commit together
        db.session.add_all([goal_seed, preference_seed, progress_update_seed])
        db.session.commit()

        print("Seed complete!")
