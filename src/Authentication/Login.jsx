import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            login

            <Link to='/dashBoard'>
            <Button>
                DashBoard
            </Button>
            </Link>
        </div>
    );
};

export default Login;