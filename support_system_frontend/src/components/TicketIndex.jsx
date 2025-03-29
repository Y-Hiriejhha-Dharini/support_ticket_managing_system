import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../form/Loading";
import Error from "../form/Error";
import Input from "../form/input";
import Heading from "../form/Heading";
import Button from "../form/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";


const TicketIndex = () => {

    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectTicket, setSelectTicket] = useState(null);

    useEffect( ()=>{
        const fetchTickets = async () =>{
            try{
                setLoading(true);
                const jwtToken = localStorage.getItem('jwttoken');
                const response = await axios.get('http://127.0.0.1:8000/api/tickets',{
                    headers:{
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    params:{
                        search: search,
                        page: currentPage
                    }
                });
                setTickets(response.data?.data?.data);
                setLoading(false);
        
            }catch(error)
            {
                setLoading(false);
                setError(error.response?.data);
            }
        }

        fetchTickets();
        
    },[search,currentPage]);

    // Search
    const handleChange = (e)=>{
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    // Paginate
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const ShowTicket = async (ticketId) => {
        const ticket = tickets.find(ticket => ticket.id === ticketId);
        if (ticket) {

            try{
                const jwtToken = localStorage.getItem('jwttoken');
                await axios.put(`http://127.0.0.1:8000/api/tickets/${ticketId}/read`,
                    {},
                    {
                        headers:{
                            'Authorization': `Bearer ${jwtToken}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });

                    setTickets(tickets.map(t => t.id === ticketId ? {...t, read_unread: 1 } : t))
            }catch(error){
                console.error("Error updating ticket:", error);
            }
            setSelectTicket(ticket);
            setModalOpen(true);
        }
    };
    
    return ( 
        <div className="min-h-screen min-w-screen mx-6 p-4 sm:p-8">
            {/* Loading */}
            {
                loading && <Loading/>
            }

            {/* Error */}
            {
                error && <Error/>
            }

            {/* Search Input */}
            <div className="flex justify-end mb-4">
                <Input type="text" name="email" value={search} onChange={handleChange} className="mt-2 w-full sm:w-96" placeholder="Search by customer name"/>
            </div>

            {/* Table Headers */}
            <div className="mx-auto w-full max-w-screen-2xl">
                <Heading>Tickets</Heading>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full w-full table-auto text-sm text-left text-gray-700">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Customer Name</th>
                                <th className="px-4 py-2">Problem Description</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.length > 0 ?
                                    tickets.map((ticket) => (
                                        <tr key={ticket.id} className={`border-b border-gray-200  ${ticket.read_unread === 0 ? 'bg-blue-100' : ''}`}>
                                            <td className="px-4 py-2">{ticket.customer_name}</td>
                                            <td className="px-4 py-2">{ticket.problem_description}</td>
                                            <td className="px-4 py-2">{ticket.email}</td>
                                            <td className="px-4 py-2">{ticket.phone_number}</td>
                                            <td className="px-4 py-2">
                                                <Button onClick={()=>ShowTicket(ticket.id)}>
                                                    <FontAwesomeIcon icon={faEye} className="px-4 py-2 flex items-center bg-blue-500 text-white rounded-lg hover:bg-blue-700" /> 
                                                </Button>
                                            </td>
                                        </tr>
                                    )) :
                                    <tr><td colSpan="5" className="px-4 py-2 text-center">No Tickets to show</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-2">
                <Button 
                    onClick={()=>paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg text-sm"
                    >Prev
                </Button>
                <Button 
                    onClick={()=>paginate(currentPage + 1)}
                    disabled={tickets.length === 0}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg text-sm"
                    >Next
                </Button>
            </div>

            {/* Modal */}
            {
                modalOpen && (
                    <Modal
                        isOpen={modalOpen}
                        ticket={selectTicket}
                        onClose={()=>setModalOpen(false)}
                    />
                )
            }
        </div>
    );
}
 
export default TicketIndex;