const Form = ({formSubmit, children, className}) => {
    return ( 
        <div>
            <form onSubmit={formSubmit} className={className}>
                {children}
            </form>
        </div>
     );
}
 
export default Form;