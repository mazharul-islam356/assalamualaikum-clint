import { useEffect, useState } from "react";
import { BsCalendar2 } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import useDailyCalculationData from "../hooks/useDailyCalculationData";
import useEmployeeSalary from "../hooks/useEmployeeSalary";
import useExtraCost from "../hooks/useExtraCost";
import useMonthlyCostData from "../hooks/useMonthlyCostData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Barchart from "./Chart/Barchart";
import { HiTrendingUp } from "react-icons/hi";
import CardIncomeChart from "./Chart/CardIncomeChart";



ChartJS.register(ArcElement, Tooltip, Legend);


const BengaliMonths = [
  "জানুয়ারী",
  "ফেব্রুয়ারী",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DashBoard = () => {

  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentMonthName, setCurrentMonthName] = useState("");

  // Initialize Current Month
  useEffect(() => {
    const date = new Date();
    const monthName = date.toLocaleString("bn-BD", { month: "long" });
    setCurrentMonthName(monthName);
    setSelectedMonth(monthName);
  }, []);

  const [totalExpensesValue, setTotalExpensesValue] = useState(0);
  const [dailyCalculationData] = useDailyCalculationData();
  const [salaryCostData] = useEmployeeSalary();
  const [extraCostData] = useExtraCost();
  const [monthlyCostData] = useMonthlyCostData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth2, setSelectedMonth2] = useState();
  const [totalCostAmount, setTotalCostAmount] = useState(0);
  const [totalmonthlyCost, setTotalMonthlyCost] = useState(0);
  const [totalSalaryCost, setTotalSalaryCost] = useState(0);

  // console.log('salary cost dataaaaa',salaryCostData);

  // ----extra cost-----
  useEffect(() => {
    if (selectedMonth && extraCostData) {
      const filteredCosts = extraCostData.filter(
        (item) => item.selectedMonth2 === selectedMonth
      );
      const total = filteredCosts.reduce(
        (sum, item) => sum + (item.costAmount || 0),
        0
      );
      setTotalCostAmount(total);
    }
  }, [selectedMonth, extraCostData]);


  // ----monthly ek kalin cost-----
  useEffect(() => {
    if (selectedMonth && monthlyCostData) {
      const filteredMonthlyCosts = monthlyCostData.filter(
        (item) => item.monthlyCostSelectedMonth === selectedMonth
      );
      const monthlyTotal = filteredMonthlyCosts.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      );
      setTotalMonthlyCost(monthlyTotal);
    }
  }, [selectedMonth, monthlyCostData]);


  // ----salary cost-----
  useEffect(() => {
    if (selectedMonth && salaryCostData) {
      const filteredSalaryCosts = salaryCostData.filter(
        (item) => item.salarySelectedMonth === selectedMonth
      );
      const salaryTotal = filteredSalaryCosts.reduce(
        (sum, item) => sum + (item.salaryCost || 0),
        0
      );
      setTotalSalaryCost(salaryTotal);
    }
  }, [selectedMonth, salaryCostData]);



  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };
 
  const selectedMonthData = monthlyCostData?.find(
    (data) => data.selectedMonth === selectedMonth
  );
  const monthlyTotal = selectedMonthData?.total || null;


  const handleMonthSelect = (value) => {
    setSelectedMonth2(value);
    setIsOpen(false);
  };


  // Filter and Sort Data
  const filteredData = dailyCalculationData
    .filter(({ formattedDate }) => {
      if (!selectedMonth) return true;
      const month = formattedDate.split(" ")[1].replace(",", "");
      return month === selectedMonth;
    })
    .sort((a, b) => {
      const dateA = new Date(a.formattedDate.split(" ").reverse().join("-"));
      const dateB = new Date(b.formattedDate.split(" ").reverse().join("-"));
      return dateA - dateB;
    });

    
  // Totals Calculation
  const totals = filteredData.reduce(
    (acc, curr) => {
      acc.totalIncomeCash += curr.income_cash_int || 0;
      acc.totalIncomeCard += curr.income_card_int || 0;
      acc.totalCashExpenses += curr.cash_expenses_int || 0;
      acc.totalNastaCost += curr.nasta_coast_int || 0;
      return acc;
    },
    {
      totalIncomeCash: 0,
      totalIncomeCard: 0,
      totalCashExpenses: 0,
      totalNastaCost: 0,
    }
  );

  const overallTotal =
    totals.totalIncomeCash +
    totals.totalIncomeCard -
    totals.totalCashExpenses -
    totals.totalNastaCost;

  console.log(`${selectedMonth} Data:`, overallTotal);

  // total nasta cost and cash expense value
  useEffect(() => {
    const totalExpenses = filteredData.reduce(
      (acc, curr) => {
        acc.totalCashExpenses += curr.cash_expenses_int || 0;
        acc.totalNastaCost += curr.nasta_coast_int || 0;
        return acc;
      },
      {
        totalCashExpenses: 0,
        totalNastaCost: 0,
      }
    );

    setTotalExpensesValue(totalExpenses.totalCashExpenses + totalExpenses.totalNastaCost);
  }, [filteredData]);




  // Doughnut Chart Data to Show Totals
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [
          totalExpensesValue,
          totalmonthlyCost,
          totalCostAmount,
          totalSalaryCost
        ],
        backgroundColor: ["#936639", "#ffb703", "#83c5be", "#dd0f00"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};

  console.log('total monthly cost dataaaa',totalmonthlyCost);

  return (
    <div className="bg-gray-100 h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 justify-center">
        <MdOutlineDashboard className="text-3xl mt-10" />
        <h1 className="font-bangla font-semibold text-2xl text-center mt-10">
          ড্যাশবোর্ড
        </h1>
      </div>

      {/* Month Selector */}
      <div className="flex justify-center mt-5">
        <select
          className="border border-gray-400 p-2 w-60 rounded-lg font-bangla"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option disabled>-- মাস বাছাই করুন --</option>
          {BengaliMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Borrowers Section */}
      <div className="w-11/12 mx-auto grid grid-cols-2 gap-5 mt-10">
        <div>
          <div className="bg-white shadow-lg rounded-xl p-5">
            <div className="flex justify-between items-center mb-8 px-4 pt-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Borrowers by State
              </h2>
              <div className="flex gap-2">
                <button onClick={handleIconClick} className="h-8 w-8">
                  <BsCalendar2 className="h-4 w-4" />
                </button>

                {isOpen && (
                  <div className="absolute mt-6">
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedMonth2 || ""}
                      onChange={(e) => handleMonthSelect(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a month
                      </option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 px-10 pb-5">
              {/* Doughnut Chart */}
              <div
                style={{ width: "40%", height: "40%" }}
                className="flex justify-center mt-5"
              >
                <Doughnut options={options} data={chartData} />
              </div>
              <div>
                
                {/* monthly nasta and cash expense total */}
                <div className="flex gap-10 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-[#936639]`}
                    ></span>
                    <span className="text-gray-600 text-sm">Monthly Cost</span>
                  </div>
                  <p className="text-gray-800 font-medium text-sm"> {totalExpensesValue !== 0 ? (
                      <p className="text-sm font-bold">
                        {totalExpensesValue.toLocaleString("bn-BD")} ৳
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-red-500">
                        No available data
                      </p>
                    )}</p>
                </div>

                   {/* ek kalin cost */}
                   <div className="flex gap-10 items-center justify-between  mt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-orange-400`}
                    ></span>
                    <span className="text-gray-600 text-sm">Ekkalin Cost</span>
                  </div>
                  <p className="text-gray-800 font-medium text-sm"> {totalmonthlyCost !== 0 ? (
                      <p className="text-sm font-bold">
                        {totalmonthlyCost.toLocaleString("bn-BD")} ৳
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-red-500">
                        No available data
                      </p>
                    )}</p>
                </div>

                    {/* extra cost */}
                <div className="flex gap-10 items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-[#83c5be]`}
                    ></span>
                    <span className="text-gray-600 text-sm">Extra Cost</span>
                  </div>
                  <p className="text-gray-800 font-medium text-sm"> {totalCostAmount !== 0 ? (
                      <p className="text-sm font-bold">
                        {totalCostAmount.toLocaleString("bn-BD")} ৳
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-red-500">
                        No available data
                      </p>
                    )}</p>
                </div>

                 


                  {/* salary total */}
                  <div className="flex gap-10 items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-[#dd0f00]`}
                    ></span>
                    <span className="text-gray-600 text-sm">Salary Cost</span>
                  </div>
                  <p className="text-gray-800 font-medium text-sm"> {totalSalaryCost !== 0 ? (
                      <p className="text-sm font-bold">
                        {totalSalaryCost.toLocaleString("bn-BD")} ৳
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-red-500">
                        No available data
                      </p>
                    )}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="w-11/12 mx-auto">

          <div className="grid grid-cols-2 justify-between items-center justify-items-center">

          <div className="bg-[#248277] text-white h-52 w-60 rounded-3xl p-4">
            <div className="flex flex-col justify-start">
            <div className="flex justify-between items-center text-start text-sm font-thin pt-0.5">

              <h1>Cash Income</h1>
              <HiTrendingUp className="text-xl"></HiTrendingUp>

            </div>

            <h2 className="text-4xl font-semibold">
              30000
            </h2>
            </div>

            
             <div className="flex justify-center items-center mr-10 mt-4">
             <Barchart></Barchart>
             </div>
            

            

          </div>

          {/* card income box */}
          <div className="bg-[#2dc653] h-52 w-60 rounded-3xl p-4">
            <div className="flex flex-col justify-start">
            <div className="flex justify-between items-center text-start text-sm font-thin pt-0.5 text-white">

              <h1>Card Income</h1>
              <HiTrendingUp className="text-xl"></HiTrendingUp>

            </div>

            <h2 className="text-4xl text-white font-semibold">
              86024
            </h2>
            </div>

            
             <div className="flex justify-center items-center mt-4">
             <CardIncomeChart></CardIncomeChart>
             </div>
            

            

          </div>

         

          </div>

          <div className="bg-red-500 mt-5 h-40 rounded-3xl">
            total profit
          </div>
          
        </div>


      </div>

      
    </div>
  );
};

export default DashBoard;
