import '../css/Filter.css';
import FormRadio from './FormRadio';

function Filter({actionClick, selected}) {
    return (
        <div className='Filter'>
            <FormRadio name="showOrders" id="all" value="all" label="Wszystkie" checked={selected === "showAll"} onChange={() => actionClick("showAll")} />
            <FormRadio name="showOrders" id="finished" value="finished" label="Zakończone" checked={selected === "showFinished"} onChange={() => actionClick("showFinished")} />
            <FormRadio name="showOrders" id="notFinished" value="notFinished" label="Nie zakończone" checked={selected === "showNotFinished"} onChange={() => actionClick("showNotFinished")} />
        </div>
    )
}

export default Filter;
