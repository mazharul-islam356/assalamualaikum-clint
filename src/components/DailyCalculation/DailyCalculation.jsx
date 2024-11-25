import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import {
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";

const TABLE_HEAD = ["তারিখ", "ক্যাশ এ আয়", "কার্ড এ আয়", "ক্যাশ থেকে খরচ", "নাস্তা", "টোটাল", ""];

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



const DailyCalculation = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // form data add

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const income_cash = form.income_cash.value
    const income_card = form.income_card.value 
    const cash_expenses = form.cash_expenses.value 
    const nasta_coast = form.nasta_coast.value 
console.log(income_card, income_cash, cash_expenses, nasta_coast);
  }


  return (
    <div className="w-11/12 mx-auto mt-10 font-bangla">
      <div className="flex justify-center items-center gap-2">
        <i className="bx bxs-file-doc text-3xl"></i>
        <h2 className="text-2xl text-center font-semibold">দৈনিক হিসাব</h2>
      </div>

      <Button className="font-bangla flex items-center gap-1 mt-6" onClick={handleOpen}>
        <FaPlus className="text-md font-bold"></FaPlus>
        যুক্ত করুন</Button>

       
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
            ক্যাশ থেকে আয়
            </Typography>
            <Input 
            label="+ ক্যাশ থেকে আয় যুক্ত করুন" size="lg"
            name="income_cash" 
            />
            
            <Typography 
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            কার্ড থেকে আয়
            </Typography>
            <Input 
            label="+ কার্ড থেকে আয় যুক্ত করুন" size="lg" 
            name="income_card"
            />

            <Typography 
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            ক্যাশ থেকে ব্যয় 
            </Typography>
            <Input 
            label="- ক্যাশ থেকে ব্যয় বাদ দিন" size="lg"
            name="cash_expenses"
             />

            <Typography 
            className="mb-1 mt-4 font-bangla" variant="h6"
            >
            নাস্তার খরচ
            </Typography>
            <Input 
            label="- ক্যাশ থেকে নাস্তার খরচ বাদ দিন" size="lg"
            name="nasta_coast"
             />
            
          <CardFooter className="pt-0">

          <button className="w-full font-bangla mx-auto mt-4 py-1 rounded-lg bg-gray-800 text-white" onClick={handleOpen}>যুক্ত করুন</button>
            
          </CardFooter>
            </form>

          </CardBody>

          
        </Card>

        
      </Dialog>


      <Card className="h-full w-full shadow-md mt-5 rounded-t-xl">
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
                    className="font-semibold font-bangla leading-none text-lg"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, job, date }, index) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {job}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    2045478
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default DailyCalculation;
