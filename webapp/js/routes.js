
//////////////////////////////////////////
//PAGES & SECTIONS

/* 
On this page you will finding a listing of web routes for all pages 
*/

Router.configure({
    layoutTemplate: 'main'
});

// HOME PAGE
Router.route('/', {
    template: 'home',
    name: 'home'
});

Router.route('leafletWork');
Router.route('apiCalls');
Router.route('test');

//////////////////////////////////////////
Router.route('timeline');
Router.route('methodReceived');



Router.route('animalServices', {

		data: function(){
		templateData = {
			callDept: 'Animal_Services',
			title: 'Animal Services',
			makeCall: true	
		}; //close templateData
		return templateData;
	}

});


Router.route('wasteManagement', {

		data: function(){
		templateData = {
			callDept: 'Waste_Management',
			title: 'Waste Management',
			makeCall: true	
		}; 
		return templateData;
	}

}); 


Router.route('communityOutreach', function() {

	this.render('backEnd', {
		data: function(){
		templateData = {
			callDept: 'Community_Information_and_Outreach',
			title: 'Community Outreach',
			makeCall: true	


		}; 
		return templateData;
	}
	});
}); 


Router.route('publicWorks', {
	data: function(){
		templateData = {
			callDept: 'Public_Works',
			title: 'Public Works',
			makeCall: true	
		};
		return templateData;
	}
});


Router.route('raam2793', function() {

	this.render('backEnd', {
		data: function(){
		templateData = {
			callDept: 'RAAM-27-93',
			title: 'RAAM-27-93',
			makeCall: true	
		}; //close templateData
		return templateData;
	}//close data
	});//close this.render
}); //close router.route


Router.route('regulatoryEconRes', function() {

	this.render('backEnd', {
		data: function(){
		templateData = {
			callDept: 'Regulatory_and_Economic_Resources',
			title: 'Regulatory Economic Resources',
			makeCall: true	

		}; //close templateData
		return templateData;
	}//close data
	});//close this.render
}); //close router.route


//NOTES
Router.route('jsonParse');
Router.route('openCount');
Router.route('overDue');
Router.route('dataRoute', {
	data: function(){
		templateData = {
			title: "apple"
		};
		return templateData;
	}
});

Router.route('updatePaging', function(){
	this.render('chartArea');
}); 

Router.route('refactoring');
Router.route('arrayStuff');