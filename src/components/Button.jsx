function Button({ variant = "secondary", type = "button", children, ...rest }) {
    return (
        <button type={type} className={`btn btn-${variant}`} {...rest}>
            {children}
        </button>
    );
}

export default Button;
