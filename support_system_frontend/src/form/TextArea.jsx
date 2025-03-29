const TextArea = ({name, value, placeholder, rows = 4, onChange, className, required, disabled }) => {
    return ( 
        <div>
            <textarea 
                name={name}
                value={value}
                placeholder={placeholder}
                rows={rows}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${className}`}
            />
        </div>
     );
}
 
export default TextArea;