import React, { useState } from 'react';
import Bg2 from './Bg2';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const response = await fetch('./api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        alert('Sign-up successful!');
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      console.error('Error during sign-up:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Bg2 />
      <section className="relative m-40 p-20 max-w-4xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <img className='flex relative rounded-lg' src="https://i.imgur.com/NaYN7AS.jpeg" alt="signUp" />
          <h1 className='mt-6  text-2xl text-center font-bold  text-orange-500 dark:text-gray-200 underline-offset-auto'>Begin Your Journey </h1>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="col-span-2 text-red-600">
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUp;
