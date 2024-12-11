import { createBrowserRouter } from "react-router-dom";
import DashBoardSlider from "./DashBoard/DashBoardSlider";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import DailyCalculation from "./components/DailyCalculation/DailyCalculation";
import MonthlyCost from "./components/monthlyCoastCalculation/MonthlyCost";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import EmployeeCost from "./components/EmployeeCost/EmployeeCost";
import MangeDharAmount from "./components/DharAmount/MangeDharAmount";
import DharAmount from "./components/DharAmount/DharAmount";
import DashBoard from "./DashBoard/DashBoard";


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
      element:<DashBoardSlider></DashBoardSlider>,
      children: [
        {
          path: 'dashboard',
          element: <DashBoard></DashBoard>
        },
        {
          path: 'daily-calculation',
          element: <DailyCalculation></DailyCalculation>
        },
        {
          path: 'monthly-cost',
          element: <MonthlyCost></MonthlyCost>
        },
        {
          path: 'employee-profile',
          element: <EmployeeProfile></EmployeeProfile>
        },
        {
          path: 'employee-cost',
          element: <EmployeeCost></EmployeeCost>
        },
        {
          path: 'manage-dharAmount',
          element: <MangeDharAmount></MangeDharAmount>
        },
        {
          path: 'dharAmount',
          element: <DharAmount></DharAmount>
        },
      ]
      
            
       
      
    },
    
  ])
