document.title = "311 Data-Dash";

Session.setDefault("department", ""); // Variable to hold name of current department
Session.setDefault("district", "All Districts"); // Variable to hold name of current department
//Session.setDefault("pastNumDays", "7");// Variable to specify past 7/30/365 days
//Session.setDefault("endDate", moment().format());
//Session.setDefault("startDate", moment().subtract("1", "days").format());
Session.setDefault("queryString", defaultQueryString);// Query string stored in memory

Template.nav.helpers({
    getCurrDept: function () {
        return Session.get("currDept");
    },
    getDepartment: function () {
        var routeName =  Router.current().route.getName();
        return dept_names[routeName];
    },
    getDistrict: function () {
        return Session.get("district");
    },
    getQueryString: function () {
        return Session.get("queryString");
    }
});
Template.sessionDebug.helpers({
    getCurrDept: function () {
        return Session.get("currDept");
    },
    getDepartment: function () {
        var routeName =  Router.current().route.getName();
        return dept_names[routeName];
    },
    getDistrict: function () {
        return Session.get("district");
    },
    getQueryString: function () {
        return Session.get("queryString");
    }
});
Template.timeline.helpers({
    getCurrDept: function () {
        return Session.get("currDept");
    },
    getDepartment: function () {
        var routeName =  Router.current().route.getName();
        return dept_names[routeName];
    },
    getDistrict: function () {
        return Session.get("district");
    },
    getQueryString: function () {
        return Session.get("queryString");
    }
});

Template.mostRequestedBox.events({
    'click #infoBoxBtnView' : function () {
        console.log('info box clicked ');
        $( "#infoBoxBtnView b" ).toggle( "fast" );
        $( "#mostRequestedTogViewAll" ).toggle();
    }
    
});