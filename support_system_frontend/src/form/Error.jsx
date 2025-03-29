const Error = ({error}) => {
    return ( 
        <div>
            <p className="text-red-400 bg-red-100 border border-red-400 px-2 py-2 rounded-md text-center my-2">
               {error}
            </p>
        </div>
     );
}
 
export default Error;