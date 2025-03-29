const Button = ({children, type, className, onClick}) => {
    return ( 
        <div>
            <button onClick={onClick} className={className} type={type}>{children}</button>
        </div>
     );
}
 
export default Button;