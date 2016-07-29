function WebdocMap() {
    var name = 'romualdo';
    var map_posts = {}; // fetch(/map_posts.json)
    const map_coordinates = { lat: -22.373416, lng: -48.412382 };

    function init() {
    	console.log('iMap.init()');
    	fetch('/map_posts.json')
    	.then(function(response) { return response.json(); })
    	.then(function(map_posts_json) {
    		map_posts = map_posts_json;
    	    mapGen();
    		marksGen();
    	});
    }

    function mapGen() {
    	map = new google.maps.Map(document.getElementById('map-embed'), {
    	  zoom: 7,
    	  center: map_coordinates,
    	  mapTypeId: google.maps.MapTypeId.HYBRID,
    	  scrollwheel: false,
    	});

    	google.maps.event.addDomListener(window, "resize", function() {
    	  let center = map.getCenter();
    	  google.maps.event.trigger(map, "resize");
    	  map.setCenter(center);
    	});
    }

    //  For each post in map_post
    //  create and store a new Google Maps Marker
    function marksGen() { 
    	map_posts.forEach(function(point) {
    		const this_point = point;
    		this_point.mark = new google.maps.Marker({
    		  position: point.coordinates,
    		  title: point.title,
    		  map: map,
    		});

    		this_point.mark.addListener('click', function() {
    			console.log('//updatemapmenu')
    			updateMapMenu(this_point);
    		});
    	})
    }

    function updateMapMenu(post) {
    	$('#markTitle').text(post.title);
        $('#markContent').html(post.content);
    	$('#markCover').attr('src', post.cover);
    	$('.js-watch')
    		.attr({
    		  "data-fade-in":   post.fade_in,
    		  "data-video-id":  post.id,
    		  "data-video-url": post.url,
    		}); 

    	$('#mapInfoDisplay *:hidden').hide().removeClass('hidden').fadeIn(650);
    };

    return { 
    	init: init
    }
}

