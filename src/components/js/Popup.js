import '../css/Popup.css';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function Popup(props) {
    const {
        header,
        optionalCancel = true,
        confirmLabel = "Ok",
        actionClick = () => {},
        cancelButton = true
    } = props;
    useEffect(() => {
        function cancelKey(e) {
            if (e.key === "Escape") {
                actionClick("cancel");
            }
        }
        
        if (optionalCancel) {
            document.addEventListener("keydown", cancelKey);
        };
        return () => {
            document.removeEventListener("keydown", cancelKey);
        };
    }, [actionClick, optionalCancel]);
    return (
        <div className="Popup">
            <div className="PopupWrap">
                <div className="PopupHeader">{header}</div>
                <div className="PopupBody">{props.children}</div>
                <div className="PopupFooter">
                    {cancelButton ? (
                        <Button className="PopupCancel" onClick={() => actionClick("cancel")}>
                            Anuluj
                        </Button>
                    ) : null}
                    <Button onClick={() => actionClick(cancelButton ? "confirm" : "cancel")}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

Popup.propTypes = {
    header: PropTypes.string.isRequired,
    optionalCancel: PropTypes.bool,
    confirmLabel: PropTypes.string,
    actionClick: PropTypes.func,
    cancelButton: PropTypes.bool
};

export default Popup;
