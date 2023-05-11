import '../css/Header.css';
import FormElement from './FormElement';
import Button from './Button';

function Header({search, add}) {
    const placeholder = "Szukaj...";
    return (
        <div className="Header">
            <h1 className="Logo">
                FastTMS
            </h1>
            <FormElement
                placeholder={placeholder}
                id="search"
                onChange={search}
            />
            <Button title="Dodaj" onClick={add}>
                <b>&#xFF0B;</b><br/>Dodaj nowe zlecenie
            </Button>
        </div>
    );
}

export default Header;
