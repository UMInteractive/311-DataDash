// Returns a string with the formatted date range, and updates the session variable
function getDateRange() {
    datestart = $('datestart').val();
    dateend = $('dateend').val();
    daterange = "and ticket_created_date_time >= \'" + datestart + "\' and ticket_created_date_time <= \'" + dateend + "\'";

    return daterange;
}

function setperiod2(selector) {
    selector2 = selector.value;
    if (selector2 == 'day') {
        dateend = new Date();
        dateend = dateend.toISOString().slice(0, 10);
        datestart = new Date();
        datestart.setDate(datestart.getDate() - 1);
        datestart = datestart.toISOString().slice(0, 10);
    } else if (selector2 == 'month') {
        dateend = new Date();
        dateend = dateend.toISOString().slice(0, 10);
        datestart = new Date();
        datestart.setDate(datestart.getDate() - 31);
        datestart = datestart.toISOString().slice(0, 10);
    } else if (selector2 == 'year') {
        dateend = new Date();
        dateend = dateend.toISOString().slice(0, 10);
        datestart = new Date();
        datestart.setDate(datestart.getDate() - 365);
        datestart = datestart.toISOString().slice(0, 10);
    }
    daterange = "and ticket_created_date_time >= \'" + datestart + "\' and ticket_created_date_time <= \'" + dateend + "\'";
    plotpoints();
}