import { Link, Outlet } from 'react-router-dom'
import Home from './Home';
import Bg1 from './BG1';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


function App() {

  const location = useLocation();

  const isLoginRoute = location.pathname === "/login";

  return (
    <section>
    <Bg1/>
   <div>
   {!isLoginRoute && (
    <Home/>
   )}
    <Outlet/>
  </div>
  </section>
  
  );
}

export default App;
