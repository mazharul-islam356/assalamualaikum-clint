import { BsBank2 } from "react-icons/bs";
import { FaRegBuilding, FaRegUserCircle } from "react-icons/fa";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { PiListMagnifyingGlassFill } from "react-icons/pi";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TbUsersGroup, TbWorld } from "react-icons/tb";


const EmployeeProfile = () => {

 

    return (
        <div className="w-11/12 mx-auto flex-col mt-10 pb-10">

           <div className="flex items-center justify-between">
           <div className="flex gap-2 items-center">
          <div>
          <img src="https://i.ibb.co.com/nMJSq4L/Max-R-Headshot-1.jpg" className="w-20 h-20 rounded-full" alt="" />
          </div>
            <div>
            <h3 className="font-semibold">Charleeii Romance</h3>
            <span>Admin</span>
            </div>
           </div>

           <div>

            <span className="bg-red-500">TODO: Edit Profile</span>
           </div>
           </div>



       <div className="flex justify-around gap-2 mt-10 border-b-2 border-t-2 py-5">
        
        {/* 01 */}
            <div>
          <div className="flex gap-1 items-center">
            <FaRegUserCircle />
            <h5 className="font-semibold mr-4">User ID:</h5>
            <span className="text-sm">58788799</span>
           </div>
          <div className="flex gap-1 mt-2 items-center">
            <HiDevicePhoneMobile />
            <h5 className="font-semibold mr-4">Phone Number:</h5>
            <span className="text-sm">+880186678946</span>
           </div>

           <div className="flex gap-1 mt-2 items-center
           ">
            <MdOutlineMail />
            <h5 className="font-semibold mr-4">Email:</h5>
            <span>rifat56@gmail.com</span>
           </div>
          </div>

          {/* 02 */}
          <div>
          <div className="flex gap-1 items-center">
            <PiListMagnifyingGlassFill />
            <h5 className="font-semibold mr-4">Type:</h5>
            <span>Regular</span>
           </div>
          <div className="flex gap-1 mt-2 items-center">
            <TbUsersGroup />
            <h5 className="font-semibold mr-4">Group:</h5>
            <span>Internship</span>
           </div>

           <div className="flex gap-1 mt-2 items-center
           ">
            <FaRegBuilding  />
            <h5 className="font-semibold mr-4">Company:</h5>
            <span>XYZ ltd</span>
           </div>
          </div>
       </div>



       {/* organaization */}
       <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
        <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
        <div className="flex items-center gap-1">
        <TbWorld className="text-2xl"></TbWorld>
        <div>
        <h3 className="font-semibold text-xl">Organaization</h3>
        <p className="text-xs opacity-70 mt-1">Views employee organaization</p></div> 
        </div>
               

        </div>
        <div className="flex mt-4 px-5">
             <div className="flex items-center gap-2">
                
               <div>
               <h1 className="text-xl font-semibold">Acme ltd.</h1>
               <div className="text-sm">admin</div>
               </div>
             </div>
          
            </div>
       </div>


       {/* personal info */}
       <div className="mt-10 border shadow-md pb-6 rounded-b-lg">

       <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
        <div className="flex items-center gap-2">
        <IoPersonSharp className="text-2xl"></IoPersonSharp>
        <div>
        <h3 className="font-semibold text-xl">Personal Information</h3>
        <p className="text-xs opacity-70 mt-1">Views employee Information</p></div> 
        </div>
               

        </div>
        <div className="mt-4">
             <div>
                
               <div className="flex px-5 text-sm items-center justify-between border-b-2 pb-2">
               <h1 className="font-semibold opacity-90">Father's Name:</h1>
               <span>Rahat Hasan</span>
               </div>
             </div>
          
            </div>
        <div className="mt-4">
             <div>
                
               <div className="flex text-sm px-5 items-center justify-between border-b-2 pb-2">
               <h1 className="font-semibold opacity-90">Mother's Name:</h1>
               <span>Fatima Begum</span>
               </div>
             </div>
          
            </div>

        <div className="mt-4">
             <div>
                
               <div className="flex text-sm px-5 items-center justify-between">
               <h1 className="font-semibold opacity-90">National ID:</h1>
               <span>24897875454</span>
               </div>
             </div>
          
            </div>
       </div>



       {/* Contact info */}
       <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
          <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
        <div className="flex items-center gap-2">
        <RiContactsBook3Fill  className="text-2xl"></RiContactsBook3Fill>
        <div>
        <h3 className="font-semibold text-xl">Contact Information</h3>
        <p className="text-xs opacity-70 mt-1">Manage employee email,phone</p></div> 
        </div>
               

        </div>
        <div className="mt-4">
             <div>
                
               <div className="flex px-5 text-sm items-center justify-between border-b-2 pb-2">
               <h1 className="font-semibold opacity-90">Email:</h1>
               <span>rifat75@gmail.com</span>
               </div>
             </div>
          
            </div>

        <div className="mt-4">
             <div>
                
               <div className="flex px-5 text-sm items-center justify-between">
               <h1 className="font-semibold opacity-90">Phone Number:</h1>
               <span>+880157984465</span>
               </div>
             </div>
          
            </div>
       </div>

       {/* Bank info */}
       <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
        <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
        <div className="flex items-center gap-2">
        <BsBank2  className="text-2xl"></BsBank2>
        <div>
        <h3 className="font-semibold text-xl">Bank Information</h3>
        <p className="text-xs opacity-70 mt-1">Views employee bank information</p></div> 
        </div>
               

        </div>
        <div className="mt-4">
             <div>
                
               <div className="flex px-5 text-sm items-center justify-between border-b-2 pb-2">
               <h1 className="font-semibold opacity-90">Bank Name:</h1>
               <span>Islami Bank Bangladesh LTD.</span>
               </div>
             </div>
          
            </div>
        <div className="mt-4">
             <div>
                
               <div className="flex px-5 text-sm items-center justify-between border-b-2 pb-2">
               <h1 className="font-semibold opacity-90">Acounr No.:</h1>
               <span>7825254353276885</span>
               </div>
             </div>
          
            </div>
            <div className="mt-4">
             <div>
                
               <div className="flex px-5 text-sm items-center justify-between border-b-2 pb-2">
               <h1 className="font-semibold opacity-90">E-TIN No.:</h1>
               <span>8254265</span>
               </div>
             </div>
          
            </div>

            <div className="mt-4">
             <div>
                
               <div className="flex px-5 text-sm items-center justify-between">
               <h1 className="font-semibold opacity-90">Routing Number.:</h1>
               <span>254887465684</span>
               </div>
             </div>
          
            </div>
       </div>

        </div>
        
    );
};

export default EmployeeProfile;