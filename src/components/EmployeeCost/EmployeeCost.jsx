import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { GrMoney } from "react-icons/gr";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EmployeeCost = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonthName, setCurrentMonthName] = useState("");
  const axiosSecure = useAxiosSecure()
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Update the current date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Get the current month name in Bangla
    const monthName = new Date().toLocaleString("bn-BD", { month: "long" });
    setCurrentMonthName(monthName);
    setSelectedMonth(monthName);

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

  // console.log(formattedDate, formattedTime);
  
  const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target;
      const employee_name = form.employee_name.value;
      const cost = form.cost.value;
      const reason = form.reason.value;
      console.log(employee_name, cost, reason);

      const employeeCost = {employee_name, cost, reason, formattedDate, formattedTime}

      axiosSecure.post('/employee-cost', employeeCost)
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })

      
   

  }
  return (
    <div className="w-11/12 mx-auto mt-10 font-bangla">
      <div className="flex justify-center items-center gap-2">
        <GrMoney className="text-3xl" />
        <h2 className="text-2xl text-center font-semibold">
          কর্মীর অতিরিক্ত খরচ
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-4 justify-center items-center justify-items-center mt-10">
          <div className="w-60">
          <select name="employee_name" className="border w-56 rounded-md py-1 px-2" >
        <option selected disabled>Select a name</option>
        <option>সজল</option>
        <option>ইকবাল</option>
        <option>মামুন</option>
        <option>শাওন</option>
      </select>
          </div>

          <div>
            <label className="font-semibold">Date: </label>
            <DatePicker
              className="border px-4 py-2 border-gray-400 rounded-md"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div>
            <div className="w-60 flex items-center gap-2">
            <label className="font-semibold">Cost: </label>
              <Input name="cost" type="number" label="Cost" />
            </div>
          </div>

          <div className="w-72 flex items-center gap-2">
          <label className="font-semibold">Reason: </label>
            <Textarea name="reason" label="Reason" />
          </div>
        </div>

     <div className="flex justify-center">
     <Button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded-lg">Submit</Button>
     </div>

      </form>
    </div>
  );
};

export default EmployeeCost;
