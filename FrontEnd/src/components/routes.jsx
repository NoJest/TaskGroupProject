import React, { Children } from 'react';
import App from './App'
import LoginForm from './LoginForm';
import SignUp from './SignUp';



const routes = [
    {
        path: "/dashboard",
        element: <App />,
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
                path: "signUp",
                element: <SignUp/>
            },
    //         {
    //             path: "event",
    //             element: <EventContainer/>
    //         },
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