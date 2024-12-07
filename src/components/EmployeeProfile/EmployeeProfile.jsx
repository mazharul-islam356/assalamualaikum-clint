import {
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { BsBank2 } from "react-icons/bs";
import { FaCommentsDollar, FaRegUserCircle } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import { PiListMagnifyingGlassFill } from "react-icons/pi";
import { RiContactsBook3Fill } from "react-icons/ri";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useDharAmountData from "../../hooks/useDharAmountData";
import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { LiaEditSolid } from "react-icons/lia";

const TABLE_HEAD = ["টাকার পরিমাণ","তারিখ ও সময়", "বিস্তারিত দেখুন "];
const TABLE_HEAD2 = ["টাকার পরিমাণ","দেয়া হয়েছে", "বাকি", ""];

const EmployeeProfile = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleOpen2 = () => setOpen2((cur) => !cur);
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState("");
  console.log(selectedMonth);
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [selectedData, setSelectedData] = useState(null)

  

  useEffect(() => {
    // Get the current month name in Bangla
    const date = new Date();
    const monthName = date.toLocaleString("bn-BD", { month: "long" });
    setCurrentMonthName(monthName); // Set the current month name
    setSelectedMonth(monthName); // Default selection to current month
  }, []);

  console.log("object,", currentMonthName);
  // Format the date
  const formattedDate = startDate.toLocaleDateString("bn-BD", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  // Format the time
  const formattedTime = startDate.toLocaleTimeString("bn-BD", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  //post dhar data
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = form.amount.value;

    const dhar_amount = { amount, formattedDate, formattedTime };

    axiosSecure
      .post("/dhar_amount", dhar_amount)
      .then((res) => {
        if (res.data.acknowledged === true) {
          toast.success("ধারকৃত টাকার পরিমাণ যুক্ত হয়েছে");
          form.reset();
          refetch();
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  //get dhar data

  const [DharAmountData, refetch] = useDharAmountData();

  const handleDetailsOpen = (id) =>{

    const detailsData = DharAmountData.find((item) => item._id === id); // Find the item by ID
    console.log('iddddd',detailsData);
    setSelectedData(detailsData); 
    setOpen2(true);

  }

  return (
    <div className="w-11/12 mx-auto flex-col mt-10 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <img
              src="https://i.ibb.co.com/nMJSq4L/Max-R-Headshot-1.jpg"
              className="w-20 h-20 rounded-full"
              alt=""
            />
          </div>
          <div>
            <h3 className="font-semibold">Charleeii Romance</h3>
            <span>Admin</span>
          </div>
        </div>

        <div>
          <select
            name="employee_name"
            className="border w-56 rounded-md py-1 px-2"
          >
            <option selected disabled>
              Select a name
            </option>
            <option>সজল</option>
            <option>ইকবাল</option>
            <option>মামুন</option>
            <option>শাওন</option>
          </select>
        </div>
      </div>

      <div className="lg:flex justify-around gap-2 mt-10 border-b-2 border-t-2 py-5">
        {/* 01 */}
        <div>
          <div className="flex gap-1 items-center">
            <FaRegUserCircle />
            <h5 className="font-semibold mr-4">নাম:</h5>
            <span className="text-md">শাওন</span>
          </div>
        </div>

        {/* 02 */}
        <div>
          <div className="flex gap-1 items-center">
            <PiListMagnifyingGlassFill />
            <h5 className="font-semibold mr-4">বেতন:</h5>
            <span>60,000</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
        {/* organaization */}
        <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
          <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
            <div className="flex items-center justify-around gap-1">
              <div className="flex items-center gap-1">
                <FaCommentsDollar className="text-2xl"></FaCommentsDollar>
                <h3 className="font-semibold text-xl ">ধারকৃত টাকার হিসাব</h3>
              </div>
              <div>
                <button onClick={handleOpen}>
                  <MdAddToPhotos className="text-2xl"></MdAddToPhotos>
                </button>
              </div>

              {/* --------Modal------ */}

              <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
              >
                <Card className="mx-auto w-full max-w-[24rem]">
                  <CardBody className="flex flex-col gap-4">
                    {/* ----modal header----- */}
                    <Typography
                      className="font-bangla text-center"
                      variant="h4"
                      color="blue-gray"
                    >
                      ধারকৃত টাকার হিসাব যুক্ত করুন
                    </Typography>

                    {/* ----modal form---- */}
                    <form onSubmit={handleSubmit}>
                      <Typography
                        className="mb-1 lg:mt-4 font-bangla"
                        variant="h6"
                      >
                        তারিখ
                      </Typography>
                      <DatePicker
                      required
                        className="p-2 px-3 rounded-lg border-gray-400 border-2 lg:w-[21rem] min-w-md"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />

                      <Typography
                        className="mb-1 mt-4 font-bangla"
                        variant="h6"
                      >
                        টাকার পরিমাণ
                      </Typography>
                      <Input
                        required
                        type="number"
                        label="+ টাকার পরিমাণ যুক্ত করুন"
                        size="lg"
                        name="amount"
                      />

                      <CardFooter className="pt-0">
                        <button
                          onClick={handleOpen}
                          className="w-full font-bangla mx-auto mt-4 py-1 rounded-lg bg-gray-800 text-white"
                        >
                          যুক্ত করুন
                        </button>
                      </CardFooter>
                    </form>
                  </CardBody>
                </Card>
              </Dialog>
            </div>
          </div>
          <div className="mt-4 px-1 overflow-auto">
            <table className="w-full  mx-auto">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 text-center pb-4 px-4 pt-2"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-90 font-bangla"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {DharAmountData.map(
                  ({ formattedDate, formattedTime, amount, _id }) => (
                    <tr
                      key={_id}
                      className="even:bg-blue-gray-50/50 text-center"
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {amount}
                        </Typography>
                      </td>

                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-bangla"
                        >
                          {formattedDate}({formattedTime})
                        </Typography>
                      </td>

                      <td className="p-4">
                        <Link key={_id} className="flex justify-center">
                        <FcViewDetails
                        onClick={() => handleDetailsOpen(_id)} className="text-2xl" />
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

      <Dialog size="sm" open={open2} handler={handleOpen2}>
        <DialogHeader className="text-center flex justify-center items-center">

          <div className="flex items-center gap-1">
                <FaCommentsDollar className="text-2xl"></FaCommentsDollar>
                <h3 className="font-semibold text-xl ">ধারকৃত টাকার হিসাব</h3>
          </div>

        </DialogHeader>
        <DialogBody>
          <div className="mt-4 px-1 overflow-auto">
            <table className="w-full  mx-auto">
              <thead>
                <tr>
                  {TABLE_HEAD2.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 text-center pb-4 px-4 pt-2"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-90 font-bangla"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                
                   {
                    selectedData && (
                      <tr
                     
                      className="even:bg-blue-gray-50/50 text-center"
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {selectedData.amount}
                        </Typography>
                      </td>

                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-bangla"
                        >
                          {selectedData.amount}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-bangla"
                        >
                          {selectedData.amount}
                        </Typography>
                      </td>

                      <td>

                      <Link to='/dashBoard/manage-dharAmount'>
                      <LiaEditSolid className="text-xl text-green-600" />
                      </Link>

                      </td>

                    
                    </tr>
                    )
                   }
                 
              </tbody>
            </table>
          </div>
        </DialogBody>
       
      </Dialog>
        </div>

        {/* অতিরিক্ত খরচ */}
        <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
          <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
            <div className="flex justify-center items-center gap-1">
              <FaSackDollar className="text-2xl"></FaSackDollar>
              <div>
                <h3 className="font-semibold text-xl">অতিরিক্ত খরচ</h3>
              </div>
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
      </div>

      {/* personal info */}
      <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
        <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
          <div className="flex items-center gap-2">
            <IoPersonSharp className="text-2xl"></IoPersonSharp>
            <div>
              <h3 className="font-semibold text-xl">Personal Information</h3>
              <p className="text-xs opacity-70 mt-1">
                Views employee Information
              </p>
            </div>
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
            <RiContactsBook3Fill className="text-2xl"></RiContactsBook3Fill>
            <div>
              <h3 className="font-semibold text-xl">Contact Information</h3>
              <p className="text-xs opacity-70 mt-1">
                Manage employee email,phone
              </p>
            </div>
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
            <BsBank2 className="text-2xl"></BsBank2>
            <div>
              <h3 className="font-semibold text-xl">Bank Information</h3>
              <p className="text-xs opacity-70 mt-1">
                Views employee bank information
              </p>
            </div>
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
