import { TbReportMoney } from "react-icons/tb";
import {
  Typography,
  Input,
  Card,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoChecklist } from "react-icons/go";
import "./montlyCost.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TABLE_HEAD = ["নং", "মাস", "মোট খরচ", ""];

const TABLE_ROWS = [
  {
    name: "০১",
    job: "সেপ্টেম্বর",
    date: "৮৪৮৫",
  },
];

const MonthlyCost = () => {
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const axiosSecure = useAxiosSecure();
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  console.log(selectedMonth);
  const handleOpen = () => setOpen(!open);

  // handle add or remove input
  const [inputPairs, setInputPairs] = useState([
    { id: 1, product: "", price: "" },
  ]);
  const addInputPair = () => {
    const newId = inputPairs.length + 1;
    setInputPairs([...inputPairs, { id: newId, product: "", price: "" }]);
  };

  const removeInputPair = (id) => {
    setInputPairs(inputPairs.filter((pair) => pair.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setInputPairs(
      inputPairs.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    );
  };
  console.log(inputPairs);
  const monthlyCostData = { selectedMonth, inputPairs };

  // post monthly cost data

  const handleSubmit = () => {
    axiosSecure
      .post("monthlyCost", monthlyCostData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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

      <div className="grid grid-cols-2 justify-between items-center justify-items-center mt-10">
        {/* month select */}
        <div className="w-64">
          <label
            htmlFor="month-select"
            className="block mb-2 font-bangla text-lg font-semibold"
          >
            মাস নির্বাচন করুন:
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
          </select>

          {selectedMonth && (
            <p className="mt-4 text-lg font-bangla">
              নির্বাচিত মাস: <strong>{selectedMonth}</strong>
            </p>
          )}
        </div>

        <div>
          {inputPairs.map((pair, index) => (
            <div
              key={pair.id}
              className="flex items-center space-x-4 space-y-2"
            >
              <div className="flex items-center gap-1">
                <Typography
                  htmlFor={`product-${pair.id}`}
                  className="mb-1 mt-4 font-bangla text-lg font-semibold"
                >
                  পণ্য:
                </Typography>
                <Input
                  value={pair.product}
                  onChange={(e) =>
                    handleInputChange(pair.id, "product", e.target.value)
                  }
                  id={`product-${pair.id}`}
                  required
                  type="text"
                  label="পণ্যের নাম"
                  size="lg"
                  name="income_cash"
                />
              </div>

              <div className="flex items-center gap-1">
                <Typography
                  htmlFor={`price-${pair.id}`}
                  className="mb-1 mt-4 font-bangla text-lg font-semibold"
                >
                  দাম:
                </Typography>
                <Input
                  value={pair.price}
                  onChange={(e) =>
                    handleInputChange(pair.id, "price", e.target.value)
                  }
                  id={`price-${pair.id}`}
                  required
                  type="number"
                  label="পণ্যের দাম"
                  size="lg"
                  name="income_cash"
                />
              </div>

              {index > 0 && (
                <IconButton
                  type="button"
                  variant="outlined"
                  size="md"
                  color="red"
                  onClick={() => removeInputPair(pair.id)}
                  aria-label="Remove input pair"
                >
                  <BiMinusCircle className="h-6 w-6" />
                </IconButton>
              )}

              {index === inputPairs.length - 1 && (
                <IconButton
                  type="button"
                  variant="outlined"
                  size="md"
                  color="green"
                  onClick={addInputPair}
                  aria-label="Add new input pair"
                >
                  <BiPlusCircle className="h-5 w-5" />
                </IconButton>
              )}
            </div>
          ))}
        </div>

      </div>
        <div className="flex mt-10 w-11/12 mx-auto justify-center items-center">
          <button className="custom-btn btn-12">
            <span>Click!</span>
            <span>Add</span>
          </button>
        </div>

      {/* -----------Table---------- */}

      <div className="my-8">
        <hr className="mb-5" />
        <div className="flex justify-center items-center gap-2">
          <GoChecklist className="text-3xl" />
          <h2 className="text-2xl text-center font-semibold">লিস্ট</h2>
        </div>
        <Card className="h-full mt-8 w-full overflow-auto">
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
                      className="font-semibold font-bangla leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, job, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold font-bangla"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-bangla"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-bangla"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link href="#" className="font-medium">
                        <FaEye onClick={handleOpen} className="text-xl"></FaEye>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Its a simple modal.</DialogHeader>
          <DialogBody>
            The key to more success is to have a lot of pillows. Put it this
            way, it took me twenty five years to get these plants, twenty five
            years of blood sweat and tears, and I&apos;m never giving up,
            I&apos;m just getting started. I&apos;m up to something. Fan luv.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default MonthlyCost;
