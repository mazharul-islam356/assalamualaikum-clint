import { SiManageiq } from "react-icons/si";
import {
    Button,
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
  import { FaCommentsDollar } from "react-icons/fa";
  import { MdAddToPhotos } from "react-icons/md";
  
  import useAxiosSecure from "../../hooks/useAxiosSecure";
  import toast from "react-hot-toast";
  import { Link } from "react-router-dom";
  import { FcViewDetails } from "react-icons/fc";
  import { LiaEditSolid } from "react-icons/lia";
import useDharAmountData from "../../hooks/useDharAmountData";
  
  const TABLE_HEAD = ["টাকার পরিমাণ","তারিখ ও সময়", "বিস্তারিত দেখুন "];
  const TABLE_HEAD2 = ["টাকার পরিমাণ","দেয়া হয়েছে", "বাকি", ""];

  
const DharAmount = () => {

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
        <div className="w-11/12 mx-auto">

            <div>

            <div className=" mt-10 rounded-md p-4">
            <div>
              <div className="flex items-center justify-center gap-1">
                <FaCommentsDollar className="text-2xl"></FaCommentsDollar>
                <h3 className="font-semibold text-2xl ">ধারকৃত টাকার হিসাব</h3>
              </div>

              <div className="flex justify-between items-center mt-10">

              <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="gray"
            label="এখানে সার্চ করুন..."
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
         
        </div>
    
                
                <button onClick={handleOpen}>
                  <MdAddToPhotos className="text-3xl"></MdAddToPhotos>
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

            <div className="">
        {/* organaization */}
        <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
          
          <div className="overflow-auto">
            <table className="w-full  mx-auto">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-100 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold text-lg leading-none opacity-90 font-bangla"
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


      </div>
        </div>
        </div>
    );
};

export default DharAmount;