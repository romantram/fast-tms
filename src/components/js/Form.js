import '../css/Form.css';
import {forwardRef} from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';

const Form = forwardRef(({fields, initialData = {}, readonly = false}, ref) => {
    return (
        <form className="Form" ref={ref}>
            {Object.keys(fields).map((id) => {
                const OrderFormFilled = initialData[id];
                const {label, type, options} = fields[id];
                
                if (readonly && id === "comment") {
                    return (
                        <div className="FormRow" key={id}>
                            {OrderFormFilled}
                        </div>
                    );
                }
                
                if (!readonly && id!=="isFinished") {
                    return (
                        <div className="FormRow" key={id}>
                            <label className="FormLabel" htmlFor={id}>
                                {label}
                            </label>
                            <FormElement
                                id={id}
                                type={type}
                                options={options}
                                defaultValue={OrderFormFilled}
                            />
                        </div>
                    );
                }
                return null;
            })}
        </form>
    );
});

Form.propTypes = {
    fields: PropTypes.objectOf(
        PropTypes.shape({
            label: PropTypes.string,
            type: PropTypes.oneOf(["text", "datalist", "textarea", "number"]),
            options: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    initialData: PropTypes.object,
    readonly: PropTypes.bool
};

export default Form;
