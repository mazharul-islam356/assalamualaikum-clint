import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const Layout = () => {
    return (
        <div>

            <Navbar></Navbar>

           <div className="flex-1">
           <Outlet></Outlet>
           </div>
           
            
        </div>
    );
};

export default Layout;