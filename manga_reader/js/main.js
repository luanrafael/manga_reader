$(document).ready(function(){

	$(".button-collapse").sideNav();
	
	Reader = Reader();
	Reader.set_element($('#img_show'));
	Reader.get_chapters('5538baf1719a16856219a34d',$('.chapters'));

	$('.chapters').on('change',function () {
		var chapter_id = $(this).val();
		Reader.get_pages(chapter_id);
    });

    $(document).keydown(function(event) {
		switch(event.keyCode){
	  		case 37:
	  			$('.page_previus_next.left').trigger('click');
	  			break;
	  		case 39:
	  			$('.page_previus_next.right').trigger('click');
	  			break;
	  		default:
	  			return false;
	  	}

	});

    
	$('#img_show').ready(function(){
		$('.page_previus_next').height($('#img_show').height());
		$('.page_previus_next').removeClass('hide');
	});


	//Change page
	$('.page_previus_next').on('click',function(){
		if($(this).hasClass('left')){
			Reader.previus_page($('#img_show'));
		}

		if($(this).hasClass('right')){
			Reader.next_page($('#img_show'));
		}

	});

	var hammerInstance = new Hammer(document.getElementById('img_show'));
	
	hammerInstance.on('swipe', function(ev) {
	    
		if(ev.direction == Hammer.DIRECTION_LEFT){
			Reader.next_page();
		}

		if(ev.direction == Hammer.DIRECTION_RIGHT){
			Reader.previus_page();
		}
	});

	var hammerInstance2 = new Hammer(document.getElementById('img_show_2'));
	
	hammerInstance2.on('swipe', function(ev) {
	    
		if(ev.direction == Hammer.DIRECTION_LEFT){
			Reader.next_page();
		}

		if(ev.direction == Hammer.DIRECTION_RIGHT){
			Reader.previus_page();
		}
	});

	$( window ).resize(function() {
		if($('.hide-on-med-and-up').is(':visible')){
			reader.set_element($('#img_show_2'))
		} else {
			reader.set_element($('#img_show'))
		}
	});

});





