function FormField({ id, label, children }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            {children}
        </div>
    );
}

export default FormField;
