                $(document).ready(function () {


                    /* The easy way to enable MakeFixed */

                    $('.fixed').makeFixed();

                    /* If you need something more custom, use the callback functions */


                    $('.fixed').makeFixed({
                        onFixed: function (el) {


                            $(el).css({
                                //							
                                top: '50px'
                            });

                        },
                        onUnFixed: function (el) {

                            $(el).css({
                                //							
                                top: '50px'
                            });

                        }
                    });
                        
                });




        //        var q1 = "?case_owner=Animal_Services";

//        window.onload = 
