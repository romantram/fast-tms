import React from 'react';
import './NavbarStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

class Navbar extends React.Component {
    state = {clicked: false};
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render() {
        return (
            <nav>
                <a href="index.html"><span>Fast</span>TMS</a>
                <div>
                    <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                        <li><a className="active" href="index.html">Zlecenia</a></li>
                        <li><a href="index.html">Raporty</a></li>
                        <li><a href="index.html">Pojazdy</a></li>
                        <li><a href="index.html">Kierowcy</a></li>
                    </ul>
                </div>
                <div id="mobile" onClick={this.handleClick}>
                    <FontAwesomeIcon id="mobileNavbarIcons" icon={this.state.clicked ? solid('xmark') : solid('bars')} size="xl" />
                </div>
            </nav>
        )
    }
}

export default Navbar;
