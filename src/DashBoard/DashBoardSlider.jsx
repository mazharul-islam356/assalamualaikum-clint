import { useEffect, useRef, useState } from "react";
import "./dashBoardSlider.css";
// import profile from "../assets/profile.jpg";
import { Link, Outlet } from "react-router-dom";
import { MdAdminPanelSettings, MdLogout, MdNotificationAdd, MdNotifications } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Badge,
  IconButton,
} from "@material-tailwind/react";
import { CiStreamOn, CiViewList } from "react-icons/ci";
import { PiReadCvLogoDuotone } from "react-icons/pi";
import { HiOutlineIdentification } from "react-icons/hi2";




const DashBoardSlider = () => {

    const [isOpen, setIsOpen] = useState(false);
  const [dashBoardSliderOpen, setdashBoardSliderOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [alwaysOpen, setAlwaysOpen] = useState(false);
  const [alwaysOpen2, setAlwaysOpen2] = useState(false);
 


  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleAlwaysOpen2 = () => setAlwaysOpen2((cur) => !cur);
  const handleAlwaysOpen3 = () => setAlwaysOpen3((cur) => !cur);

  
  useEffect(() => {
    const closeBtn = document.querySelector("#btn");

    closeBtn.addEventListener("click", toggleSidebar);

    return () => {
      closeBtn.removeEventListener("click", toggleSidebar);
    };
  }, []);

  const handleDashBoardSliderOpen = () => {
    setdashBoardSliderOpen(!dashBoardSliderOpen);
  };

  const handleLeaveOpen = () => {
    setLeaveOpen(!leaveOpen);
  };

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  const menuBtnChange = () => {
    const closeBtn = document.querySelector("#btn");
    if (isOpen) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  useEffect(() => {
    menuBtnChange();
  }, [isOpen]);

   // State to keep track of the current active page
   const [activePage, setActivePage] = useState(null);

   // Function to set the current page
   const handlePageClick = (page) => {
     setActivePage(page);
   };

 


    return (
        <div>
      <div className={`sidebar  ${isOpen ? "open" : "closee"}`}>
        <div className="logo_details">
          <div className="logo_name">Nomivista</div>
          <i className="bx bx-menu" id="btn"></i>
        </div>
        <ul className="nav-list">
          <li className="cursor-pointer">
            <Accordion open={alwaysOpen}>
              <AccordionHeader
                className="border-none p-0 "
                onClick={handleAlwaysOpen}
              >
                <Link
                  to="adminDashBoard"
                  className="transition ease-in-out a"
                  onClick={handleDashBoardSliderOpen}
                >
                  <i className="bx bx-grid-alt"></i>
                  <span className="link_name">Dashboard</span>
                  <i className="bx link_name bx-chevron-down ml-4"></i>
                  <span className="tooltip">Dashboard</span>
                </Link>
              </AccordionHeader>
              <Link  onClick={() => handlePageClick('admin')}
          style={{
            color: activePage === 'admin' ? 'red' : 'black',
          }}  to="adminDashBoard">
                <AccordionBody className="ml-10 text-sm flex mt-1 items-center gap-1 p-0 sub-catagory  hover:opacity-70 transition">
                  <MdAdminPanelSettings className="text-md"></MdAdminPanelSettings>
                  <p>Admin Dashboard</p>
                </AccordionBody>
              </Link>

              <Link onClick={() => handlePageClick('employee')}
          style={{
            color: activePage === 'employee' ? 'red' : 'black',
          }}  to="employeeDashBoard">
                <AccordionBody className="ml-10 text-white hover:opacity-70 transition mt-2 text-sm flex items-center gap-1 p-0 sub-catagory">
                  <CgProfile className="text-md"></CgProfile>
                  <p>Employee Dashboard</p>
                </AccordionBody>
              </Link>
            </Accordion>
          </li>

          <li>
            <Link to='employeeProfile' className="a">
            <i className='bx bx-user-circle'></i>
              <span className="link_name">Profile</span>
            </Link>
            <span className="tooltip">Profile</span>
          </li>


          {/* ------02-------- */}
         <li  onClick={() => handlePageClick('home')}
          style={{
            color: activePage === 'home' ? 'blue' : 'black',
          }} className="cursor-pointer">
         <Accordion open={alwaysOpen2}>
            <AccordionHeader
              className="border-none p-0 "
              onClick={handleAlwaysOpen2}
            >
              <Link
                to="leaveApplication"
                className="transition ease-in-out a"
                onClick={handleLeaveOpen}
              >
                <i className='bx bx-calendar-alt'></i>
                <span className="link_name">Leave</span>
                <i className="bx link_name bx-chevron-down ml-4"></i>
                <span className="tooltip">Leave</span>
              </Link>
            </AccordionHeader>
            <Link className="" to="leaveApplication">
              <AccordionBody className="ml-10 text-sm flex mt-1 items-center gap-1 p-0 sub-catagory text-white hover:opacity-70 transition">
                <PiReadCvLogoDuotone   className="text-md"></PiReadCvLogoDuotone>
                <p>Leave application</p>
              </AccordionBody>
            </Link>

            <Link to="leaveApplicationList">
              <AccordionBody className="ml-10 text-white hover:opacity-70 transition mt-2 text-sm flex items-center gap-1 p-0 sub-catagory">
                <CiViewList  className="text-md"></CiViewList>
                <p>Leave application list</p>
              </AccordionBody>
            </Link>
          </Accordion>
         </li>

          <li>
            <Link className="a">
              <i className="bx bx-chat"></i>
              <span className="link_name">Message</span>
            </Link>
            <span className="tooltip">Message</span>
          </li>

          <li>
            <Link className="a">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Analytics</span>
            </Link>
            <span className="tooltip">Analytics</span>
          </li>

          <li>
            <Link className="a">
              <i className="bx bx-folder"></i>
              <span className="link_name">File Manager</span>
            </Link>
            <span className="tooltip">File Manager</span>
          </li>

          <li>
            <Link className="a">
              <i className="bx bx-cart-alt"></i>
              <span className="link_name">Order</span>
            </Link>
            <span className="tooltip">Order</span>
          </li>
          <li>
            <Link className="a">
              <i className="bx bx-cog"></i>
              <span className="link_name">Settings</span>
            </Link>
            <span className="tooltip">Settings</span>
          </li>
          <li className="profile">
            <div className="profile_details">
              {/* <img src={profile} alt="profile image" /> */}
              <div className="profile_content">
                <div className="name">Mazharul Islam</div>
                <div className="designation">Admin</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <Outlet></Outlet>
      </section>
    </div>
    );
};

export default DashBoardSlider;