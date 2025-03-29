import { useState } from "react";
import Form from "../form/Form";
import Heading from "../form/Heading";
import Input from "../form/input";
import Label from "../form/Label";
import TextArea from "../form/TextArea";
import axios from "axios";
import Error from "../form/Error";
import Loading from "../form/Loading";
import Button from "../form/button";

const AddTicket = () => {

    const [ticket, setTicket] = useState({
        customer_name: '',
        problem_description: '',
        email: '',
        phone_number: ''
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [reference, setReference] = useState(null);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setTicket({
            ...ticket,
            [name]: value
        });
    }

    const formSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        const jwtToken = localStorage.getItem('jwttoken');

        //Ticket Validateion
        if(!ticket.customer_name || !ticket.problem_description || !ticket.email || !ticket.phone_number)
        {
            setError('All fields must be filled');
            return;
        }

        setLoading(true);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/tickets',ticket,{
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if(response.data.status == 'success'){
                setReference(response.data.data.reference_number);

                setTicket({
                            customer_name: '',
                            problem_description: '',
                            email: '',
                            phone_number: ''
                    });

            }else{
                setError('Something went wrong');
            }

        }catch(error)
        {
            setError(error.response ? error.response.data.message : 'An Error Occured');
        }finally{
            setLoading(false);
        }
    }
    return ( 
        <div className="flex justify-center items-center  bg-gray-100 px-4 w-full">
            <Form formSubmit={formSubmit} className="w-full bg-white max-w-md p-8 sm:p-8 sm:w-96 max-w-md shadow-md rounded-lg sm:mt-2">
                <Heading>Add Ticket</Heading>

                {/* Refernce Number */}
                {
                    reference && (
                        <div className="text-green-400 bg-green-100 border border-green-400 px-2 py-2 rounded-md text-center mb-4">
                            <h2>Reference number: {reference}</h2>
                        </div>
                    )
                }

                {/* Form Error Handling */}
                {
                    error && <Error error={error}/>
                }
                <div className="flex flex-col mb-4">
                    <Label className="text-gray-700 font-medium mb-2" htmlFor="customer_name">Customer Name</Label>
                    <Input type="text" name="customer_name" value={ticket.customer_name} onChange={handleChange} className="w-full mt-2" placeholder="John" required/>
                </div>
                <div className="flex flex-col mb-4">
                    <Label className="text-gray-700 font-medium mb-2" htmlFor="problem_description">Problem Description</Label>
                    <TextArea name="problem_description" value={ticket.problem_description} placeholder="Add your problem description" onChange={handleChange} required/>
               </div>
               <div className="flex flex-col mb-4">
                    <Label className="text-gray-700 font-medium mb-2" htmlFor="email">Email</Label>
                    <Input type="email" name="email" value={ticket.email} onChange={handleChange} className="w-full mt-2" placeholder="John@gmail.com" required/>
                </div>
                <div className="flex flex-col mb-4">
                    <Label className="text-gray-700 font-medium mb-2" htmlFor="phone_number">Phone Number</Label>
                    <Input type="text" name="phone_number" value={ticket.phone_number} onChange={handleChange} className="w-full mt-2" placeholder="+94 123 456 5678" required/>
                </div>
                <Button className="bg-blue-400 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg w-full" type="submit">
                {
                    loading && loading ? <Loading/> : 'SUBMIT'
                }
                </Button>
            </Form>
        </div>
     );
}
 
export default AddTicket;