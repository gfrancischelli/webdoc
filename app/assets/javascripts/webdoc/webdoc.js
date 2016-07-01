function WebDoc() {

	var episodes
	var map_coordinates = { lat: -22.373416, lng: -48.412382 }

	function init(episodes_url) {	
		fetch('/videos.json').then(function(response) {
			    return response.json();
			  }).then(function(videos_json) {
			    episodes = videos_json;

			    mapGen();
			    marksGen();

			  });
	}

	function mapGen() {
		//  Embed Map
		map = new google.maps.Map(document.getElementById('map-embed'), {
		  zoom: 7,
		  center: map_coordinates,
		  mapTypeId: google.maps.MapTypeId.HYBRID,
		  scrollwheel: false
		});

		//  Responsive Map Resize
		google.maps.event.addDomListener(window, "resize", function() {
		  var center;
		  center = map.getCenter();
		  google.maps.event.trigger(map, "resize");
		  map.setCenter(center);
		});
	}

	function marksGen() { 
		console.log('marksgen')
	}

	return {
		init: init()
	}
}


function initMap() {
	console.log('initMap')
	var cozinha = WebDoc()
	cozinha.init('/videos.json')
}


