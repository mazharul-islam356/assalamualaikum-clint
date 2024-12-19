import { Card, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FaCommentsDollar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useEmployeeSalary from "../../hooks/useEmployeeSalary";
import toast from "react-hot-toast";
import { GoChecklist } from "react-icons/go";
import useExtraCost from "../../hooks/useExtraCost";
import { GrMoney } from "react-icons/gr";


const TABLE_HEAD = ["নাম", "পরিমাণ", "মাস"];

const EmployeeSalary = () => {
  const [salarySelectedMonth, setSelectedMonth] = useState("");
  const [selectedMonth2, setSelectedMonth2] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleMonthChange2 = (event) => {
    setSelectedMonth2(event.target.value);
  };

  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const employee_name = form.employee_name.value;
    const salaryCostString = form.amount.value;
    const salaryCost = parseInt(salaryCostString);

    const employeeSalary = { employee_name, salaryCost, salarySelectedMonth };

    axiosSecure
      .post("/salary", employeeSalary)
      .then((res) => {
        if (res.data.acknowledged === true)
          toast.success(`${employee_name} এর বেতন টাকা যুক্ত হয়েছে`);
        console.log(res.data);
        form.reset();
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const form = e.target;
    const costString = form.amount.value;
    const reason = form.reason.value;
    const costAmount = parseInt(costString);

    const extraCost = { costAmount, selectedMonth2, reason };

    axiosSecure
      .post("/extraCost", extraCost)
      .then((res) => {
        if (res.data.acknowledged === true)
          toast.success(`${selectedMonth2} এর আনুষঙ্গিক খরচ যুক্ত হয়েছে`);
        console.log(res.data);
        form.reset();
        refetch2();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const [salaryCoastData, refetch] = useEmployeeSalary();
  const [extraCoastData, refetch2] = useExtraCost()

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex items-center justify-center gap-1 mt-10">
        <FaCommentsDollar className="text-2xl"></FaCommentsDollar>
        <h3 className="font-semibold text-2xl ">বেতন</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 justify-center items-center justify-items-center mt-8">
          {/* month select */}
          <div className="w-64">
            <Typography className="mb-1 mt-4 font-bangla" variant="h6">
              মাস নির্বাচন করুন:
            </Typography>
            <select
              required
              id="month-select"
              value={salarySelectedMonth}
              onChange={handleMonthChange}
              className="lg:block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="" disabled>
                মাস নির্বাচন করুন
              </option>
              <option value="জানুয়ারী">জানুয়ারী</option>
              <option value="ফেব্রুয়ারি">ফেব্রুয়ারি</option>
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

          
          </div>

          {/* name select */}
          <div className="w-64">
            <Typography className="mb-1 mt-4 font-bangla" variant="h6">
              Name নির্বাচন করুন:
            </Typography>
            <select
              name="employee_name"
              className="lg:block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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

          {/* salary cost */}
          <div className="w-64">
            <Typography className="mb-1 font-bangla" variant="h6">
              টাকার পরিমাণ
            </Typography>
            <Input
              required
              type="number"
              label="+ টাকার পরিমাণ যুক্ত করুন"
              size="lg"
              name="amount"
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <button className="bg-[#219ebc] w-full text-white px-8 py-1 rounded-md font-semibold">
            Add
          </button>
        </div>
      </form>

            {/* extra cost */}
      <form onSubmit={handleSubmit2}>
        <div className="flex items-center justify-center gap-1 mt-10">
        <GrMoney   className="text-2xl"></GrMoney>
        <h3 className="font-semibold text-2xl ">আনুষঙ্গিক খরচ</h3>
      </div>
        <div className="grid grid-cols-3 justify-center items-center justify-items-center mt-8">

          {/* month select */}
          <div className="w-64">
            <Typography className="mb-1 mt-4 font-bangla" variant="h6">
              মাস নির্বাচন করুন:
            </Typography>
            <select
              required
              id="month-select"
              value={selectedMonth2}
              onChange={handleMonthChange2}
              className="lg:block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="" disabled>
                মাস নির্বাচন করুন
              </option>
              <option value="জানুয়ারী">জানুয়ারী</option>
              <option value="ফেব্রুয়ারি">ফেব্রুয়ারি</option>
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

          
          </div>

          {/* name select */}
          <div className="w-64">
            <Typography className="mb-1 font-bangla" variant="h6">
              Reason
            </Typography>
            <Input
              required
              type="text"
              label="Reason"
              size="lg"
              name="reason"
            />
          </div>

          {/* salary cost */}
          <div className="w-64">
            <Typography className="mb-1 font-bangla" variant="h6">
              টাকার পরিমাণ
            </Typography>
            <Input
              required
              type="number"
              label="+ টাকার পরিমাণ যুক্ত করুন"
              size="lg"
              name="amount"
            />
          </div>
        </div>

        <div className="flex w-full justify-center items-center mt-8">
          <button className="bg-blue-500 w-full text-white px-8 py-1 rounded-md font-semibold">
            Add2
          </button>
        </div>
      </form>
      <hr className="mt-5" />

     <div className="flex items-start gap-10 justify-around">

      <div className="w-full">
      <div className="flex justify-center items-center gap-2 mt-10 mb-2">
        <GoChecklist className="text-3xl" />
        <h2 className="text-2xl text-center font-semibold">বেতন</h2>
      </div>
      <Card className="h-full overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bangla font-semibold leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salaryCoastData.map(
              ({ employee_name, salaryCost, salarySelectedMonth }, index) => {
                const isLast = index === salaryCoastData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-bangla text-center"
                      >
                        {employee_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {salaryCost}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-bangla text-center"
                      >
                        {salarySelectedMonth}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      </div>

      {/* extra cost list */}
      <div className="w-full mb-5">
      <div className="flex justify-center items-center gap-3 mt-10 mb-2">
        <GoChecklist className="text-3xl" />
        <h2 className="text-2xl text-center font-semibold">আনুষঙ্গিক খরচ</h2>
      </div>
      <Card className="h-full overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bangla font-semibold leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {extraCoastData.map(
              ({ costAmount, selectedMonth2, reason }, index) => {
                const isLast = index === extraCoastData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-bangla text-center"
                      >
                        {selectedMonth2}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {costAmount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-bangla text-center"
                      >
                        {reason}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      </div>

     </div>

    </div>
  );
};

export default EmployeeSalary;
