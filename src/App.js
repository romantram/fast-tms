import './App.css';
import {useState, useReducer, useRef} from 'react';
import Header from './components/js/Header';
import Body from './components/js/Body';
import Orders from './components/js/Orders';
import Popup from './components/js/Popup';
import Form from './components/js/Form';
import template from './config/template';
import copyData from './modules/copyData';

let initialData = JSON.parse(localStorage.getItem("data"));

if (!initialData) {
    initialData = [{}];
    Object.keys(template).forEach((key) => initialData[0][key] = template[key].example[0]);
}

/* save data in local storage */
function saveToStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

/* useState reducer */
function reducer(data, action) {
    /* adding a new order */
    if (action.type === "save") {
        data = copyData(data);
        data.unshift(action.payload.formData);
        saveToStorage(data);
        return data;
    }
    
    /* change order */
    if (action.type === "changeOrder") {
        saveToStorage(action.payload.updatedData);
        return action.payload.updatedData;
    }
}

/* component function */
function App() {
    const [data, dispatch] = useReducer(reducer, initialData);
    const [addNew, setAddNew] = useState(false);
    const [searchFilter, setSearchFilter] = useState(null);
    
    const form = useRef(null); // stores the the elements of the form
    
    /* handle event callback add a new order */
    function saveNew(action) {
        setAddNew(false);
        if (action === "cancel") {
            return;
        }
        
        const formData = {};
        
        Array.from(form.current).forEach((input) => {
            formData[input.id] = input.type === "number" ? (input.value ? input.valueAsNumber : 0) : input.value;
        });

        formData.isFinished = false;

        dispatch({
            type: "save",
            payload: {formData}
        });
    }

    /* handle event callback change order */
    function ordersDataChange(updatedData) {
        dispatch({
            type: "changeOrder",
            payload: {updatedData}
        });
    }
    
    /* handle event callback search filter */
    function search(e) {
        setSearchFilter(e.target.value);
    }
    
    return (
        <div>
            <Header
                search={search}
                add={() => setAddNew(true)}
            />
            <Body>
                <Orders
                    template={template}
                    initialData={data}
                    key={data}
                    changeData={(updatedData) => ordersDataChange(updatedData)}
                    searchFilter={searchFilter}
                />
                {addNew ? (
                    <Popup
                        header="Dodaj nowy element"
                        confirmLabel="Dodaj"
                        actionClick={(action) => saveNew(action)}>
                            <Form 
                                ref={form}
                                fields={template}
                            />
                    </Popup>
                ) : null}
            </Body>
        </div>
    );
}

export default App;
