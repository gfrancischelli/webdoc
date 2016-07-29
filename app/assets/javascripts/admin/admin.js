
$(document).ready(ready)
$(document).on('page:load', ready)

function ready() {
	console.log('admin js')
	$('.show-posts-index').on('click', function() {
		fadePosts()
		$(this).parent().parent().children('.posts-index').fadeIn();
	})	
	$('.show-maps-index').on('click', function() {
		fadePosts();
		$(this).parent().parent().children('.maps-index').fadeIn();
	})

	function fadePosts()  {
		$('.posts-index').fadeOut();
		$('.maps-index').fadeOut();
	}
}