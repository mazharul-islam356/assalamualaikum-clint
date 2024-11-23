import { createBrowserRouter } from "react-router-dom";
import DashBoardSlider from "./DashBoard/DashBoardSlider";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/login",
      element:<Register></Register>
    },
    
    {
      path:'/dashBoard',
      element:<DashBoardSlider></DashBoardSlider>
     
        
       
      
    },
    
  ])
