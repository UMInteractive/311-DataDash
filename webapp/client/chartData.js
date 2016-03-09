// Morris.js Charts sample data for SB Admin template

/*
 CHART DATA
 0. selectDistrict
 1. filterCharts
 2. openTicketChart
 3. mostRequestedChart
 4. openOverdueTicketChart
 5. avgDayChart
 6. receivedMethodChart
 8. dataStoriesChart
 */

//1. FILTER
Template.timeline.events({
    // Handle changes of district drop-down
    'change #district': function (evt) {
        console.log("district changed");
        var s = $(evt.target).val();
        Session.set("district", s);
        setRange();
    },
    'click .mapButton': function(evt) {
        drawMethodReceived();
    },
    'click #go-button': function(evt) {
        drawMethodReceived();
    }
});


/* //2. OPEN TICKET 
Template.openTicketChart.onRendered(function (){
    function drawOpenTicketChart(){
        $('#openTicketChart').empty();

        var openTicketData = [{
            d: '2012-10-01',
            visits: 802
        }, {
            d: '2012-10-02',
            visits: 783
        }, {
            d: '2012-10-03',
            visits: 820
        }, {
            d: '2012-10-04',
            visits: 839
        }, {
            d: '2012-10-05',
            visits: 792
        }, {
            d: '2012-10-06',
            visits: 859
        }, {
            d: '2012-10-07',
            visits: 790
        }, {
            d: '2012-10-08',
            visits: 1680
        }, {
            d: '2012-10-09',
            visits: 1592
        }, {
            d: '2012-10-10',
            visits: 1420
        }, {
            d: '2012-10-11',
            visits: 882
        }, {
            d: '2012-10-12',
            visits: 889
        }, {
            d: '2012-10-13',
            visits: 819
        }, {
            d: '2012-10-14',
            visits: 849
        }, {
            d: '2012-10-15',
            visits: 870
        }, {
            d: '2012-10-16',
            visits: 1063
        }, {
            d: '2012-10-17',
            visits: 1192
        }, {
            d: '2012-10-18',
            visits: 1224
        }, {
            d: '2012-10-19',
            visits: 1329
        }, {
            d: '2012-10-20',
            visits: 1329
        }, {
            d: '2012-10-21',
            visits: 1239
        }, {
            d: '2012-10-22',
            visits: 1190
        }, {
            d: '2012-10-23',
            visits: 1312
        }, {
            d: '2012-10-24',
            visits: 1293
        }, {
            d: '2012-10-25',
            visits: 1283
        }, {
            d: '2012-10-26',
            visits: 1248
        }, {
            d: '2012-10-27',
            visits: 1323
        }, {
            d: '2012-10-28',
            visits: 1390
        }, {
            d: '2012-10-29',
            visits: 1420
        }, {
            d: '2012-10-30',
            visits: 1529
        }, {
            d: '2012-10-31',
            visits: 1892

        }];

        if(openTicketData)
        {
            new Morris.Line({
                element: 'openTicketChart',
                data: openTicketData,
                // The name of the data record attribute that contains x-visitss.
                xkey: 'd',
                // A list of names of data record attributes that contain y-visitss.
                ykeys: ['visits'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['Visits'],
                // Disables line smoothing
                smooth: false,
                resize: true
            });
        }
    }
    drawOpenTicketChart();

});




// 3. MOST REQUESTED 
Template.mostRequestedChart.onRendered(function (){
    function drawMostRequested(){
        $('#mostRequestedChart').empty();

        var mostRequestedData = [{
            device: 'iPhone',
            geekbench: 136
        }, {
            device: 'iPhone 3G',
            geekbench: 137
        }, {
            device: 'iPhone 3GS',
            geekbench: 275
        }, {
            device: 'iPhone 4',
            geekbench: 380
        }, {
            device: 'iPhone 4S',
            geekbench: 655
        }, {
            device: 'iPhone 5',
            geekbench: 1571
        }];

        if(mostRequestedData)
        {
            new Morris.Bar({
                element: 'mostRequestedChart',
                data: mostRequestedData,
                xkey: 'device',
                ykeys: ['geekbench'],
                labels: ['Geekbench'],
                barRatio: 0.4,
                xLabelAngle: 35,
                hideHover: 'auto',
                resize: true
            });
        }
    }
    drawMostRequested(); //Call the chart



});
*/

//4. OPEN OVERDUE
Template.overdueTicketChart.onRendered(function (){
    function drawOverdueTicket(){
        $('#overdueTicketChart').empty();

        var overdueTicketData = [{
            od: '2012-10-01',
            visits: 802
        }, {
            od: '2012-10-02',
            visits: 783
        }, {
            od: '2012-10-03',
            visits: 820
        }, {
            od: '2012-10-04',
            visits: 839
        }, {
            od: '2012-10-05',
            visits: 792
        }, {
            od: '2012-10-06',
            visits: 859
        }, {
            od: '2012-10-07',
            visits: 790
        }, {
            od: '2012-10-08',
            visits: 1680
        }, {
            od: '2012-10-09',
            visits: 1592
        }, {
            od: '2012-10-10',
            visits: 1420
        }]; //Close overdueTicketData variable

        if(overdueTicketData){
            // The name of the data record attribute that contains x-visitss.
            new Morris.Line({

                element: 'overdueTicketChart',
                data:     overdueTicketData,
                xkey: 'od',
                ykeys: ['visits'],
                labels: ['Visits'],
                smooth: false,
                resize: true
            });
        }

    } //close drawOverdueTicket function
    drawOverdueTicket();

}); //Close overdueTicketChart onRendered Template

//6. METHOD RECEIVED - see methodReceived.js