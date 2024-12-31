import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {

  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {

  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MdDashboard } from "react-icons/md";
import { FaCalculator, FaFileInvoiceDollar } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";

const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset
  
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
        setPrevScrollPos(currentScrollPos)
      }
  
      window.addEventListener('scroll', handleScroll)
  
      return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos])

    // navbar
    const [open, setOpen] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
   
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <div>
            <nav
      className={`w-full transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Salamualaikum
              </Link>
            </div>
            <div>


            <div>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer style={{backgroundColor:'white'}} open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="white"
          shadow={false}
          className="static h-screen bg-gray-200 p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Salamualaikum
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
                   
           <Link to='/'>
           <ListItem>
              <ListItemPrefix>
                <MdDashboard className="h-5 w-5" />
              </ListItemPrefix>
              ড্যাশবোর্ড
            </ListItem>
           </Link>

           <Link to='/daily-calculation'>
           <ListItem>
              <ListItemPrefix>
                <FaCalculator  className="h-5 w-5" />
              </ListItemPrefix>
              দৈনিক হিসাব
            </ListItem>
           </Link>

            <Link to='/monthly-cost'>
            <ListItem>
              <ListItemPrefix>
                <GrMoney className="h-5 w-5" />
              </ListItemPrefix>
               মাসিক এককালীন  খরচ
            </ListItem>
            </Link>

          <Link to='/employee-salary'>
          <ListItem>
              <ListItemPrefix>
                <FaFileInvoiceDollar className="h-5 w-5" />
              </ListItemPrefix>
              বেতন
            </ListItem>
          </Link>
           
          </List>
         
        </Card>
      </Drawer>
    </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
        </div>
    );
};

export default Navbar;