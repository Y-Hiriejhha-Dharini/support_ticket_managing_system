import axios from "axios";
import Form from "../form/Form";
import { useState } from "react";
import Heading from "../form/Heading";
import Label from "../form/Label";
import Input from "../form/input";
import Button from "../form/button";
import Loading from "../form/Loading";
import Error from "../form/Error";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState({
        email : '',
        password : ''
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const formSubmit = async (e)=>{
        e.preventDefault();
        setError("");

        //Validation check
        if(!user.email || !user.password ){
            setError('Email and Password are required');
            return;
        }

        //Send Data to login backend
        setLoading(true);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login',user,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            console.log(response);
            
            setToken(response.data.token);
            localStorage.setItem('jwttoken',response.data.token);
            navigate('/ticket_index')
            
        }catch(error)
        {
            setError(error.response?.data?.message || 'Invalid email or password');
            console.log('Login error', error);
        }
        setLoading(false);
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    return ( 
        <div className="flex justify-center items-center  bg-gray-100 px-4">
            <Form formSubmit={formSubmit} className="mg:w-full bg-white max-w-md p-8 sm:p-8 w-96 shadow-md rounded-lg sm:mt-2">
                <Heading className="text-xl font-bold text-center mb-6">LOGIN</Heading>
                {/* Show Error Message */}
                {
                    error && <Error error={error}/>
                }
                <div className="flex flex-col mb-4">
                    <Label className="text-gray-700 font-medium mb-2" htmlFor="email">Email</Label>
                    <Input type="email" name="email" value={user.email} onChange={handleChange} className="w-full mt-2" placeholder="abc@gmail.com" required/>
                </div>
                <div className="flex flex-col mb-4">
                    <Label className="text-gray-700 font-medium mb-2" htmlFor="password">Password</Label>
                    <Input type="password" name="password" value={user.password} onChange={handleChange} className="w-full my-2" required/>
                </div>
                <Button className="bg-blue-400 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg w-full" type="submit">
                {
                    loading ? <Loading/> : 'SUBMIT'
                }
                </Button>
            </Form>
        </div>
     );
}
 
export default Login;