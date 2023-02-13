import React from 'react';
import {
    BrowserRouter as Router,
    createBrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Single from '../pages/Single/Single';
import Write from '../pages/Write/Write';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';





// 可以实现只在指定的地方使用这个布局（有些页面不需要navbar和footer）

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

const AppRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/post/:id",
                    element: < Single />
                }, 
                {
                    path: "/write",
                    element: <Write />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        }, {
            path: "/register",
            element: <Register />
        }

    ]
)



export default AppRouter