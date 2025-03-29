const Label = ({children, htmlFor, className}) => {
    return ( 
        <div>
            <label className={className} htmlFor={htmlFor}>{children}</label>
        </div>
     );
}
 
export default Label;