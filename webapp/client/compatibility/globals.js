Template.timeline.onRendered(function () {
    issuechange();
});
//some global variables
var latlng;
var map;
var geo = {
    "type": "FeatureCollection",
    "features": []
};
var overdue = false;
var day, month, year;
var marker = new Array();
var cluster;

var api_url;
var q2;
var issues = [], issuetype, issueselected;
var redIcon, blueIcon;
var q1;
var currentRoute;

//        var tickettype = "&$where=ticket_status = \'OPEN\'";
var tickettype = " and ticket_status = \'OPEN\'";
var datestart, dateend, daterange, viewlast;

// Render drop-down forms to screen
function populateDistrictSelect() {
    $('#district').append('<option value="all">All Districts</option>');
    for (var i = 1; i <= 13; i++) {
        var html = '';
        html = '<option value="District ' + i + '">District ' + i;
        if (Session.get("district") != "All Districts") {
            // set active
        }

            + '</option>';
        $('#district').append(html);
    }
    $('.selectpicker').selectpicker();
}

// This is for constructing parameter objects for API call
// Converts session variable so it can be appended to query string
var deptStringToParam = {
    animalServices : 'Animal_Services',
    communityOutreach : 'Community_Information_and_Outreach',
    publicWorks : 'Public_Works',
    raam2793 : 'RAAM-27-93',
    regulatoryEconRes : 'Regulatory_and_Economic_Resources',
    wasteManagement : 'Waste_Management'
};
// This is for displaying the section heading at the top of the screen
dept_names = {
    animalServices : 'Animal Services',
    communityOutreach : 'Community Outreach',
    publicWorks : 'Public Works',
    raam2793 : 'RAAM2793',
    regulatoryEconRes : 'Regulatory & Econ. Resources',
    wasteManagement : 'Waste Management'
};

// 3. QUERIES **************************************
//defaultQueryString = "https://opendata.miamidade.gov/resource/dj6j-qg5t.json";
var defaultQueryString = "https://opendata.miamidade.gov/resource/rbng-6mha.json";

function echoQueryString() {
    var url             = defaultQueryString;
    //var deptString      = Session.get("currDept");
    var deptString      =  Router.current().route.getName(); // Get dept from Router object
    var deptParam       = "?$where=case_owner like \'%25" + deptStringToParam[deptString] + "%25\'";
    var districtParam   = " and neighborhood_district = \'" + Session.get("district") + "\'";
    if (Session.get("district") == "all" || Session.get("district") == "All Districts") {
        districtParam = "";
    }
    // Set date range parameter
    var date = moment().subtract(Session.get("pastNumDays"), 'days').calendar();
    moment().format(date);
    date = moment(date, 'MM-DD-YYYY').format('YYYY-MM-DD'); // Change to SoQL format
    var dateParam = " and ticket_created_date_time >= \'" + date + "\'";
    var ticketStatusParam = " and ticket_status = \'OPEN\' "

    var limitParam = "&$limit=50000";

    url += deptParam;
    url += districtParam;
    url += ticketStatusParam;
    url += dateParam;
    url += limitParam;

    //Session.set("queryString", url);
}




        function handleChange(selector) {
            map.removeLayer(cluster);
            selector2 = selector.value;
            if (selector2 == 'open') {
                overdue = false;
                tickettype = " and ticket_status = \'OPEN\' ";
            } else if (selector2 == 'overdue') {
                overdue = true;
                tickettype = " and ticket_status = \'OPEN\' ";
            } else if (selector2 == 'other') {
                overdue = false;
                tickettype = " and ticket_status != \'CLOSED\' and  ticket_status != \'OPEN\' ";
            }
            console.log(selector2, overdue);
            plotpoints();
            refreshmap();
//            dropdownfill();
        }

        function setRange() {
            map.removeLayer(cluster);
            $('.datebuttons > button').removeClass('active');
            $('.mapButton').removeClass('active');
            datestart = (document.getElementById("datestart").value);
            dateend = (document.getElementById("dateend").value);
            daterange = "and ticket_created_date_time >= \'" + datestart + "\' and ticket_created_date_time <= \'" + dateend + "\'";
            plotpoints();
            refreshmap();
            //dropdownempty();
  //          dropdownfill();
        }


        function setperiod(selector) {
            //            Add styling to buttons
            //$('.datebuttons > button').removeClass('active');
            map.removeLayer(cluster);
            $('.mapButton').removeClass('active');
            
            $(selector).addClass('active');

            var selector2 = selector.value;
            var formatString = 'YYYY-MM-DD';
            dateend = moment().format(formatString);

            if (selector2 == 'day') {
                datestart = moment().subtract('7', 'days').format(formatString);
            } else if (selector2 == 'month') {
                datestart = moment().subtract('30', 'days').format(formatString);
            } else if (selector2 == 'year') {
                datestart = moment().subtract('365', 'days').format(formatString);
            }
            daterange = "and ticket_created_date_time >= \'" + datestart + "\' and ticket_created_date_time <= \'" + dateend + "\'";

            plotpoints();
            refreshmap();
            //dropdownempty();
    //        dropdownfill();
        }

        function issuechange() {

            issueselected = document.getElementById("selectIssue").value;
            issuetype = " and issue_type=\'" + issueselected + "\'";
            plotpoints();
            refreshmap();
        }

        function refreshmap() {
            
            marker = [];
            geo = {
                "type": "FeatureCollection",
                "features": []
            };
            fetchTickets();
        }
    
    function setMap() {
        latlng = L.latLng(25.7853, -80.4089);
        map = L.map('map').setView(latlng, 10);
        L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hldnk5MiIsImEiOiJjaWc4MmRkZDgwYTZxdmVrbzdzdGhmZzc1In0.iyoAmTOVgOSrdcbc7lN_6A', {
            maxZoom: 17,
            minZoom: 9
        }).addTo(map);
        currentRoute = Session.get('currDept'); // Get dept from Router object
        q1 = "?$where=case_owner like \'%25" + Session.get('currDept') + "%25\' ";

        blueIcon = iconFromPNG('blue.png');
        redIcon = iconFromPNG('red.png');                    
        plotpoints();

    }
        function markerWithIcon(marker_icon, info) {
            return new L.marker(geo.features[i].geometry.coordinates, {
                                    icon: marker_icon
                                })
                                .bindPopup(info)
                                .on("mouseover", function (L) {
                                    this.openPopup();
                                })
                                .on("mouseout", function (L) {
                                    this.closePopup();
                                });
        }

        function iconFromPNG(png) {
            return L.icon({
                iconUrl: 'markers/' + png,
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });            
        }
        function populateIssues() {
                        if (issues.indexOf(geo.features[i].properties.type) == -1) {
                            issues.push(geo.features[i].properties.type);
                        }


        }

        function setMarkers() {
           cluster  = new L.MarkerClusterGroup();
           issues = [];
            for (i = 0; i < geo.features.length; i++) {

                    if (geo.features[i] != undefined) {

                        var goalpast = (((new Date()) - (geo.features[i].properties.epoch)) / (1000 * 60 * 60 * 24) - geo.features[i].properties.goal).toString().slice(0, 4);

                        if (issues.indexOf(geo.features[i].properties.type) == -1) {
                            issues.push(geo.features[i].properties.type);
                        }

                        var list;
                        var geomarker;

                        if (overdue == true || (overdue == false && ((new Date()) - (geo.features[i].properties.epoch)) / (1000 * 60 * 60 * 24) > geo.features[i].properties.goal)) {
                            if (((new Date()) - (geo.features[i].properties.epoch)) / (1000 * 60 * 60 * 24) > geo.features[i].properties.goal) {
                                list = "<dd>" + geo.features[i].properties.owner + "</dd>" + "<dd>" + geo.features[i].geometry.coordinates + "</dd>" + "<dd>" + geo.features[i].properties.epoch + "</dd>" + "<dd>" + "Issue Type: " + geo.features[i].properties.type + "</dd>" + "<dd>" + "Goal Days: " + geo.features[i].properties.goal + "</dd>" + "<dd>" + "Days past goal: " + goalpast + "</dd>" + "<dd>" + "Status: " + geo.features[i].properties.status + "</dd>"
                                geomarker = markerWithIcon(redIcon, list);
                                marker.push(geomarker);
                            } 
                        } else {
                            //console.log(geo.features[i].properties.status);
                            list = "<dd>" + geo.features[i].properties.owner + "</dd>" + "<dd>" + geo.features[i].geometry.coordinates + "</dd>" + "<dd>" + geo.features[i].properties.epoch + "</dd>" + "<dd>" + "Issue Type: " + geo.features[i].properties.type + "</dd>" + "<dd>" + "Goal Days: " + geo.features[i].properties.goal + "</dd>" + "<dd>" + "Status: " + geo.features[i].properties.status + "</dd>"
                            geomarker = markerWithIcon(blueIcon, list);
                            marker.push(geomarker);
                        }
                    }
                }

                for (i = 0; i < marker.length; i++) {
                    cluster.addLayer(marker[i]);                  
//                    map.addLayer(marker[i]);
                }
                map.addLayer(cluster);
        }   

        function fetchTickets() {
            $.getJSON(api_url, function (data) {
                $.each(data, function (key, val) {
                    var thedate = new Date(Date.parse(val.ticket_created_date_time))

                    if (val.longitude) {
                        var feature = {
                            "properties": {
                                //"epoch": val.ticket_created_date_time
                                "epoch": thedate,
                                "owner": val.case_owner,
                                "status": val.ticket_status,
                                "goal": val.goal_days,
                                "type": val.issue_type
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [val.latitude, val.longitude, 0]
                            },
                            "type": "Feature"
                        }
                    }
                    geo.features.push(feature);

                });


                setMarkers();

                //alert("done");
                getMethodReceivedData();
            });

        }

        function plotpoints() {
            //            api_url = "https://opendata.miamidade.gov/resource/dj6j-qg5t.json";
            api_url = "https://opendata.miamidade.gov/resource/rbng-6mha.json";

            if ((daterange == undefined || daterange == "and ticket_created_date_time >= '' and ticket_created_date_time <= ''") && (issuetype == undefined || issuetype == " and issue_type='All'")) {
                var formatString = 'YYYY-MM-DD';

                datestart = moment().subtract('365', 'days').format(formatString);
                dateend = moment().format(formatString);

                api_url += q1 + tickettype + "and ticket_created_date_time >= '"+datestart+"' and ticket_created_date_time <= '"+dateend+"'";
            } else if (daterange == undefined || daterange == "and ticket_created_date_time >= '' and ticket_created_date_time <= ''" && issuetype != undefined) {
                api_url += q1 + tickettype + issuetype;
            } else if (daterange != undefined && issuetype == undefined || issuetype == " and issue_type='All'") {
                api_url += q1 + tickettype + daterange;
            } else {
                api_url += q1 + tickettype + daterange + issuetype;
            }

            // Append district to query string
            //var districtSelected = $('#district-select > div > button').attr('title'); // Get district from drop-down
            var districtSelected = Session.get("district");

            if (!(districtSelected == 'All Districts' || districtSelected == 'all')) {
                var districtParam   = " and neighborhood_district = \'" + districtSelected + "\'";
                api_url += districtParam;
            }


            $('#timeline-query-string').text(api_url).attr("href", api_url);
            Session.set("queryString", api_url); // Store query string in global var


            dropdownfill();

        }

        function dropdownempty() {
            var select = document.getElementById("selectIssue");
            var length = select.options.length;
            for (i = 0; i < length; i++) {
                select.options[i].remove();
            }

        }

        function dropdownfill() {
            var select = document.getElementById("selectIssue");
            if (select.options.length > 1) {
   // THIS BREAKS THE MAP REFRESH
   //             select.options.remove();
            }
            var dropdown = document.getElementById("selectIssue");
            dropdown[0] = new Option("All", "All");
            for (var i = 1; i < issues.length; i++) {
                dropdown[dropdown.length] = new Option(issues[i], issues[i]);
            }
        }