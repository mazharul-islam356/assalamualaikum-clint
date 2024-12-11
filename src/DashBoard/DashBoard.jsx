import { MdOutlineDashboard } from "react-icons/md";


const DashBoard = () => {
    return (
        <div className="w-11/12 mx-auto">

           <div className="flex items-center gap-2 mt-6 justify-center">
           <MdOutlineDashboard className="text-3xl" />
           <h1 className="font-bangla font-semibold text-2xl text-center">ড্যাশবোর্ড</h1>
           </div>
           <div>

            <div className="w-48 h-28 bg-red-500 rounded-xl">
                
                Monthly Tolal
            </div>


           </div>
        </div>
    );
};

export default DashBoard;