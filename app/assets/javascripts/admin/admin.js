$(document).ready(function() {
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
})