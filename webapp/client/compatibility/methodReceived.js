//Template.receivedMethodChart.onRendered(function () {
//    getMethodReceivedData();
//});


// Perform query
function getMethodReceivedData() {
    // Variable to hold response data
    var chartData = [];

    // Set query string
    var url = Session.get("queryString");

    // Perform query
    $.getJSON( url, function( data ) {

        var groupedData = _.groupBy(data, function(d){ return d.method_received });

        $.each( groupedData, function( key, value ) {
            var obj = {};
            obj.method_received = key;
            obj.count = value.length;
            chartData.push(obj);
        });
        chartData = _.sortBy(chartData, 'count').reverse(); // In descending order
        //console.log("getMethodReceivedData() called. chartData ");
        //console.log(chartData);

        Session.set("methodReceivedData", chartData);

        $('#receivedMethodChart').empty();
        if (chartData.length > 0 ) {
            drawMethodReceived();
        } else {
            $('#receivedMethodChart').html("<p>Query returned no matches.</p>");
        }
    });
}

// Render to chart
function drawMethodReceived() {

    var methodReceivedData = Session.get("methodReceivedData");

    if(methodReceivedData)
    {
        new Morris.Bar({
            element: 'receivedMethodChart',
            data: methodReceivedData,
            xkey: 'method_received',
            ykeys:  ['count'],
            labels: ['count'],
            barRatio: 0.4,
            xLabelAngle: 35,
            hideHover: 'auto',
            resize: true
        });
    }
}