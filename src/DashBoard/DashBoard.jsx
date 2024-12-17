import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
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

ChartJS.register(ArcElement, Tooltip, Legend);

const borrowersData = [
  { state: "QLD", amount: 18.6, color: "bg-red-500" },
  { state: "SA", amount: 3.9, color: "bg-orange-400" },
  { state: "WA", amount: 3.2, color: "bg-green-400" },
  { state: "VIC", amount: 0, color: "bg-gray-300" },
];

const BengaliMonths = [
  "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
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
    { totalIncomeCash: 0, totalIncomeCard: 0, totalCashExpenses: 0, totalNastaCost: 0 }
  );

  const overallTotal =
    totals.totalIncomeCash +
    totals.totalIncomeCard -
    totals.totalCashExpenses -
    totals.totalNastaCost;

  console.log(`${selectedMonth} Data:`, overallTotal);

  // Doughnut Chart Data to Show Totals
  const chartData = {
    labels: ["Total Income (Cash + Card)", "Total Cash Expenses", "Total Nasta Cost"],
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

  const options = {

  }

  const textCenter ={
    id: 'textCenter',
    beforDatasetDraw(chart, args, pluginOption){
      const {ctx,chartData} = chart;
      ctx.save();
      ctx.font = 'bolder 30px sans-serif';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('text', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y )
    }
  }

  return (
    <div className="bg-gray-100 h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 justify-center">
        <MdOutlineDashboard className="text-3xl mt-10" />
        <h1 className="font-bangla font-semibold text-2xl text-center mt-10">ড্যাশবোর্ড</h1>
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

      {/* Doughnut Chart */}
      <div style={{width:'50%', height:'50%'}} className="flex justify-center mt-5">
        <Doughnut options={options} plugins={[textCenter]} data={chartData} />
      </div>

      {/* Borrowers Section */}
      <div className="w-11/12 mx-auto grid grid-cols-2 gap-5 mt-10">
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-sm font-medium text-gray-600 mb-4">Borrowers by State</h2>
          {borrowersData.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span className="text-gray-600 text-sm">{item.state}</span>
              </div>
              <p className="text-gray-800 font-medium text-sm">${item.amount}M</p>
            </div>
          ))}
        </div>

        {/* Balance Section */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Current Balance</h2>
          <p className="text-3xl font-bold">${overallTotal.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
