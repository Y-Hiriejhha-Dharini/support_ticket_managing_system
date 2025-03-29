import Form from "../form/Form";
import Heading from "../form/Heading";
import Input from "../form/input";
import Label from "../form/Label";
import TextArea from "../form/TextArea";
import axios from "axios";
import Error from "../form/Error";
import Loading from "../form/Loading";
import Button from "../form/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Modal = ({isOpen, ticket, onClose}) => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [ticketData, setTicketData] = useState(ticket);

    useEffect(() => {
        if(ticket){
            setTicketData(ticket);
        }
    }, [ticket]);    

    if(!isOpen || !ticket) return null;

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setTicketData({
            ...ticketData,
            [name]:value
        })
    }

    const formSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        const jwtToken = localStorage.getItem('jwttoken');

        if(!jwtToken){
            setError("Authentication token is missing. Please log in again.");
            return;
        }

        //Ticket Validateion
        if(!ticket.customer_name || !ticket.problem_description || !ticket.email || !ticket.phone_number)
        {
            setError('All fields must be filled');
            return;
        }

        setLoading(true);
        try{
             await axios.put(`http://127.0.0.1:8000/api/tickets/${ticket.id}`,ticketData,{
                headers:{
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            navigate('/ticket_index');

        }catch(error)
        {
            setError(error.response ? error.response.data.message : 'An Error Occured');
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex justify-center items-center bg-gray-100 px-4 w-full">
            <form
              onSubmit={formSubmit}
              className="w-full bg-white max-w-lg sm:max-w-2xl p-6 sm:p-8 shadow-md rounded-lg"
            >
              <Heading>Ticket View</Heading>
    
              {/* Form Error Handling */}
              {error && <Error error={error} />}
    
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-gray-700 font-medium mb-2" htmlFor="customer_name">
                    Customer Name
                  </Label>
                  <Input
                    type="text"
                    name="customer_name"
                    value={ticketData.customer_name}
                    onChange={handleChange}
                    className="w-full mt-2"
                    placeholder="John"
                    disabled
                  />
                </div>
    
                <div>
                  <Label className="text-gray-700 font-medium mb-2" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={ticketData.email}
                    onChange={handleChange}
                    className="w-full mt-2"
                    placeholder="John@gmail.com"
                    disabled
                  />
                </div>
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-gray-700 font-medium mb-2" htmlFor="phone_number">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    name="phone_number"
                    value={ticketData.phone_number}
                    onChange={handleChange}
                    className="w-full mt-2"
                    placeholder="+94 123 456 5678"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label className="text-gray-700 font-medium mb-2" htmlFor="problem_description">
                  Problem Description
                </Label>
                <TextArea
                  name="problem_description"
                  value={ticketData.problem_description}
                  placeholder="Add your problem description"
                  onChange={handleChange}
                  disabled
                />
              </div>
    
              <div className="mb-4">
                <Label className="text-gray-700 font-medium mb-2" htmlFor="problem_solution">
                  Problem Solution
                </Label>
                <TextArea
                  name="problem_solution"
                  value={ticketData.problem_solution || ""}
                  placeholder="Add your problem solution"
                  onChange={handleChange}
                />
              </div>
    
              <div className="flex space-x-4 mt-6 justify-end">
                <Button
                  onClick={onClose}
                  className="bg-red-400 hover:bg-red-600 text-white font-semibold p-2 rounded-lg"
                  type="reset"
                >
                  Close
                </Button>
    
                <Button
                  className="bg-blue-400 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg"
                  type="submit"
                >
                  {loading ? <Loading /> : "UPDATE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    };
 
export default Modal;