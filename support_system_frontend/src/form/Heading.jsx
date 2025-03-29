const Heading = ({children, className}) => {
    return ( 
        <div>
            <h2 className={`text-xl font-bold text-center mb-6 ${className}`}>{children}</h2>
        </div>
     );
}
 
export default Heading;