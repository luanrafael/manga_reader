$(document).ready(function(){

	$(".button-collapse").sideNav();
	$('.mangas').material_select();

	Reader = Reader();

	Reader.set_element($('.manga_page'));

	$('select.mangas').on('change',function () {
		var manga_id = $(this).val();
		Reader.get_chapters(manga_id,$('select.chapters'));
    });

	$('select.chapters').on('change',function () {
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

	var hammerInstance = new Hammer(document.getElementById('manga_reader'));
	
	hammerInstance.on('swipe', function(ev) {
	    
		if(ev.direction == Hammer.DIRECTION_LEFT){
			Reader.next_page();
		}

		if(ev.direction == Hammer.DIRECTION_RIGHT){
			Reader.previus_page();
		}
	});

	$('.manga_page').on('load',function(){
		$('.loader').addClass('hide');
		$('.manga_page').removeClass('img_loading');
	});

});



