const Input = ({name, value, onChange, type, placeholder, className, required, disabled}) => {
    return ( 
        <div>
            <input 
                name={name} 
                value={value} 
                onChange={onChange} 
                type={type}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
            />
        </div>
     );
}
 
export default Input;