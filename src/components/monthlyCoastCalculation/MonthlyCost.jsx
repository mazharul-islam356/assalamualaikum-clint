import { TbReportMoney } from "react-icons/tb";
import {
  Typography,
  Input,
  Card,

  Button,
  Dialog,
 
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoChecklist } from "react-icons/go";
import "./montlyCost.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useMonthlyCostData from "../../hooks/useMonthlyCostData";
import { MdDelete } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";
import { FaMinusCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const TABLE_HEAD = ["নং", "মাস", "মোট খরচ", "বিস্তারিত দেখুন", ""];

const TABLE_ROWS = [
  {
    name: "০১",
    job: "সেপ্টেম্বর",
    date: "৮৪৮৫",
  },
];

const MonthlyCost = () => {
  const [open, setOpen] = useState(false);
  const [monthlyCostSelectedMonth, setSelectedMonth] = useState("");
  const handleModalOpen = () => setOpen(!open);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonthName, setCurrentMonthName] = useState("");

  useEffect(() => {
    // Update the current date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Get the current month name in Bangla
    const monthName = new Date().toLocaleString("bn-BD", { month: "long" });
    setCurrentMonthName(monthName);

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  // Format the date in Bangla
  const formattedDate = currentDate.toLocaleDateString("bn-BD", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  // Format the time in Bangla
  const formattedTime = currentDate.toLocaleTimeString("bn-BD", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  
  
  const axiosSecure = useAxiosSecure();
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  // console.log(selectedMonth);
 
  const [inputPairs, setInputPairs] = useState([{ id: 1, product: "", price: "" }])
  const [total, setTotal] = useState(0)
  console.log(inputPairs,total);
  const monthlyCostData = {monthlyCostSelectedMonth,inputPairs,total,formattedDate,formattedTime}

  // handle add or remove input
  useEffect(() => {
    const sum = inputPairs.reduce((acc, pair) => {
      const numPrice = parseFloat(pair.price) || 0
      return acc + numPrice
    }, 0)
    setTotal(sum)
  }, [inputPairs])

  const addInputPair = () => {
    const newId = inputPairs.length + 1
    setInputPairs([...inputPairs, { id: newId, product: "", price: "" }])
  }

  const removeInputPair = (id) => {
    setInputPairs(inputPairs.filter((pair) => pair.id !== id))
  }

  const handleInputChange = (id, field, value) => {
    setInputPairs(
      inputPairs.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    )
  }

  // convert bangla to english number
  const convertToBanglaNumerals = (number) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number
      .toString()
      .split('')
      .map((digit) => banglaDigits[digit])
      .join('');
  };
  

  // post monthly cost data
  const handleSubmit = (e) => {
    e.preventDefault()
  
    axiosSecure.post("monthlyCost", monthlyCostData)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged === true) {
          refetch()
          setSelectedMonth("");
          setInputPairs([{ id: 1, product: "", price: "" }]);
          setTotal(0);
          toast.success(`${monthlyCostSelectedMonth} মাসের এককালীন খরচ যুক্ত করা হয়েছে`);
        }
       
      })
      .catch((err) => {
        console.error(err);
        toast.error("ডাটা যুক্ত করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
      });
  };
  const [ monthlyCoastData ,refetch] = useMonthlyCostData()
// console.log(monthlyCostdata);


  const [selectedData, setSelectedData] = useState(null);
  const [products, setProducts] = useState([])
console.log('dataaaaa',monthlyCoastData);
  const handleOpen = (id) => {
    const selectedItem = monthlyCoastData.find((item) => item._id === id); // Find the item by ID
    // console.log('iddddd',selectedItem);
    setSelectedData(selectedItem); 
    setProducts(selectedItem.inputPairs)
    setOpen(true); // Open the modal
  };
  console.log(products);


  // delete cost data
  const handleCostDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
      if (result.isConfirmed) {
          const res = await axiosSecure.delete(`monthlyCost/${id}`);
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
              // refetch to update the ui
              refetch()
              toast.success(`Delteted succecfully!`)
          }


      }
  });
 };

  
 

  return (
    <div className="w-11/12 mx-auto mt-10 font-bangla">
      <div className="flex justify-center items-center gap-2">
        <TbReportMoney className="text-3xl" />
        <h2 className="text-2xl text-center font-semibold">
          এককালীন মাসিক খরচ
        </h2>
      </div>

      <form onSubmit={handleSubmit}>

      <div className="grid lg:grid-cols-2 lg:justify-between justify-center items-center justify-items-center mt-10 gap-5">
        {/* month select */}
        <div className="w-64">
          <label
            htmlFor="month-select"
            className="block mb-2 font-bangla text-lg font-semibold lg:text-start text-center"
          >
            মাস নির্বাচন করুন:
          </label>
          <select
          required
            id="month-select"
            value={monthlyCostSelectedMonth}
            onChange={handleMonthChange}
            className="lg:block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>
              মাস নির্বাচন করুন
            </option>
            <option value="জানুয়ারী">জানুয়ারী</option>
            <option value="ফেব্রুয়ারী">ফেব্রুয়ারী</option>
            <option value="মার্চ">মার্চ</option>
            <option value="এপ্রিল">এপ্রিল</option>
            <option value="মে">মে</option>
            <option value="জুন">জুন</option>
            <option value="জুলাই">জুলাই</option>
            <option value="আগস্ট">আগস্ট</option>
            <option value="সেপ্টেম্বর">সেপ্টেম্বর</option>
            <option value="অক্টোবর">অক্টোবর</option>
              <option value="নভেম্বর">নভেম্বর</option>
              <option value="ডিসেম্বর">ডিসেম্বর</option>
          </select>

          {monthlyCostSelectedMonth && (
            <p className="mt-4 text-lg font-bangla">
              নির্বাচিত মাস: <strong>{monthlyCostSelectedMonth}</strong>
            </p>
          )}
        </div>

        <div>
          
          {inputPairs.map((pair) => (
          <div key={pair.id} className="lg:flex items-center lg:space-x-2 space-y-3 mb-2 gap-5">

           <div className="flex items-center gap-1">
           <Typography
                  htmlFor={`product-${pair.id}`}
                  className="font-bangla text-lg font-semibold"
                >
                  পণ্য:
                </Typography>
            <Input
              type="text"
              required
              value={pair.product}
              onChange={(e) => handleInputChange(pair.id, "product", e.target.value)}
              label="পণ্যের নাম"
              className="flex-grow"
            />
           </div>

            <div className="flex items-center justify-center justify-items-center gap-1">
            <Typography
                  htmlFor={`price-${pair.id}`}
                  className="font-bangla text-lg font-semibold"
                >
                  দাম:
                </Typography>
            <Input
              type="number"
              value={pair.price}
              onChange={(e) => handleInputChange(pair.id, "price", e.target.value)}
              label="পণ্যের দাম"
              required
              className="flex-grow"
            />
            </div>
            <button
            
              onClick={() => removeInputPair(pair.id)} 
              
            >
              <FaMinusCircle className="text-2xl text-red-600" />
            </button>
          </div>
        ))}
        <Button
        fullWidth 
        size="sm"
        color="green"
          variant="outline"
          onClick={addInputPair}
          className="text-sm font-normal px-3 font-bangla"
        >
          + পণ্য যুক্ত করুন
        </Button>

        <div> <strong>Total: ${total.toFixed(2)}</strong></div>
        </div>

      </div>

        <div className="flex mt-10 w-11/12 mx-auto justify-center items-center">
          <button type="submit" className="custom-btn btn-12">
            <span>Click!</span>
            <span>Add</span>
          </button>
        </div>
      </form>



      {/* -----------List Table---------- */}

      <div className="my-8">
        <hr className="mb-5" />
        <div className="flex justify-center items-center gap-2">
          <GoChecklist className="text-3xl" />
          <h2 className="text-2xl text-center font-semibold">লিস্ট</h2>
        </div>
        <Card className="h-full mt-8 w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left mb-10">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold text-center font-bangla leading-none opacity-80 text-md"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyCoastData.map(({ monthlyCostSelectedMonth, _id, total }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold text-center font-bangla"
                      >
                         {convertToBanglaNumerals(index + 1)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center font-bangla"
                      >
                        {monthlyCostSelectedMonth}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center font-bangla"
                      >
                        {total}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link key={_id} className="font-medium text-center flex justify-center">
                        <FaEye onClick={() => handleOpen(_id)} className="text-xl"></FaEye>
                      </Link>
                    </td>
                    <td className={classes}>
              {/* delete button */}
              <Link key={_id} onClick={()=> handleCostDelete(`${_id}`)} className="flex text-center items-center gap-1 mt-3 text-red-500">
                <MdDelete className="text-xl"></MdDelete>
              </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>


              {/* -------modal--------- */}
        <Dialog handler={handleModalOpen} className="py-5 px-2" size="xs" open={open} >
          <Typography className="text-center font-bangla font-semibold text-xl mt-3 flex items-center gap-1 justify-center mb-2 text-[#457b9d]">
          <RiFileList3Line className="text-2xl" />
            এককালীন মাসিক খরচের তালিকা</Typography>
          <DialogBody>

          <div className="flex flex-col items-center">

          {
            selectedData && (
              <div className="flex gap-3 text-gray-800 font-semibold">
           <h4 className="text-xl">মাসের নাম:</h4>
           <span className="text-gray-600">{selectedData.monthlyCostSelectedMonth}</span>
           </div>
            )
          }

         
<div className="flex gap-3 text-gray-800 font-semibold">
           <h4 className="text-xl">পন্যের নাম:</h4>
           <ol>
            {products.map((item,idx)=>(
              <div key={item._id} className="flex gap-1 text-gray-700">
              <li>({idx +1}) </li>
              <li><span>{item.product}:</span> <span> {item.price}</span></li>
              </div>
            ))}
            
           </ol>
           
           </div>
            
           
           

        <hr className="border border-gray-600 w-72" />
       
        {
          selectedData && (
            <div className="flex items-center gap-40 font-bold text-lg text-black">মোট:- <span className="bg-green-700 border border-dashed border-white text-white px-5">{selectedData.total}</span></div>
          )
        } 


          </div>


          </DialogBody>

          <DialogFooter className="text-center flex flex-col justify-center gap-4">

          {
            selectedData && (

            <div className="flex flex-col items-center gap-1">
              <Typography color="black" className="font-bangla font-semibold flex items-center gap-1">
            <FcCalendar className="text-2xl" />
            পণ্য কিনার তারিখ ও সময়: 
            </Typography>
            <span className="text-xs  text-gray-600">{selectedData.formattedDate} <span>({selectedData.formattedTime})</span></span>

             

            </div>
            )
          }


          </DialogFooter>
          
        </Dialog>
      </div>
    </div>
  );
};

export default MonthlyCost;
