$(document).ready(function() {

	$('.introText').each( function(i){
            
        var bottom_of_object = $(this).offset().top + 200;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
            
        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){
                
            $(this).addClass('fadein');
                    
        }
            
    }); 

    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.introText').each( function(i){
            
            var bottom_of_object = $(this).offset().top + 200;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).addClass('fadein');
                    
            }
            
        }); 
    
    });

    $(".gallery").on('click', function() {
		$(this).parent().children("input:first").val(function(i, oldval) {
    		return parseInt( oldval, 10) + 1;
			});
	});
    
});