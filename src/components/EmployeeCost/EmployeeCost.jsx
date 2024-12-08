import { Button, Card, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { GrMoney } from "react-icons/gr";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaSackDollar } from "react-icons/fa6";
import useEmployeeCost from "../../hooks/useEmployeeCost";
const TABLE_HEAD = ["নাম", "খরচ", "কারণ", "তারিখ ও সময়", ""];
 


const EmployeeCost = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(startDate);
  const [currentMonthName, setCurrentMonthName] = useState("");
  const axiosSecure = useAxiosSecure()
  const [selectedMonth, setSelectedMonth] = useState("");
  const [employeeCostData,setEmployeeCostData] = useState([])

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
  const formattedDate = startDate.toLocaleDateString("bn-BD", {
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
      const costInt = parseInt(cost)
      const reason = form.reason.value;
      console.log(employee_name, cost, reason);

      const employeeCost = {employee_name, costInt, reason, formattedDate, formattedTime}

      axiosSecure.post('/employee-cost', employeeCost)
      .then(res=>{

        if(res.data.acknowledged === true)
          toast.success(`${employee_name} এর অতিরিক্ত ${cost} টাকা যুক্ত হয়েছে`)
        console.log(res.data);
        form.reset()
        refetch()
      })
      .catch(err=>{
        console.log(err);
      })  
  }

  const [employeeCostDataa, refetch] = useEmployeeCost()



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

      <div className="mt-10 border shadow-md pb-6 rounded-b-lg">
          <div className="border-b rounded-md border-blue-gray-100 bg-blue-gray-50 p-4">
            <div className="flex justify-center items-center gap-1 ">
              <FaSackDollar className="text-2xl"></FaSackDollar>
              <div>
                <h3 className="font-semibold text-xl">অতিরিক্ত খরচ</h3>
              </div>
            </div>
          </div>
          <Card className="overflow-auto shadow-none ">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold text-md leading-none opacity-90 text-center font-bangla"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employeeCostDataa.map(({ employee_name, costInt, reason, formattedDate,formattedTime }, index) => {
            const isLast = index === employeeCostData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="black"
                    className="font-bangla text-center"
                  >
                    {employee_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal text-center"
                  >
                    {costInt}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal text-center"
                  >
                    {reason}
                  </Typography>
                </td>
                <td className={classes}>
                  <div
                    className="font-medium text-sm text-black text-center"
                  >
                    {formattedDate}({formattedTime})
                  </div>
                </td>
               
              </tr>
            );
          })}
        </tbody>

        <tfoot>
      <tr>
        <td className="font-semibold text-center text-black text-xl font-bangla pt-3">
          মোট =
        </td>
        <td  className="border border-dashed text-white bg-green-500 font-semibold text-center  w-16">
          {employeeCostDataa.reduce((total, item) => total + item.costInt, 0)} 
        </td>
      </tr>
    </tfoot>
      </table>
    </Card>
        </div>
    </div>
  );
};

export default EmployeeCost;
