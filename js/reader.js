Reader = function(){ return {

	pages : [],
    index : 0,
    chapter_id: 0,
    element: null,

	get_chapters : function (manga_id,element){
		url = 'https://www.mangaeden.com/api/manga/' + manga_id + '/';
		$.ajax({
			url: url,
			success: function(response){
				if(response){
					chapters = response.chapters;
					for (var i = 0; i < chapters.length; i++) {
						element.append(make_option(chapters[i][3],chapters[i][2]))
					};
					element.material_select();
				}
			},
			error: function(e,x,t){
				console.log(e,x,t);
			}
		});
	},


	get_pages : function (chapter_id){
		this.chapter_id = chapter_id;
		url = 'https://www.mangaeden.com/api/chapter/' + chapter_id + '/';
		reader = this;
		$.ajax({
			url: url,
			success: function(response){
				if(response){
					images = response.images;
					reader.pages = [];
					reader.index = 0;
					for (var i = images.length - 1; i >= 0; i--) {
						reader.pages.push('https://cdn.mangaeden.com/mangasimg/' + images[i][1]);
					}

					$(reader.element).attr('src', reader.pages[reader.index]);
				}
			},
			error: function(e,x,t){
				console.log(e,x,t);
			}
		});
	},

	set_element: function(element){
		this.element = element;
		$(this.element).attr('src', this.pages[this.index]);
	},

	previus_page : function() {
		this.index -= 1;
		if(this.index < 0) {
			this.index = 0;
		}
		$(this.element).attr('src', this.pages[this.index]);
	},

	next_page : function() {
		this.index += 1;
		if(this.index > this.pages.length - 1){
			this.index = this.pages.length - 1;
		}
		$(this.element).attr('src', this.pages[this.index]);
	},


} }



function make_option(value,text){
	return $("<option value=" + value +"> " + (text||value) + "</option>");
}
