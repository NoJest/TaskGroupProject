import { Link, Outlet } from 'react-router-dom'
import Home from './Home';
import Bg1 from './BG1';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from './Dashboard';
import React, { createContext, useContext, useState, useEffect } from "react";



export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});



function App() {
  const [currentUser, setCurrentUser] = useState(null);

  async function check_session() {
    const response = await fetch('/api/check_session');
    if (response.status === 200) {
      const data = await response.json();
      setCurrentUser(data);
    }
  }

  useEffect(() => {
    check_session();
  }, []);

  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  if (!currentUser) {
    return (
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <section>
          <Bg1 />
          <div>
            {!isLoginRoute && <Home />}
            <Outlet />
          </div>
        </section>
      </UserContext.Provider>
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

export default App;
