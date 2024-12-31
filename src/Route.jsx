import { createBrowserRouter } from "react-router-dom";
import Login from "./Authentication/Login";
import DailyCalculation from "./components/DailyCalculation/DailyCalculation";
import MonthlyCost from "./components/monthlyCoastCalculation/MonthlyCost";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import EmployeeCost from "./components/EmployeeCost/EmployeeCost";
import MangeDharAmount from "./components/DharAmount/MangeDharAmount";
import DharAmount from "./components/DharAmount/DharAmount";
import DashBoard from "./DashBoard/DashBoard";

import EmployeeSalary from "./components/EmployeeCost/EmployeeSalary";
import Layout from "./Shared/Layout";

export const router = createBrowserRouter([
    
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        {
          path: '/',
          element: <DashBoard></DashBoard>
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: '/daily-calculation',
          element: <DailyCalculation></DailyCalculation>
        },
        {
          path: '/monthly-cost',
          element: <MonthlyCost></MonthlyCost>
        },
        {
          path: '/employee-profile',
          element: <EmployeeProfile></EmployeeProfile>
        },
        {
          path: '/employee-cost',
          element: <EmployeeCost></EmployeeCost>
        },
        {
          path: '/employee-salary',
          element: <EmployeeSalary></EmployeeSalary>
        },
        {
          path: '/manage-dharAmount',
          element: <MangeDharAmount></MangeDharAmount>
        },
        {
          path: '/dharAmount',
          element: <DharAmount></DharAmount>
        },
      ]
    },
    
    
    
  ])
