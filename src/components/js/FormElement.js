import PropTypes from 'prop-types';
import FormDatalist from './FormDatalist';

function FormElement({type="text", defaultValue="", options=[], ...props}) {
    switch (type) {
        case "datalist":
            return (
                <FormDatalist defaultValue={defaultValue} options={options} {...props} />
            );
        case "textarea":
            return <textarea defaultValue={defaultValue} {...props} />
        case "number":
            return <input defaultValue={defaultValue} type="number" {...props} />
        default:
            return <input defaultValue={defaultValue} type={type} {...props} />
    }
}

FormElement.propTypes = {
    type: PropTypes.oneOf(["text", "datalist", "textarea", "number"]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    options: PropTypes.array
};

export default FormElement;
