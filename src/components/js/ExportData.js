import '../css/ExportData.css';
import template from '../../config/template';
import copyData from '../../modules/copyData';
import jsonIcon from '../../img/jsonIcon.svg';
import csvIcon from '../../img/csvIcon.svg';

function ExportData(props) {
    function download(format, e) {
        const data = copyData(props.downloadData);
        const headers = [];
        
        for (let key in template) {
            headers.push(template[key].label);
        }
        
        const contents = format === "json"
            ? JSON.stringify(data, null, ' ')
            :
            [headers, ...data.map(row => {
                return Object.keys(row).map(col => {
                    return row[col];
                });
            })].map(e => e.join(",")).join("\n");
        
        const URL = window.URL || window.webkitURL;
        const blob = new Blob([contents], {type: "text/" + format});
        e.target.href = URL.createObjectURL(blob);
        e.target.download = "data." + format;
    }
    
    return (
        <div className="ExportData">
            <div>
                <img src={jsonIcon} alt="Eksportuj JSON" />
                <a href="data.json" onClick={(e) => download("json", e)}>
                    Eksportuj JSON
                </a>
            </div>
            <div>
                <img src={csvIcon} alt="Eksportuj CSV" />
                <a href="data.csv" onClick={(e) => download("csv", e)}>
                    Eksportuj CSV
                </a>
            </div>
        </div>
    )
}

export default ExportData;
