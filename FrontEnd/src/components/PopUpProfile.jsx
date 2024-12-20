import React, { useState, useEffect } from 'react';
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.png'
import avatar4 from '../assets/avatar4.png'
import Bg3 from "./BG3.JSX";

import { Navigate, useNavigate } from 'react-router-dom';




const PopUpProfile = () => {


  const [currentUser, setCurrentUser] = useState(null) 
  // we'll partially track the signed in user using state


async function check_session() {
  const response = await fetch('/api/check_session')
  if (response.status === 200) {
    const data = await response.json()
    setCurrentUser(data)

  }
  // use nav home
  
}

useEffect(()=>{
  check_session()
},[])

  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true); // State to control form 
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    careerPath: '',
    notificationType: '',
    mood: '',
    commitmentTime: '',
    avatar: '',
    goalTitle: '',
    description: '',
    startDate: '',
    endDate: '',
    frequency: '',
    goalTarget: '',
  });

  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStep(step + 1);
      setIsVisible(true);
    }, 300); // Delay for smooth transition
  };

  const handlePrevious = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStep(step - 1);
      setIsVisible(true);
    }, 300); // Delay for smooth transition
  };

  const [profileData, setProfileData] = useState({
    careerPath: '',
    notificationType: '',
    mood: '',
    commitmentTime: '',
    avatar: '',
  });
  const handleSubmit = async () => {
    // Add logic to send data to backend
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
    
      if (response.ok) {
        const user = await response.json();
        // Store profile_id for linking goals later
        setProfileData(user.id);
        console.log('Form Data Submitted:', formData);

      }
    
    const [goalData, setGoalData] = useState({
      goalTitle: '',
      description: '',
      startDate: '',
      endDate: '',
      frequency: '',
      goalTarget: '',
    });
    
      const r = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...goalData, profile_id: profileId }),
      });
    
      if (r.ok) {
        const data = await r.json()
        setGoalData(data)
        console.log('Goal saved successfully');
      }
    
    
    navigate('/dashboard')
  };

  return (


    <div>      
        <Bg3 className="absolute inset-0 bg-blue-500 z-0" />
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white bg-opacity-90 rounded-lg p-6 shadow-lg w-full max-w-4xl transition-transform transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Form 1: Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Career Path</label>
                <input
                  type="text"
                  name="careerPath"
                  value={formData.careerPath}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>

      <div className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          id="email"
          name="email"
          checked={notificationTypes.email}
          onChange={handleCheckboxChange}
          className="w-5 h-5 accent-blue-500"
        />
        <label htmlFor="email" className="text-sm">
          Email
        </label>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          id="phone"
          name="phone"
          checked={notificationTypes.phone}
          onChange={handleCheckboxChange}
          className="w-5 h-5 accent-green-500"
        />
        <label htmlFor="phone" className="text-sm">
          Phone
        </label>
      </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Mood</label>
                <input
                  type="text"
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Commitment Time (hours)</label>
                <input
                  type="number"
                  name="commitmentTime"
                  value={formData.commitmentTime}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium mb-1">Select Avatar</label>
                <div className="flex space-x-2">
                  {avatars.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => setFormData({ ...formData, avatar })}
                      className={`w-16 h-16 rounded-full border-2 p-1 ${
                        formData.avatar === avatar
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      } hover:border-blue-500`}
                    >
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Form 2: Goal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Goal Title</label>
                <input
                  type="text"
                  name="goalTitle"
                  value={formData.goalTitle}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                >
                  <option value="">Select</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Goal Target</label>
                <input
                  type="text"
                  name="goalTarget"
                  value={formData.goalTarget}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>

  );
};



export default PopUpProfile;