import React, { Children } from 'react';
import App from './App'
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Home from './Home';
import PopUpProfile from './PopUpProfile'




const routes = [
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path:"/SignUp",
        element:<SignUp/>

    },
    {
        path:"/profile",
        element:<PopUpProfile/>
    },
    {
        path: "/",
        element: <App />,
        children:[
            {
                path: "login",
                element: <LoginForm />
            },
         
          {
              path: "home",
              element: <Home/>
           },
         
    //         {
    //             path: "event/:id",
    //             element: <EventsPage/>
    //         }, 
        ]
    },
    // {
    //         element: <Error />,
    //         path: "*"
    // }
]



export default routes