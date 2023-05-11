import '../css/UserActions.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import commentIcon from '../../img/commentIcon.svg';
import editIcon from '../../img/editIcon.svg';
import deleteIcon from '../../img/deleteIcon.svg';

const UserActions = ({initialData, rowId, actionClick}) => (
    <span className="UserActions">
        <Button
            className={classNames("Finish", {Finished: initialData[rowId].isFinished})}
            disabled={initialData[rowId].isFinished ? true : false}
            title="Zakończ"
            onClick={() => actionClick("finish")}>
                Zakończ
        </Button>
        <Button
            title="Komentarz"
            onClick={() => actionClick("comment")}>
                <img src={commentIcon} alt="Komentarz" />
        </Button>
        <Button
            title="Edycja"
            onClick={() => actionClick("edit")}>
                <img src={editIcon} alt="Edycja" />
        </Button>
        <Button
            tabIndex="0"
            title="Usuń"
            onClick={actionClick.bind(null, "delete")}>
                <img src={deleteIcon} alt="Usuń" />
        </Button>
    </span>
);

UserActions.propTypes = {
    actionClick: PropTypes.func
};

export default UserActions;
