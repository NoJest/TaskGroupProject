import React, { Children } from 'react';
import App from './App'
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Dashboard from './Dashboard';



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
        path: "/",
        element: <App />,
        children:[
            {
                path: "login",
                element: <LoginForm />
            },
         
    //       {
    //             path: "event",
    //             element: <EventContainer/>
    //        },
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