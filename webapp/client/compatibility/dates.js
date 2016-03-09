

/***********************************************
* Drop Down Date select script- by JavaScriptKit.com
* This notice MUST stay intact for use
* Visit JavaScript Kit at http://www.javascriptkit.com/ for this script and more
***********************************************/

var monthtext=['ALL','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

function populatedropdown(dayfield, monthfield, yearfield){
    var today=new Date()
    var dayfield=document.getElementById(dayfield)
    var monthfield=document.getElementById(monthfield)
    var yearfield=document.getElementById(yearfield)

    //populate day
    dayfield.options[0]=new Option('ALL');

    for (var i=1; i<32; i++) {
        dayfield.options[i]=new Option(i, i)
    }

    //populate month
    for (var m=0; m<13; m++) {
        monthfield.options[m]=new Option(monthtext[m], monthtext[m])
    }

    var thisyear=today.getFullYear()

    //populate for past 5 years
    yearfield.options[0]=new Option('ALL');
    
    for (var y=1; y<6; y++){
        yearfield.options[y]=new Option(thisyear, thisyear)
        thisyear-=1
    }
 
}

