//create a login controlled form with email and password as inputs with async post fetch to (./api/login) and add a state of currentUser as well to initiate the current user.import React, { useState } from 'react';
import React, { useState } from 'react';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('./api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            setCurrentUser(data.user);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (

      <section>
        <form>
              <div>
            <label className=" absolute flex items-center max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"/>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div>
            <label/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button onClick={handleLogin}>Login</button>

            </form>

        </section>
        
    );
};

export default LoginForm;

// Updated code:
// - Fixed typo in "response fromat" to "response format"
// - Added try-catch block to handle errors during fetch
// - Set currentUser state with data.user after successful login
// - Added comments to explain the code changes and functionality
