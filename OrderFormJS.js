$(document).ready(function() {
	$(".gallery").on('click', function() {
		$(this).parent().children("input:first").val(function(i, oldval) {
    		return parseInt( oldval, 10) + 1;
			});
	});
});