/*
 
My appologies in advance for not being able to refactor this code. Ran out of time.
Should you have any questions about backend.js, pages.html, routes.js - please don't hesitate to contact me @: 
mr.ear84@gmail.com  
Regards, Eliot
Eliot Allan Rodriguez
*/


//A. 
Template.backEnd.helpers({

    //1. LISTDEPT
  'listDept': function(department){
    var currDept = department;
    Session.set('currDept', currDept);
  },


 //SHOW METHODS (GETS)
   //3. showOpenTickets
    'showOpenTickets': function(){
      var checkCode = Session.get('checkCode');

         if(checkCode == 1)
        {
            var currData = Session.get('apiData');
            return currData.length;
        }
     },
    
    'showOpenIssueCount': function(){
      var currCount = Session.get('issueCount');
      return currCount;
     },
     
    'showOpenIssueType': function(){
      var currIssues = Session.get('issueTypes');
      return currIssues;
     },

    'showOpenOverdue': function(){
      var currOverdue = Session.get('overdueTotal');
      return currOverdue;
    },










    //2. DEPTCALL
    'deptCall': function(makeCall){
       var currStats = makeCall;
        Session.set('checkCode', 0); // don't perform any code work below

        if(currStats) // if we go to a new department page.
        {
            Session.set('totalOpenTicket', "");

            var currDept = Session.get('currDept');  
           // console.log('22. calling for:' + currDept);        
           if(currDept == "Public_Works")
           {
            HTTP.call( 'GET', "https://opendata.miamidade.gov/resource/dj6j-qg5t.json", {
            params: {
                      "case_owner": "Public_Works_Mosquito_Control-8-60", 
                      "ticket_status": "OPEN",
                       "$limit": 50000
                    }, //close params 
                   }//close http call
            , function( error, response ) 
            {      
            if ( error ) 
              {
                console.log( error );
              } 
            else 
              {
                Session.set('apiData', response.data);
                Session.set('checkCode', 1); 
              }
            });  
        }
         else
        {
            HTTP.call( 'GET', 'https://opendata.miamidade.gov/resource/dj6j-qg5t.json', {
            params: {
                      "case_owner": currDept, 
                       "ticket_status": "open",
                       "$limit": 50000
                    }, 
             }
        , function( error, response ) 
        {
            if ( error ) 
            {
                console.log( error );
            } 
            else 
            {
              Session.set('apiData', response.data);
              Session.set('checkCode', 1); // data retrieved. Perform code work below!


            }
        });     
        } 
      }
    },


    //4. Open Issue Type
    'openIssueType': function(){
     var checkCode = Session.get('checkCode') ;
     var mReceived = [];
     var mSortedCount = [];
     var issueTypes = null;

     if(checkCode == 1)
     {
        currData = Session.get('apiData');
        //Find All Issues    
               $.each(currData, function(index){
                $.each(currData[index], function(key, value){
                    if(key == "issue_type")
                    {
                     mReceived[index] = value;
                    }
                   });
                 });

 //FIND How many per issue
 mReceived.sort(); //put all of the same together in alphabetical order


var cntindex = 0;
var cntNumber = 0;


//Find counts for all items
for (var i=0; i < mReceived.length; i++)
{
   //if we are not beginning
    if(cntNumber > 0)
    {
       //if issue is not equal to current array list
       if(mReceived[i] != mSortedCount[cntindex][0])
       {
        //define a new array index
          mSortedCount[cntindex + 1] = [];

       //move up to a new array list
       cntindex = cntindex + 1;
       //give that new array list a new issue name
       mSortedCount[cntindex][0] = mReceived[i];

       //reset the count number 
       cntNumber = 1;
      //add new count number to the incidents
       mSortedCount[cntindex][1] = cntNumber;
       } 

       else
       { //same issue add 1 to that issue count
        cntNumber = cntNumber + 1;
        mSortedCount[cntindex][1] = cntNumber;
       }
    }

    else
    {
      //define a new array index
      mSortedCount[0] = [];
      //first time we do the loop go here to initialize
    mSortedCount[cntindex][0] = mReceived[i];

    cntNumber = 1;
    mSortedCount[cntindex][1] = cntNumber;
    }
}

Session.set('issueCount', mSortedCount.length);

mSortedCount.sort(function(a, b)
{
    return b[1] - a[1];
});


var issueCount = mReceived.length;

Session.set('issueTypes', mSortedCount);

        }
     },


    'openOverdue': function(){
        var checkCode = Session.get('checkCode') ;

        if(checkCode == 1)
        {
         var currData = Session.get('apiData');
         var findTotal = 0;
         var issueType;
         var issueID;
         var overdueIssues = [];
         var mSortedCount = [];
  

        Session.set('totalOverdue', "");

  

            //Iterate through the response
            $.each(currData, function(index){
               //count each new object
               var checkDate;
               var nowDate;
               var goalDay;
             

                $.each(currData[index], function(key, value){
                    //if the value is a timestamp

                if(key == "ticket_id")
                {
                  issueID = value;
                } 

                  if(key == "goal_days")
                {
                    goalDay = value; //test
                }

                if(key == "issue_type")
                {
                  issueType = value;
                }
              

                if(key == "ticket_created_date_time")
                {
                        //Set the specific date and the current date
                    var checkDate = moment(value, moment.ISO_8601);
                    var nowDate = moment();

                    //Verify the number of days that have passed on overdue ticket
                    checkDate = nowDate.diff(checkDate, 'days');
                      if (goalDay < checkDate)
                    {                 
                        overdueIssues[findTotal] = [];  //initiate new index
                        overdueIssues[findTotal] = issueType; //attach the issue type
                        findTotal = findTotal + 1;
                    }
                }  
                   });

                 });  

                  overdueIssues.sort();

if(findTotal == 0) // no overdue found
{
  mSortedCount[0] = [];
  mSortedCount[0] = 'noOverdue';
  Session.set('overDueInfo', mSortedCount);
}
else
{
      
//FIND COUNTS FOR EACH ISSUE
var cntindex = 0;
var cntNumber = 0;

for (var i=0; i < overdueIssues.length; i++)
{
   //if we are not beginning
    if(cntNumber > 0)
    {
       //if issue is not equal to current array list
       if(overdueIssues[i] != mSortedCount[cntindex][0])
       {
        //define a new array index
          mSortedCount[cntindex + 1] = [];

       //move up to a new array list
       cntindex = cntindex + 1;
       //give that new array list a new issue name
       mSortedCount[cntindex][0] = overdueIssues[i];

       //reset the count number 
       cntNumber = 1;
      //add new count number to the incidents
       mSortedCount[cntindex][1] = cntNumber;
       } //if

       else
       { //same issue add 1 to that issue count
        cntNumber = cntNumber + 1;
        mSortedCount[cntindex][1] = cntNumber;
       }
    }//if

    else
    {
      //define a new array index
      mSortedCount[0] = [];
      //first time we do the loop go here to initialize
    mSortedCount[cntindex][0] = overdueIssues[i];

    cntNumber = 1;
    mSortedCount[cntindex][1] = cntNumber;
    }
}//for

//SORT ALL ISSUES FROM GREATEST TO LEAST 
mSortedCount.sort(function(a, b)
{
    return b[1] - a[1];
});

//SET SESSION VARIABLE TO HOLD OVERDUE SORTED BY ISSUE AND COUNT
Session.set('overDueInfo', mSortedCount);
Session.set('overdueTotal', overdueIssues.length);

 }     
} 

}, 


'findPercents': function(){ 
  var checkCode = Session.get('checkCode') ;
  var overdueInfo = Session.get('overDueInfo');
  var openInfo = Session.get('issueTypes');
  var currData = Session.get('apiData');
  var openOverFinalData = [];

if(checkCode == 1)
  {
    if(overdueInfo != 'noOverdue')
    {
   
        for(var x=0; x < openInfo.length; x++)
        {                      
         openOverFinalData[x] = [];
         openOverFinalData[x][0] = openInfo[x][0];


             for(var y=0; y < overdueInfo.length; y++)
               {
                //IF - ISSUE MATCHES ONE OF THE LIST OF OVERDUE ISSUES
                 if(openInfo[x][0] == overdueInfo[y][0]) //openInfo[x][0]
                 {


                   var openCalculate = 0;
                   openCalculate = openInfo[x][1] - overdueInfo[y][1];//y //find amount actually open
            
                    //Set Total Open
                    openOverFinalData[x][1] = [];
                    openOverFinalData[x][1] = openCalculate;

                    //initiate variables for calculation
                    var openSum = 0;
                    var overdueSum = 0;

                       // IF //OVERDUE ISSUES EQUAL TO THE OPEN TOTAL
                       //if the values are the same for open and overdue make overdue = to open
                       if(openInfo[x][1] == overdueInfo[y][1])
                        {

                         //Set Total Overdue
                         openOverFinalData[x][2] = [];
                         openOverFinalData[x][2] = overdueInfo[y][1];//

                         openSum = ((openInfo[x][1]/currData.length) * 100);
                         overdueSum = ((overdueInfo[y][1]/currData.length) * 100);

                          //Set Percent Overdue
                          openOverFinalData[x][3] = [];
                          openOverFinalData[x][3] = 'width:' + overdueSum + '%';

                          openSum = 0;
                          //Set Percent Open
                          openOverFinalData[x][4] = [];
                          openOverFinalData[x][4] = 'width:' + openSum + '%';


                         openOverFinalData[x][5] = [];
                         openOverFinalData[x][5] = 'Open: ' + overdueInfo[y][1];

                             openOverFinalData[x][6] = [];
                             openOverFinalData[x][6] = 'Overdue: ' +  openOverFinalData[x][2];

                             
                               openOverFinalData[x][7] = [];
                               openOverFinalData[x][7] = overdueInfo[y][1];

                           
                        } 


                   
                        else //OVERDUE ISSUES LESS THAN OPEN TICKET TOTAL
                        {

                          if(overdueInfo[y][1] < openOverFinalData[x][1])
                          {
                       
                           
                           var openCalculate = 0;
                           var overdueCalculate = 0;
                           //else find the percentage values for overdue and open
          

                           openCalculate = openInfo[x][1] - overdueInfo[y][1]; //find amount actually open

       
                           openSum = ((openCalculate/currData.length) * 100);

                           overdueSum = ((overdueInfo[y][1]/currData.length) * 100);
          
                           //Set Total Open
                           openOverFinalData[x][1] = [];
                           openOverFinalData[x][1] = openInfo[y][1];


                           //Set Total Overdue
                           openOverFinalData[x][2] = [];
                           openOverFinalData[x][2] =  overdueInfo[y][1];

                           //Set Percent Overdue
                           openOverFinalData[x][3] = [];
                           openOverFinalData[x][3] = 'width:' + overdueSum + '%';
                           // console.log('2. Overdue percent: ' + openOverFinalData[x][3]);

                           //Set Percent Open
                           openOverFinalData[x][4] = [];
                           openOverFinalData[x][4] = 'width:' + openSum + '%';

                           openOverFinalData[x][5] = [];
                           openOverFinalData[x][5] = 'Open: ' + openInfo[y][1];

                             openOverFinalData[x][6] = [];
                             openOverFinalData[x][6] = 'Overdue: ' +  openOverFinalData[x][2];

                               openOverFinalData[x][7] = [];
                               openOverFinalData[x][7] = openInfo[y][1];
                           }
                           else
                           {
                            openOverFinalData[x] = [];
                            openOverFinalData[x][0] = openInfo[x][0];

                             //Set Total Open
                             openOverFinalData[x][1] = [];
                             openOverFinalData[x][1] = openInfo[x][1];

                             openOverFinalData[x][2] = [];
                             openOverFinalData[x][2] = 0;

                              //THERE IS NO OVERDUE SET OVERDUE PERCENT TOTAL TO 0
                             openOverFinalData[x][3] = [];
                             openOverFinalData[x][3] = 'width:' + 0 + '%';

                            //SET PERCENT OF TOTAL OPEN
                            openSum = ((openInfo[x][1]/currData.length) * 100);
                           openOverFinalData[x][4] = [];
                           openOverFinalData[x][4] =  'width:' + openSum + '%';

                            openOverFinalData[x][5] = [];
                            openOverFinalData[x][5] = 'Open: ' + openInfo[x][1];

                             openOverFinalData[x][6] = [];
                             openOverFinalData[x][6] = 'Overdue: ' +  openOverFinalData[x][2];

                               openOverFinalData[x][7] = [];
                               openOverFinalData[x][7] = openInfo[x][1];
                           }

                           
                        } 

                  }  
                 
              } 

        } 

    } 
        else
       { 

       if(overdueInfo == 'noOverdue')
       {
        var openCalculate = 0;
        var openSum = 0;

             for(var x=0; x < openInfo.length; x++)
             {         
  
                       //Set Total Open
                            openOverFinalData[x] = [];
                            openOverFinalData[x][0] = openInfo[x][0];

                             openOverFinalData[x][1] = [];
                             openOverFinalData[x][1] = openInfo[x][1];


                            openOverFinalData[x][3] = [];
                            openOverFinalData[x][3] = 'width:' + 0 + '%';

                          openSum = ((openInfo[x][1]/currData.length) * 100);
                          openOverFinalData[x][4] = [];
                          openOverFinalData[x][4] =  'width:' + openSum + '%';

                             openOverFinalData[x][5] = [];
                             openOverFinalData[x][5] = 'Open: ' + openInfo[x][1];

                             openOverFinalData[x][6] = [];
                             openOverFinalData[x][6] = 'Overdue: ' +  openOverFinalData[x][2];

                               openOverFinalData[x][7] = [];
                               openOverFinalData[x][7] = openInfo[x][1];

              }
                           Session.set('dataShow', openOverFinalData);

         } 

       Session.set('dataShow', openOverFinalData);
     

    } 

       Session.set('dataShow', openOverFinalData);


}
}, 

'addOpenIssues':function(){
  var checkCode = Session.get('checkCode') ;
  var overdueInfo = Session.get('overDueInfo');
  var openInfo = Session.get('issueTypes');
  var currData = Session.get('apiData');
  var theData = Session.get('dataShow');
  var missing = [];

  if(checkCode == 1)
  {

     for(var i=0; i < theData.length; i++)
     {
      var openCalculate = 0;

       if(theData[i][1] == undefined)
       {

                openCalculate = ((openInfo[i][1]/currData.length) * 100);

                 
                  theData[i][1] = [];
                  theData[i][1] = openInfo[i][1];

                  //Set Total Overdue
                  theData[i][2] = [];
                  theData[i][2] = 0;//

                  theData[i][3] = [];
                  theData[i][3] = 'width:' + 0 + '%';

                  theData[i][4] = [];
                  theData[i][4] = 'width:' + openCalculate + '%';

                  theData[i][5] = [];
                  theData[i][5] = 'Open: ' + openInfo[i][1];

                  theData[i][6] = [];
                  theData[i][6] = 'Overdue: ' + theData[i][2];
                  //infobox
                  theData[i][7] = [];
                  theData[i][7] = openInfo[i][1];
       }
     }


Session.set('finalData', theData);



  } 
  },





'showData': function(){
  var theData = Session.get('finalData');
  var checkCode = Session.get('sendFinal');
  
  return theData;
  
},



'mostRec': function(){
  var checkCode = Session.get('checkCode') ;


if(checkCode == 1)
{


  var theData = Session.get('finalData');

  var recArray = [];




//If the data has less than 4 issue types: 
  if(theData.length < 4)
  {
    for(var i =0; i < theData.length; i++)
    {
      //Label the Issue
      recArray[i] = [];
      recArray[i][0] = theData[i][0];

      recArray[i][1] = [];
      recArray[i][1] = theData[i][7];
    }


  }
  else
  {

    for(var i=0; i < 4; i++)
    {
      recArray[i] = [];
      recArray[i][0] = theData[i][0];

      recArray[i][1] = [];
      recArray[i][1] = theData[i][7];
    }






  }
} 

 return recArray; 
} 
      

}); 