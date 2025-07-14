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
import ContactUs from "./pages/ContactUs";
import AdminDash from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "/", element: <RecordList /> },
      { path: "/", element: <Homepage /> },
      { path: "/home", element: <Homepage /> },
      { path: "/nutrition", element: <NutritionAPI /> },
      { path: "/exercise", element: <ExerciseAPI /> },
      { path: "/create", element: <Record /> },
      { path: "/edit/:id", element: <Record /> },
      { path: "/contactus", element: <ContactUs /> },
      {path: "/admindash", element: <AdminDash/>}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
