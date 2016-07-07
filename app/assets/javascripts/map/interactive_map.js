function WebdocMap() {

	// Sao Paulo
	const map_coordinates = { lat: -22.373416, lng: -48.412382 };

	// JSON array with ( rb ).MapPost.all.json
	// After marksGen() every post inside map_posts
	// has a mark (google maps mark)
	var map_posts;

	// Episodes_url = Video.all.json
	// Call mapGen() then marksGen()
	function init() {
		fetch('/map_posts.json')
			.then(function(response) { 
				return response.json();
			})
			.then(function(marks_json) {
				map_posts = marks_json;
			    mapGen();
				marksGen();
			});
	}


	//  Embed Map in #map-embed element
	//  Then responsive resize event listener
	function mapGen() {
		map = new google.maps.Map(document.getElementById('map-embed'), {
		  zoom: 7,
		  center: map_coordinates,
		  mapTypeId: google.maps.MapTypeId.HYBRID,
		  scrollwheel: false
		});

		google.maps.event.addDomListener(window, "resize", function() {
		  var center;
		  center = map.getCenter();
		  google.maps.event.trigger(map, "resize");
		  map.setCenter(center);
		});
	}


	//  For each post in map_post
	//  create and store a new Google Maps Marker
	function marksGen() { 
		map_posts.forEach(function(point) {
			var this_point = point;
			this_point.mark = new google.maps.Marker({
			  position: point.coordinates,
			  title: point.title,
			  map: map
			});

			this_point.mark.addListener('click', function() {
				updateMapMenu(this_point);
			});
		})
	}


	function updateMapMenu(post) {
		$('#markTitle').text(post.title);
		$('#markContent').html(post.content);
		$('.js-watch')
			.attr({
			  "data-fade-in":   post.fade_in,
			  "data-video-id":  post.id,
			  "data-video-url": post.url
			}); 

		$('#mapInfoDisplay *:hidden').hide().removeClass('hidden').fadeIn(650);
	};



	const publicApi = {
		init:  init(),
		posts: map_posts
	};

	return { publicApi }
}


//  Called when Google Map CDN is compvare
function initMap() {
	console.log('initMap');
	WebdocMap().init('/videos.json');
};
