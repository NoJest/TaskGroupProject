import React, { useState, useEffect, useContext, createContext } from "react";
import Bg2 from "./Bg2";
import Bg3 from "./BG3.JSX";
import { Navigate, useNavigate } from "react-router-dom";
// import { UserContext } from './App';

export const newUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

const Alert = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg bg-${type === "success" ? "green-500" : "red-500"} text-white flex items-center justify-between`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-white bg-transparent hover:bg-white hover:text-red-500 rounded-md p-1"
        onClick={onClose}
      >
        ✖
      </button>
    </div>
  );
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission process
  const [isVisible, setIsVisible] = useState(false); // State to control form visibility
  const [alert, setAlert] = useState(null); // Alert state
  const navigate = useNavigate()

  const [newUSer, setNewUser] = useState(null);

  async function check_session() {
    const response = await fetch('./api/check_session');
    if (response.status === 200) {
      const data = await response.json();
      setNewUser(data);
    }
  }

  useEffect(() => {
    check_session();
  }, []);



  useEffect(() => {
    // Automatically show the form when the page loads
    const timeout = setTimeout(() => setIsVisible(true), 500); // Delay visibility for a slower transition
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match!", type: "error" });
      return;
    }

    setError(""); // Clear any previous errors
    setIsSubmitting(true); // Start submission process

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, name, password }),
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setNewUser(data);
        setAlert({ message: "Sign-up successful!", type: "success" });
        navigate('/profile')
        setIsVisible(false); // Hide the form after submission
      } else {
        setAlert({ message: "Invalid email or password", type: "error" });
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
      setAlert({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false); // End submission process
    }
  };

  return (
    <div className="relative">
      <Bg3 className="absolute inset-0 bg-blue-500 z-0" />

      {/* Form Section */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <section
        className={`z-10 my-36 max-w-4xl mx-auto py-20 px-10 bg-white rounded-lg shadow-lg dark:bg-gray-800 flex justify-center items-center absolute inset-0 transition-all duration-1000 ease-in-out transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {isVisible && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            autoComplete="on" // so browser can autofill this form
          >
            <img
              className="flex relative rounded-lg"
              src="https://i.imgur.com/NaYN7AS.jpeg"
              alt="signUp"
            />
            <h1 className="mt-6 text-2xl text-center font-bold text-orange-500 dark:text-gray-200 underline-offset-auto">
              Begin Your Journey
            </h1>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200"
              >
                Name
              </label>
              <input
                id="name"
                name="name" // adding this so that autocomplete works
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                autoComplete= "name" // providing autocomplete attribute
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                id="email"
                name= "email" // adding this so that autocomplete works
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                autoComplete= "email"// providing autocomplete attribute
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200"
              >
                Phone
              </label>
              <input
                id="phone"
                name= "phone" // adding this so that autocomplete works
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                autoComplete="tel" // Providing autocomplete attribute
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                name= "password" // adding this so that autocomplete works can remove if we dont want users to autofill passwords
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                autoComplete="new-password" //PRoviding autocompelte attribute
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name = "confirmPassword" // adding this so that autocomplete works
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                autoComplete= "new-password" //Providing autocomplete attribute
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
                className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default SignUp;
