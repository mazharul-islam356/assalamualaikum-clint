import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight, BsCalendar2 } from "react-icons/bs";
import { FiMaximize2, FiMoreVertical, FiRefreshCw } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import useDailyCalculationData from "../hooks/useDailyCalculationData";
import useDharAmountData from "../hooks/useDharAmountData";
import useEmployeeCost from "../hooks/useEmployeeCost";
import useEmployeeSalary from "../hooks/useEmployeeSalary";
import useExtraCost from "../hooks/useExtraCost";
import useMonthlyCostData from "../hooks/useMonthlyCostData";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { id } from "date-fns/locale/id";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const borrowersData = [
  { state: "QLD", amount: 18.6, color: "bg-red-500" },
  { state: "SA", amount: 3.9, color: "bg-orange-400" },
  { state: "WA", amount: 3.2, color: "bg-green-400" },
  { state: "VIC", amount: 0, color: "bg-gray-300" },
];

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

  const [dailyCalculationData] = useDailyCalculationData();
  const [dharAmountData] = useDharAmountData();
  const [employeeCostData] = useEmployeeCost();
  const [salaryCostData] = useEmployeeSalary();
  const [extraCostData] = useExtraCost();
  const [monthlyCostData] = useMonthlyCostData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth2, setSelectedMonth2] = useState();
  const [totalCostAmount, setTotalCostAmount] = useState(0);
  const [totalmonthlyCost, setTotalMonthlyCost] = useState(0);

  console.log('salary cost dataaaaa',salaryCostData);

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

  // ----monthly cost-----
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
  console.log("Daily Calculation Data:", dailyCalculationData);

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

  // Doughnut Chart Data to Show Totals
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [
          totals.totalIncomeCash + totals.totalIncomeCard,
          totals.totalCashExpenses,
          totals.totalNastaCost,
        ],
        backgroundColor: ["#4CAF50", "#FF6384", "#FFCE56"],
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
                

                <div className="flex gap-10 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-red-400`}
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

                <div className="flex gap-10 items-center mt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-green-400`}
                    ></span>
                    <span className="text-gray-600 text-sm">Monthly Cost</span>
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
              </div>
            </div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Current Balance</h2>

          <div>
  <h2 className="text-xl font-semibold mb-4">Extra Costs for {selectedMonth}</h2>
  <p className="text-3xl font-bold">
    {totalCostAmount.toLocaleString("bn-BD")} ৳
  </p>
</div>
          <p className="text-3xl font-bold">${overallTotal.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
