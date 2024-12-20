import React, { useState, useEffect, useContext }  from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from './App';


const LoginForm = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false); // State to control form visibility
    const navigate = useNavigate()

    useEffect(() => {
        // Automatically show the form when the page loads
        const timeout = setTimeout(() => setIsVisible(true), 100); // Delay visibility for a slower transition
        return () => clearTimeout(timeout);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('./api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const user = await response.json();
            setCurrentUser(user);
            navigate('/dashboard')
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    if (!currentUser) {
    return (
        <section 
            className={`relative m-60 flex gap-10 items-center max-w-4xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-inner transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Background Image Section */}
            <div className="flex w-full h-96 overflow-hidden bg-white rounded-l-lg shadow-lg dark:bg-gray-800">
                <img className='' src='https://i.imgur.com/LlPQ76V.jpeg' />
            </div>

            {/* Content Section */}
            <form className='mx-10 py-10'>
                <h1 className='mt- text-xl text-center text-orange-900 dark:text-gray-200 underline-offset-auto'>Welcome Back</h1>
                <div className='grid grid-cols-1 gap-6 min-w-96'>
                    <label className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-200" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                    />
                </div>

                <div className='grid grid-cols-1 gap-6 w-96 my-4'>
                    <label className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-200" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                    />
                </div>
                <button onClick={handleLogin} className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Login
                </button>
            </form>
        </section>
        );
    } else {
        return (
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
              <div>
                <Dashboard />
              </div>
            </UserContext.Provider>
          );
    }
}
export default LoginForm;
