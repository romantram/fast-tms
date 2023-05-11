const FormRadio = (props) => (
    <>
        <input type="radio" {...props} />
        <label htmlFor={props.id}>
            {props.label}
        </label>
    </>
);

export default FormRadio;
