//create a signUp file for a page with a  controlled form with "name", "email", "phone" and "password" as inputs with async post fetch to (./api/login) and add a state of currentUser as well to initiate the current user.

import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = async () => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      // Proceed with form submission
      const response = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok){
          const data = await response.json()
          setCurrentUser(data)
        } else{ 
          alert('invalid email or password')
        }
    };
      alert("Passwords match! Form submitted.");
    }
    

    return (
        <section className=" absolute flex items-center max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'> 

          
            {/* Name Field */}
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
              />
            </div>
      
            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
              />
            </div>
      
            {/* Phone Field */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
              />
            </div>
      
            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
              />
            </div>
      
            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
              />
            </div>
      
            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign Up
              </button>
            </div>

            </div>
          </form>
        </section>
      );
    }      

export default SignUp;
