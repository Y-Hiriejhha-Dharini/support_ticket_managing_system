import { useState } from "react";
import Button from "../form/button";
import Heading from "../form/Heading";
import Error from "../form/Error";
import axios from "axios";
import Input from "../form/input";

const Reference = () => {

    const [referenceNumber, setReferenceNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [referenceData, setReferenceData] = useState(null);

    const handleSearch = async () =>{
        setError(null);
        setReferenceData(null);

        if(!referenceNumber.trim()){
            setError('Please enter a reference number');
            return;
        }

        setLoading(true);
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/reference/${referenceNumber}`);
            setReferenceData(response.data?.data);
            console.log(response.data?.data);
            
        }catch(error)
        {
            setError(error.response.data?.message || 'Error Occurred');

        }finally{
            setLoading(false);
        }
    }

    return ( 
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <Heading>Reference Data</Heading>
            <div className="max-w-lg bg-white rounded-lg p-4 shadow-md">
                <Input type="text" name="reference" value={referenceNumber} onChange={(e)=>setReferenceNumber(e.target.value)} className="w-full mt-2 p-2 border rounded" placeholder="Enter Reference Number" required/>
                <Button onClick={handleSearch} disabled={loading} className="bg-blue-400 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg w-full mt-2" type="submit">
                    {
                        loading ? "Searching..." : 'Find Reference'
                    }
                </Button>

                {/* Show Error Message */}
                {
                    error && <Error error={error}/>
                }
            </div>

            {
                referenceData && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border w-full max-w-lg">
                        <Heading>Reference Data</Heading>

                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold text-gray-700">Customer Name:</p>
                            <p className="text-gray-900">{referenceData.customer_name}</p>

                            <p className="font-semibold text-gray-700">Email:</p>
                            <p className="text-gray-900 break-words">{referenceData.email}</p> {/* Added break-words */}

                            <p className="font-semibold text-gray-700">Problem Description:</p>
                            <p className="text-gray-900">{referenceData.problem_description}</p>

                            <p className="font-semibold text-gray-700">Problem Solution:</p>
                            <p className="text-gray-900">{referenceData.problem_solution}</p>
                        </div>
                    </div>

                )
            }
        </div>
     );
}
 
export default Reference;