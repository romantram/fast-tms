import PropTypes from 'prop-types';

function FormDatalist({id, defaultValue="", options=[]}) {
    const randomId = Math.random().toString(16).substring(2);

    return (
        <>
            <input
                id={id}
                list={randomId}
                defaultValue={defaultValue}
            />
            <datalist id={randomId}>
                {options.map((item, idx) => (
                    <option value={item} key={idx} />
                ))}
            </datalist>
        </>
    );
}

FormDatalist.propTypes = {
    defaultValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string)
};

export default FormDatalist;
