import '../css/Orders.css';
import {useState, useReducer, useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popup from './Popup';
import Form from './Form';
import Filter from './Filter';
import ExportData from './ExportData';
import UserActions from './UserActions';
import Button from './Button';
import copyData from '../../modules/copyData';
import filterIcon from '../../img/filterIcon.svg';
import exportIcon from '../../img/exportIcon.svg';

/* useState reducer */
function reducer(data, action) {

  /* sort orders */
  if (action.type === "sort") {
    const {column, sortDown} = action.payload;
    return data.sort((a, b) => {
      if (a[column] === b[column]) {
        return 0;
      }
      return sortDown ?
        a[column] < b[column] ? 1 : -1
        : a[column] > b[column] ? 1 : -1;
      });
  }
  
  /* Finish order */
  if (action.type === "finish") {
    data[action.payload.rowId].isFinished = true;
  }
  
  /* edit order */
  if (action.type === "saveForm") {
    Array.from(action.payload.form.current).forEach((formItem) => {
      data[action.payload.rowId][formItem.id] = formItem.type === "number" ? (formItem.value ? formItem.valueAsNumber : 0) : formItem.value;
    });
  }
  
  /* delete order */
  if (action.type === "delete") {
    data = copyData(data);
    data.splice(action.payload.rowId, 1);
  }
  
  setTimeout(() => action.payload.changeData(data));
  return data;
}

/* component function */
function Orders({template, initialData, changeData, searchFilter}) {
  const [data, dispatch] = useReducer(reducer, initialData);
  const [sorting, setSorting] = useState({
    column: "",
    sortDown: false
  });
  const [filterOrders, setFilterOrders] = useState("showAll");
  const [onFilter, setOnFilter] = useState(false);
  const [popup, setPopup] = useState(null);
  
  const form = useRef(null);
  
  /* handle event sort order */
  function sort(e) {
    const column = e.target.dataset.headerid;
    const sortDown = sorting.column === column && !sorting.sortDown;
    setSorting({column, sortDown});
    dispatch({
      type: "sort",
      payload: {column, sortDown}});
  }
  
  /* handle events function */
  function handleEvent(rowId, type) {
    /* finish order */
    if (type === "finish") {
      setPopup(
        <Popup
          header="Potwierdź zakończenie"
          confirmLabel="Zakończ"
          actionClick={(action) => {
            setPopup(null);
            if (action === "confirm") {
              dispatch({
                type: "finish",
                payload: {
                  rowId,
                  changeData
                }
              });
            }
          }}>
          {`Czy na pewno chcesz zakończyć ${data[rowId].name}?`}
        </Popup>
      );
    }

    /* show comment or edit order */
    const isEdit = type === "edit";
    if (type === "comment" || isEdit) {
      const orderDataForm = data[rowId];
      setPopup(
        <Popup
          header={isEdit ? "Edytuj zlecenie" : "Komentarz"}
          confirmLabel={isEdit ? "Zapisz" : "Ok"}
          cancelButton={isEdit}
          actionClick={(action) => {
            setPopup(null);
            if (isEdit && action === "confirm") {
              dispatch({
                type: "saveForm",
                payload: {
                  rowId,
                  changeData,
                  form
                }
              });
            }
          }}
        >
          <Form
            ref={form}
            fields={template}
            initialData={orderDataForm}
            readonly={!isEdit}
          />
        </Popup>
      );
    }

    /* delete order */
    if (type === "delete") {
      setPopup(
        <Popup
          header="Potwierdź usunięcie"
          confirmLabel="Usuń"
          actionClick={(action) => {
            setPopup(null);
            if (action === "confirm") {
              dispatch({
                type: "delete",
                payload: {
                  rowId,
                  changeData
                }
              });
            }
          }}>
          {`Czy na pewno chcesz usunąć ${data[rowId].name}?`}
        </Popup>
      );
    }
    
    /* export data */
    if (type === "export") {
      setPopup(
        <Popup
          cancelButton={false}
          header="Eksport bazy danych"
          confirmLabel="Ok"
          actionClick={() => {
            setPopup(null);
          }}
        >
          Wybierz format pliku:
          <ExportData downloadData={initialData} />
        </Popup>
      );
    }
  }

  return (
    <div className="Content">
      {/* toolbar section */}
      <div className="Toolbar">
        <div>
          <Button
            title="Filtruj"
            onClick={() => setOnFilter(!onFilter)}>
              <img src={filterIcon} alt="Filtruj" /> Filtruj
          </Button>
          <Button
            className="BtnSecondary"
            title="Eksportuj"
            onClick={() => handleEvent(null, "export")}>
              <img src={exportIcon} alt="Exportuj" /> Eksportuj
          </Button>
        </div>
        <div>
          Wszytkich zleceń: {initialData.length}
        </div>
      </div>
      
      {onFilter ?
        <Filter
          actionClick={(type) => setFilterOrders(type)}
          selected={filterOrders}
        />
      : null}
      
      {/* show data */}
      <div className="Orders">
        <table>
          <thead onClick={sort}>
            <tr>
              {Object.keys(template).map((key) => {
                let {label, show} = template[key];
                
                if (!show) {
                  return null;
                }
                
                if (sorting.column === key) {
                  label += sorting.sortDown ? " \u2193" : " \u2191";
                }
                
                return (
                  <th key={key} data-headerid={key}>
                    {label}
                  </th>
                );
              })}
              <th className="NotSortable"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowId) => {
              if (searchFilter) {
                const searchWord = searchFilter.toLowerCase();
                let finded = false;
                const fields = Object.keys(template);

                for (let f = 0; f < fields.length; f++) {
                  if (row[fields[f]].toString().toLowerCase().includes(searchWord)) {
                    finded = true;
                  }
                }
                
                if (!finded) {
                  return null;
                }
              }
              
              if (filterOrders === "showFinished") {
                let finded = false;
                if (row.isFinished === true) {
                  finded = true;
                }
                
                if (!finded) {
                  return null;
                }
              }
              
              if (filterOrders === "showNotFinished") {
                let finded = false;
                if (row.isFinished === false) {
                  finded = true;
                }
                
                if (!finded) {
                  return null;
                }
              }
              
              return (
                <tr key={rowId} data-row={rowId} className={classNames({Finished: row.isFinished})}>
                  {Object.keys(row).map((cell, columnId) => {
                    const settings = template[cell];
                    
                    if (!settings.show) {
                      return null;
                    }

                    let content = row[cell];
                    
                    return (
                      <td
                        key={columnId}
                        data-template={cell}
                        className={classNames({
                          OrdersDataLeft: settings.align === "left",
                          OrdersDataRight: settings.align === "right",
                          OrdersDataCenter: settings.align !== "left" && settings.align !== "right"
                        })}>
                          {(content || content===0) && cell === "price" ? <> {content} &#8364;</> : content}
                      </td>
                    );
                  })}
                  <td>
                    <UserActions
                      initialData={data}
                      rowId={rowId}
                      actionClick={(type) => handleEvent(rowId, type)} 
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {popup}
    </div>
  );
}

Orders.propTypes = {
  template: PropTypes.object,
  initialData: PropTypes.arrayOf(PropTypes.object),
  changeData: PropTypes.func,
  searchFilter: PropTypes.string,
};

export default Orders;
