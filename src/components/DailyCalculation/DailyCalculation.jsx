import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDelete, MdOutlineErrorOutline } from "react-icons/md";
import { FaEdit, FaSearch } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useDailyCalculationData from "../../hooks/useDailyCalculationData";

const TABLE_HEAD = ["তারিখ", "ক্যাশ এ আয়", "কার্ড এ আয়", "ক্যাশ থেকে খরচ", "নাস্তা", "টোটাল", ""];

const BengaliMonths = [
  "জানুয়ারী", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];




const DailyCalculation = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic()
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  console.log(selectedMonth);

  const [currentMonthName, setCurrentMonthName] = useState('');

  useEffect(() => {
    // Get the current month name in Bangla
    const date = new Date();
    const monthName = date.toLocaleString('bn-BD', { month: 'long' });
    setCurrentMonthName(monthName); // Set the current month name
    setSelectedMonth(monthName); // Default selection to current month
  }, []);

  console.log('object,',currentMonthName);
   // Format the date
   const formattedDate = startDate.toLocaleDateString("bn-BD", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  // Format the time
  const formattedTime = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(formattedDate, formattedTime);
  const month = formattedDate.split(" ")[1].replace(",", "");
console.log(month); // Output: "অক্টোবর"


  // form data add
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const income_cash = form.income_cash.value
    const income_cash_int = parseInt(income_cash);
    const income_card = form.income_card.value 
    const income_card_int = parseInt(income_card);
    const cash_expenses = form.cash_expenses.value 
    const cash_expenses_int = parseInt(cash_expenses);
    const nasta_coast = form.nasta_coast.value 
    const nasta_coast_int = parseInt(nasta_coast); 

console.log(income_card_int, income_cash_int, cash_expenses_int, nasta_coast_int);
     const dailyCalculaionData = {income_card_int, income_cash_int, cash_expenses_int, nasta_coast_int, formattedDate, formattedTime}
     console.log(dailyCalculaionData);

    
     
      axiosPublic.post('dailyCalculation', dailyCalculaionData)
      .then(response=>{
        if(response.data){
          refetch()
         toast.success('আপনার দৈনিক হিসাব যুক্ত হয়েছে')
        }
      })
      .catch(err=>{
        toast.error(err);
      })

  }

  // get data
 
  

    // delete data
    const [dailyCalculaionData, refetch] = useDailyCalculationData()
    const handleDelete = async (id) => {
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
            const res = await axiosPublic.delete(`dailyCalculation/${id}`);
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
                // refetch to update the ui
                refetch()
                toast.success(`Delteted succecfully!`)
            }
  
  
        }
    });
   };



   const highlightText = (text, searchQuery) => {
    if (!searchQuery) return text;
  
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 text-black font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };


 
 
  const filteredData = dailyCalculaionData
  .filter(({ formattedDate }) => {
    
    if (!selectedMonth) return true; // Show all if no month is selected
    const month = formattedDate.split(" ")[1].replace(",", "");
    return month === selectedMonth;
  })
  .sort((a, b) => {
    const dateA = new Date(
      a.formattedDate.split(" ").reverse().join("-") // Convert "১০ ডিসেম্বর, ২০২৪" to "২০২৪-12-১০"
    );
    const dateB = new Date(
      b.formattedDate.split(" ").reverse().join("-")
    );
    return dateA - dateB; // Ascending order
  });


  // Compute totals
const totals = filteredData.reduce(
  (acc, curr) => {
    acc.totalIncomeCash += curr.income_cash_int || 0;
    acc.totalIncomeCard += curr.income_card_int || 0;
    acc.totalCashExpenses += curr.cash_expenses_int || 0;
    acc.totalNastaCoast += curr.nasta_coast_int || 0;
    return acc;
  },
  { totalIncomeCash: 0, totalIncomeCard: 0, totalCashExpenses: 0, totalNastaCoast: 0 }
);

// Compute the overall balance
const overallTotal =
  totals.totalIncomeCash +
  totals.totalIncomeCard -
  totals.totalCashExpenses -
  totals.totalNastaCoast;





  return (
    <div className="w-11/12 mx-auto mt-10 font-bangla">
      <div className="flex justify-center items-center gap-2">
        <i className="bx bxs-file-doc text-3xl"></i>
        <h2 className="text-2xl text-center font-semibold">দৈনিক হিসাব</h2>
      </div>


      <div className="flex justify-between items-center mt-10 px-2">
      <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="blue-gray"
            label="এখানে সার্চ করুন..."
            onChange={(e) => setSearchQuery(e.target.value)}
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <div
         
           color="transparent"
            className="!absolute right-4 top-3 bg-transparent text-gray-600 rounded"
          >
          <FaSearch></FaSearch>

          </div>
        </div>

        <div>
      <select
        className="border border-gray-400 p-2 w-60 rounded-lg font-bangla mb-5"
        value={selectedMonth}
        defaultValue={currentMonthName}
        onChange={(e) => {
          console.log("Selected Value:", e.target.value); // Debug value
          setSelectedMonth(e.target.value);
        }}
      >
        <option>-- মাস বাছাই করুন --</option>
        {BengaliMonths.map((month) => (
          <option   key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      
    </div>


      <Button className="font-bangla flex items-center gap-1" onClick={handleOpen}>
        <FaPlus className="text-md font-bold"></FaPlus>
        যুক্ত করুন</Button>
      </div>

       
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">

         
            {/* ----modal header----- */}
            <Typography className="font-bangla text-center" variant="h4" color="blue-gray">
            দৈনিক আয় যুক্ত করুন
            </Typography>
           
           {/* ----modal form---- */}
            <form onSubmit={handleSubmit}>


            <Typography 
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            তারিখ
            </Typography>
            <DatePicker className="p-2 px-3 rounded-lg border-gray-400 border-2 w-[21rem]" selected={startDate} onChange={(date) => setStartDate(date)} />

            <Typography 
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            ক্যাশ থেকে আয়
            </Typography>
            <Input 
            required
            type="number"
            label="+ ক্যাশ থেকে আয় যুক্ত করুন" size="lg"
            name="income_cash" 
            />
            
            <Typography 
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            কার্ড থেকে আয়
            </Typography>
            <Input 
            required
             type="number"
            label="+ কার্ড থেকে আয় যুক্ত করুন" size="lg" 
            name="income_card"
            />

            <Typography 
            
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            ক্যাশ থেকে ব্যয় 
            </Typography>
            <Input 
            required
             type="number"
            label="- ক্যাশ থেকে ব্যয় বাদ দিন" size="lg"
            name="cash_expenses"
             />

            <Typography 
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            নাস্তার খরচ
            </Typography>
            <Input 
            required
             type="number"
            label="- ক্যাশ থেকে নাস্তার খরচ বাদ দিন" size="lg"
            name="nasta_coast"
             />
            
          <CardFooter className="pt-0">

          <button className="w-full font-bangla mx-auto mt-4 py-1 rounded-lg bg-gray-800 text-white">যুক্ত করুন</button>
            
          </CardFooter>
            </form>

          </CardBody>

          
        </Card>

        
      </Dialog>


      <Card className="h-full w-full shadow-none border overflow-auto mt-5 rounded-t-xl mb-10">
  {filteredData.length === 0 ? (
    // No Data UI
    <div className="text-center p-10">
      <Typography variant="h5" color="red" className="font-bangla flex items-center gap-1 justify-center">
      <MdOutlineErrorOutline className="text-2xl" /> কোন তথ্য পাওয়া যায়নি
      </Typography>
    </div>
  ) : (
    // Table UI
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 font-bangla"
            >
              <Typography
                variant="small"
                color="black"
                className="font-semibold text-center font-bangla leading-none text-lg"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map(
          ({
            income_card_int,
            income_cash_int,
            cash_expenses_int,
            nasta_coast_int,
            _id,
            formattedDate,
            formattedTime,
          }) => {
            const total =
              income_cash_int - cash_expenses_int - nasta_coast_int + income_card_int;

            return (
              <tr key={_id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bangla text-center font-semibold"
                >
                  {highlightText(formattedDate, searchQuery)}{" "}
                  <span className="text-gray-600">
                    ({highlightText(formattedTime, searchQuery)})
                  </span>
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-green-500 text-center"
                >
                  {highlightText(income_cash_int.toString(), searchQuery)}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-green-500 text-center"
                >
                  {highlightText(income_card_int.toString(), searchQuery)}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-red-500 text-center"
                >
                  -{highlightText(cash_expenses_int.toString(), searchQuery)}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-red-500 text-center"
                >
                  -{highlightText(nasta_coast_int.toString(), searchQuery)}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-semibold bg-blue-600 w-16 mx-auto text-center"
                >
                  {total}
                </Typography>
              </td>
              <td>
                <div className="flex items-center gap-1 mr-4">
                  <FaEdit className="text-xl text-blue-500 font-body"></FaEdit>
                  <button onClick={() => handleDelete(_id)}>
                    <MdDelete className="text-xl text-red-400"></MdDelete>
                  </button>
                </div>
              </td>
            </tr>
            );
          }
        )}
      </tbody>
     
        <tfoot className="border-t border-gray-400 bg-blue-400">
  <tr>
    <td className="p-4">
      <Typography
        color="white"
        variant="h5"
        className="font-bold text-center"
      >
        Total
      </Typography>
    </td>
    <td className="p-4">
      <Typography
        color="white"
        variant="h6"
        className="font-bold w-32 mx-auto bg-green-400 text-center"
      >
        {totals.totalIncomeCash}
      </Typography>
    </td>
    <td className="p-4">
      <Typography
        color="white"
        variant="h6"
        className="font-bold w-32 mx-auto bg-green-400 text-center"
      >
        {totals.totalIncomeCard}
      </Typography>
    </td>
    <td className="p-4">
      <Typography
        color="white"
        variant="h6"
        className="font-bold w-32 mx-auto bg-red-400 text-center"
      >
        -{totals.totalCashExpenses}
      </Typography>
    </td>
    <td className="p-4">
      <Typography
        color="white"
        variant="h6"
        className="font-bold w-32 mx-auto bg-red-400 text-center"
      >
        -{totals.totalNastaCoast}
      </Typography>
    </td>
    <td className="p-4">
      <Typography
        color="green"
        variant="h6"
        className="font-bold bg-white border border-dashed border-green-500 w-32 mx-auto text-center"
      >
        {overallTotal}
      </Typography>
    </td>
    <td></td>
  </tr>
</tfoot>

    </table>
  )}
</Card>

    </div>
  );
};

export default DailyCalculation;
