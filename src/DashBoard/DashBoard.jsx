import { MdAttachMoney, MdOutlineDashboard } from "react-icons/md";


const DashBoard = () => {
    return (
        <div className="w-11/12 mx-auto">

           <div className="flex items-center gap-2 mt-6 justify-center">
           <MdOutlineDashboard className="text-3xl" />
           <h1 className="font-bangla font-semibold text-2xl text-center">ড্যাশবোর্ড</h1>
           </div>
           <div>

          <div className="grid grid-cols-2 justify-center items-center justify-items-center mt-10">
          <div className="w-60 h-36 py-2 flex flex-col justify-center items-center rounded-md gap-2 text-white bg-gray-400">
            <div className="flex items-center justify-around gap-2">
              <MdAttachMoney className="text-4xl"></MdAttachMoney>
            <span className="text-4xl font-semibold">41</span>
            </div>
              <h5 className="text-center font-bold text-lg">Mashik Total</h5>
          </div>

           <div className="w-60 h-36 py-2 flex flex-col justify-center items-center rounded-md gap-2 text-white bg-red-400">
            <div className="flex items-center justify-around gap-2">
              <MdAttachMoney className="text-4xl"></MdAttachMoney>
            <span className="text-4xl font-semibold">6</span>
            </div>
              <h5 className="text-center font-bold text-lg">Mashik Total</h5>
          </div>
          </div>


           </div>
        </div>
    );
};

export default DashBoard;