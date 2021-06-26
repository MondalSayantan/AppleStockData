function addTd(content, tr){
    let td = document.createElement("td");
    td.innerHTML = content;
    tr.append(td);
}

function addTr(tbody,candle){
    let tr = document.createElement("tr");
    addTd(candle.date, tr);
    addTd(candle.open, tr);
    addTd(candle.close, tr);
    addTd(candle.high, tr);
    addTd(candle.low, tr);
    addTd(candle.volume, tr);
    tbody.append(tr);
}

function addHeading(thead, table){
    let theadTr = document.createElement("tr");
    addTd("Date", theadTr);
    addTd("Open", theadTr);
    addTd("Close", theadTr);
    addTd("High", theadTr);
    addTd("Low", theadTr);
    addTd("Volume", theadTr);
    thead.append(theadTr);
    table.append(thead);
}

setupDaysMap = function(){
    let numDays = new Map();
    numDays.set("01", "31");
    numDays.set("02", "28");
    numDays.set("03", "31");
    numDays.set("04", "30");
    numDays.set("05", "31");
    numDays.set("06", "30");
    numDays.set("07", "31");
    numDays.set("08", "31");
    numDays.set("09", "30");
    numDays.set("10", "31");
    numDays.set("11", "30");
    numDays.set("12", "31");
    return numDays;
}

function createBasicTable(filteredData){
    document.getElementById("tablediv").innerHTML = '';
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    table.setAttribute('id', 'tiingoTable');
    table.setAttribute('class', 'table');
    addHeading(thead, table);
    let tbody = document.createElement("tbody");
    table.append(tbody);
    filteredData.forEach(candle => {
        addTr(tbody, candle);
    })
    table.append(tbody);
    document.getElementById('tablediv').append(table)
}

function fetchTiingoData(month, year){
    let numDays = setupDaysMap();
    let startDate = new Date(year + '-' + month + '-' + "01")
    let endDate = new Date(year + '-' + month + '-' + numDays.get(month));
    var filteredData = stockData.filter(candle => new Date(candle.date) >= startDate && new Date(candle.date) <= endDate)
    return filteredData;
}

function repaintTableDiv(month, year){
    let table = createBasicTable(fetchTiingoData(month, year));
}

handleDropdownChange = function() {
    let yearVal = document.getElementById('year').value;
    let monthVal = document.getElementById('month').value;
    repaintTableDiv(monthVal, yearVal);
}

attachEvents = function(event) {
    document.getElementById('year').addEventListener('change', handleDropdownChange)
    document.getElementById('month').addEventListener('change', handleDropdownChange)
}

repaintTableDiv('02', '2020')
attachEvents();