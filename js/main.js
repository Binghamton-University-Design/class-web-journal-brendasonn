function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

$(document).ready(function() {

	$(".thumb").click(function() {

		var e = $('.thumb').index(this);
		var me = $(this);
		var nex = $(this).next();

		$( ".overlay-holder .overlay .body" ).empty();
		$(".overlay-holder").removeClass('active');
		$(".overlay-holder").addClass('hidden');
		$(".overlay").removeClass('overlay-even');
		$(".overlay").removeClass('overlay-odd');

		$(this).find(".body").clone(true, true).contents().appendTo('.overlay-holder .overlay .body');

		if(isEven(e)){
			$(".overlay-holder").insertAfter(nex);
			$(".overlay").addClass('overlay-even');
		}else{
			$(".overlay-holder").insertAfter(me);
			$(".overlay").addClass('overlay-odd');
		}

		$(".overlay-holder").toggleClass('active hidden');

		//window.scrollTo({top: 0, behavior: 'smooth'});
		$('html,body').animate({
        scrollTop: $(".overlay-holder").offset().top-100},
        'slow');

	});

	$("#close").click(function() {

		$( ".overlay-holder .overlay .body" ).empty();

		$(".overlay-holder").removeClass('active');
		$(".overlay-holder").addClass('hidden');

	});

});