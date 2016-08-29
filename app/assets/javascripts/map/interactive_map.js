function WebdocMapView() {
    const map_coordinates = { lat: -22.373416, lng: -48.412382 };

    function init() {

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
    function drawMark(post) { 
		mark = new google.maps.Marker({
		  position: post.coordinates,
		  title: post.title,
		  map: map,
		});

        return mark
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
    	init: init,
        mapGen: mapGen,
        drawMark: drawMark,
        updateMapMenu: updateMapMenu,
    }
}

