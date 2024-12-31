import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input
    
  } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import auth from "./firebase";


const Login = () => {

  const {googleLogin} = useContext(AuthContext)
  const [error,setError] = useState('')
  const navigate = useNavigate()




  error && toast.error('Email/Password do not match') 
  const handleLogin = (media) => {
    media()
    .then(res=>
      {
      console.log(res.user)
      if(res.user){
        toast.success('Login successfully!')
      navigate('/')
    }
      }
    )
    .catch(err=>console.log(err))
    
  }

  const handleLoginSubmit = (e) =>{
    e.preventDefault()
  

    const email = e.target.email.value;
    const pass = e.target.pass.value;
    
    console.log(email,pass);
    if(pass.length < 6){
      toast.error('Password should be at least 6 characters')
      return
    }
     else if(!/[A-Z]/.test(pass)){
      toast.error('Please include at least one uppercase letter in your password')
      return
    }
    else if (!/[!@#$%^&*()_+\-=[{};':"|,.<>/?]+/.test(pass)){

      toast.error('Please include Special Characters in your password')
      return

    }
    
    
    if(email,pass){
    signInWithEmailAndPassword(auth,email,pass)
    .then(res=>console.log(res.user))
    .catch(err=>setError(err.message))
    toast.success('Login successfully!')
    navigate('/')
    return
  } 
      
  } 
    return (
        <div className="flex justify-center items-center h-screen">
           <form onSubmit={handleLoginSubmit}>

           <Card className="w-96">
     
        <Button onClick={()=> handleLogin(googleLogin)} className="border border-gray-300 bg-white text-black mt-2 hover:shadow-md flex items-center gap-1 justify-center shadow-none" fullWidth>
            <FcGoogle className="text-xl"></FcGoogle>
          Continue With Google
        </Button>
       
        
      
    </Card>

           </form>

           
        </div>
    );
};

export default Login;