import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input
    
  } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" />
        <Input label="Password" size="lg" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          Sign In
        </Button>
        <Button className="border border-gray-300 bg-white text-black mt-2 hover:shadow-md flex items-center gap-1 justify-center shadow-none" fullWidth>
            <FcGoogle className="text-xl"></FcGoogle>
          Continue With Google
        </Button>
        
      </CardFooter>
    </Card>

            <Link to='/dashBoard'>
            <Button>
                DashBoard
            </Button>
            </Link>
        </div>
    );
};

export default Login;