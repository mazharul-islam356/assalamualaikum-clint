import { TbReportMoney } from "react-icons/tb";
import {
  Select,
  Option,
  Typography,
  Input,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoChecklist } from "react-icons/go";

const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

const MonthlyCost = () => {
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
        <div className="w-72 col-span-1">
          <Select label="Select Month">
            <Option>January</Option>
            <Option>February</Option>
            <Option>March</Option>
            <Option>April</Option>
            <Option>June</Option>
            <Option>July</Option>
            <Option>August</Option>
          </Select>
        </div>

        <div>
          {inputPairs.map((pair, index) => (
            <div key={pair.id} className="flex items-center space-x-4 space-y-2">
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



      {/* -----------Table---------- */}

     <div className="my-8">
     <hr className="mb-5" />
     <div className="flex justify-center items-center gap-2">
        <GoChecklist className="text-3xl" />
        <h2 className="text-2xl text-center font-semibold">
        লিস্ট
        </h2>
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
                  className="font-normal leading-none opacity-70"
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
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {job}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Link
                    href="#"
                    className="font-medium"
                  >
                    <FaEye className="text-xl"></FaEye>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
     </div>


    </div>
  );
};

export default MonthlyCost;
