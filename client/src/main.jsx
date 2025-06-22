import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/ModifyRecord";
import RecordList from "./components/RecordList";
import NutritionAPI from "./components/NutritionAPI";
import ExerciseAPI from "./components/ExerciseAPI"
import "./index.css";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <RecordList /> },
      { path: "/nutrition", element: <NutritionAPI /> },
      { path: "/exercise", element: <ExerciseAPI /> },
      { path: "/create", element: <Record /> },
      { path: "/edit/:id", element: <Record /> },
    ],
  },
  {
    path: "/home",
    element: <App />,
    children:[
      {
        path: "/home",
        element: <Homepage/>,
      }
    ]
    
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
