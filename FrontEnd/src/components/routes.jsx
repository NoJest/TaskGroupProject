import React, { Children } from 'react';
import App from './App'



const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/home",
        element: <App />,
        children:[
    //         {
    //             path: "search",
    //             element: <Search />
    //         },
    //         {
    //             path: "create",
    //             element: <Create/>
    //         },
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