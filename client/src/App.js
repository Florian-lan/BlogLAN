import React from "react";
import {
  BrowserRouter as Router,
  RouterProvider,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,

} from "react-router-dom";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Single from "./pages/Single/Single"
import Write from "./pages/Write/Write"

import AppRouter from "./router/AppRouter";
import './App.scss'

function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={AppRouter}/>
      </div>
    </div>


  );
}

export default App;
