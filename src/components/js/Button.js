import '../css/Button.css';
import classNames from 'classnames';

const Button = (props) => <button {...props} className={classNames("Btn", props.className)} />

export default Button;
