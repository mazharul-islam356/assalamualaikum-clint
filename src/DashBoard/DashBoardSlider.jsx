import { useEffect, useState } from "react";
import "./dashBoardSlider.css";
// import profile from "../assets/profile.jpg";
import { Link, Outlet } from "react-router-dom";





const DashBoardSlider = () => {

    const [isOpen, setIsOpen] = useState(false);
  const [dashBoardSliderOpen, setdashBoardSliderOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [alwaysOpen, setAlwaysOpen] = useState(false);
 
 


  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
 

  
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

 
 


    return (
        <div>
      <div className={`sidebar font-bangla  ${isOpen ? "open" : "closee"}`}>
        <div className="logo_details">
          <div className="logo_name">Salamualaikum</div>
          <i className="bx bx-menu" id="btn"></i>
        </div>
        <ul className="nav-list">
          <li className="cursor-pointer">
                     
             
                <Link
                  to="#"
                  className="transition ease-in-out a"
                  onClick={handleDashBoardSliderOpen}
                >
                  <i className="bx bx-grid-alt"></i>
                  <span className="link_name">ড্যাশবোর্ড</span>
                 
                  <span className="tooltip">ড্যাশবোর্ড</span>
                </Link>
                       
          </li>



          <li>
            <Link to='daily-calculation' className="a">
            <i className='bx bx-calculator'></i>
              <span className="link_name">দৈনিক হিসাব</span>
            </Link>
            <span className="tooltip">দৈনিক হিসাব</span>
          </li>

          <li>
            <Link to='monthly-cost' className="a">
            <i className='bx bx-dollar-circle' ></i>
              <span className="link_name">এককালীন মাসিক খরচ</span>
            </Link>
            <span className="tooltip">এককালীন মাসিক খরচ</span>
          </li>

          
          <li>
            <Link to='employee-cost' className="a">
            <i className='bx bx-purchase-tag-alt'></i>
              <span className="link_name">কর্মীর অতিরিক্ত খরচ</span>
            </Link>
            <span className="tooltip">কর্মীর অতিরিক্ত খরচ</span>
          </li>

          <li>
            <Link to='employee-profile' className="a">
            <i className='bx bx-user-circle'></i>
              <span className="link_name">এমপ্লয়ী প্রোফাইল</span>
            </Link>
            <span className="tooltip">এমপ্লয়ী প্রোফাইল</span>
          </li>

          

          <li>
            <Link className="a">
            <i className='bx bx-wallet-alt'></i>
              <span className="link_name">মাসিক খরচের হিসাব</span>
            </Link>
            <span className="tooltip">মাসিক খরচের হিসাব</span>
          </li>



          <li>
            <Link className="a">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">হিসাব</span>
            </Link>
            <span className="tooltip">হিসাব</span>
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