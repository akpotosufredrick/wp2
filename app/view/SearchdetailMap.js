Ext.define("Wickelplaetze.view.SearchdetailMap", {
    extend: 'Ext.Panel',
	xtype: 'sdmap',
		
	config:  {
	layout:'card',
	autoDestroy: false,
    items: [
      {
        xtype: 'map',
		useCurrentLocation: false,
        mapOptions: {
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          navigationControl: true,
          navigationControlOptions: {
            style: google.maps.NavigationControlStyle.DEFAULT
          }
        },
		store:'locationsstore',
        listeners: {
			maprender: function(extMapComponent, googleMapComponent) {
				var geocoder = new google.maps.Geocoder();
				var geo = Ext.create('Ext.util.Geolocation', {
							autoUpdate: true
				});

				var map = this.getMap();
				var markerArray = [];
				var size2 = new google.maps.Size(21 , 36);
				var address = document.getElementById('loclist-address').textContent;
				var lat = document.getElementById('loclist-lat').textContent;
				var lon = document.getElementById('loclist-lon').textContent;
				var mymap = this.getMap();
				//function(){
				mymap.setCenter(new google.maps.LatLng(geo.getLatitude(), geo.getLongitude()));
				geocoder.geocode({ 'address': address }, function(results, status) {
				  if (status == google.maps.GeocoderStatus.OK) {
					  //extMapComponent.setMapCenter(results[0].geometry.location);
					  var directionDisplay;
					  var directionsService = new google.maps.DirectionsService();
				
					  function initialize() {
						var rendererOptions = {
							map: map,
						  	suppressMarkers : true,
							polylineOptions:{
								strokeColor:'#5079DD',
								strokeWeight: 4
								
							}
						}
						directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
					  }
					  initialize();
					  function calcRoute() {
						  // First, remove any existing markers from the map.
						for (i = 0; i < markerArray.length; i++) {
						  markerArray[i].setMap(null);
						}
					
						// Now, clear the array itself.
						markerArray = [];
						var start = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
						var end = new google.maps.LatLng(lat,lon);
						// get the selected travel mode
						var travelmode = "laufen";
						if (travelmode == "fahren" || travelmode != "laufen")
						   travel = google.maps.DirectionsTravelMode.DRIVING;
						else if (travelmode == "laufen")
						   travel = google.maps.DirectionsTravelMode.WALKING;
						// find and show route between the points

						var request = {
							origin:start,
							destination:end,
							travelMode: travel
						};
						directionsService.route(request, function(response, status) {
						  if (status == google.maps.DirectionsStatus.OK) {
							directionsDisplay.setDirections(response);
							showSteps(response);
						  }
						});
						function showSteps(directionResult) {
							  var myRoute = directionResult.routes[0].legs[0];
							  for (var i = 0; i < myRoute.steps.length; i++) {
								  var icon = "resources/images/1px.png";
							  if (i == 0) {
								//Icon as start position
								icon = new google.maps.MarkerImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAkCAYAAABmMXGeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmlJREFUeNqslk9IFVEYxa9jplgLwcQQaSeRixaRgYto0UIXivsE3UiLCiKkRYIktBEMsigpCBcuAjfCQwwKRERwERFiSC5s8bAChXam+CRf58iZ+Jpm3vx5Hvgx787c7zdvZu7cuRWf3ZALSTW4DrrBFdAEqsAB+AE+gFkwD/aDxSdChFfBI229kONnwSVwEyyBYW0jpXfAGKhR+xf4CL6An6AeXACXwSlwDbwH98HzMOld8ARUqP1G7VVQMP1OgovgHrihP/AMVIKnzlwe79+ohLxHt0Gv/mUhcDUF7e9Vv33VjcpzJOWZHppLfgAmXLJMqL+zHko79FCYd2Dcpcu46vyH3EFpl+nwEhRTSouq89NFaZsaebDismVF9UwbpY1qfAfbGaXbqmcaPQ0F5jc4zCg9VD1T6Zl7eAbUZZTWqf7oHlO6o8Z50JJR2qJ6ZofSLTX4uy+jtM+8SFueeWpMP+hMKexUnZ88pWtmB6e3V6A9obBd/avMvjUvZGyeAzm917URslodz6n/P2OWs9Q6+AaazYEGTWW3VLiqB3paM1QPaA05GT3rlG5I3BzSqTWiOCr0bPhPbMEdTxbsfPpW359yciDPXylHwHKZ0mV/JHnmLDNlSmf8q7VfyzmwmVG4qXoXlH61B1JmTvX/SZnXIR+6uBRU56KknzTY0ySnukgp59YXYC+hcE/9i6WkzKLWSUkyq/4uTuq09NmNEe6qn0sq5QpkMkY6qX6JpczjwARuk9dxl1bKwpGIYyMlTlhSykyB6cC+ae13WaX8ng9qknbaDsatD7wEw4YrjwG9igNmJRKZPwIMAI0eipslD3gdAAAAAElFTkSuQmCC", size2)
							  }
							  var marker = new google.maps.Marker({
								position: myRoute.steps[i].start_point, 
								map: map,
								icon: icon
							  });
							  //attachInstructionText(marker, myRoute.steps[i].instructions);
							  markerArray.push(marker);
							}
							//Icon as end position
							var marker = new google.maps.Marker({
							  position: myRoute.steps[i - 1].end_point, 
							  map: map,
							  icon: new google.maps.MarkerImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAkCAYAAABmMXGeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmlJREFUeNqslk9IFVEYxa9jplgLwcQQaSeRixaRgYto0UIXivsE3UiLCiKkRYIktBEMsigpCBcuAjfCQwwKRERwERFiSC5s8bAChXam+CRf58iZ+Jpm3vx5Hvgx787c7zdvZu7cuRWf3ZALSTW4DrrBFdAEqsAB+AE+gFkwD/aDxSdChFfBI229kONnwSVwEyyBYW0jpXfAGKhR+xf4CL6An6AeXACXwSlwDbwH98HzMOld8ARUqP1G7VVQMP1OgovgHrihP/AMVIKnzlwe79+ohLxHt0Gv/mUhcDUF7e9Vv33VjcpzJOWZHppLfgAmXLJMqL+zHko79FCYd2Dcpcu46vyH3EFpl+nwEhRTSouq89NFaZsaebDismVF9UwbpY1qfAfbGaXbqmcaPQ0F5jc4zCg9VD1T6Zl7eAbUZZTWqf7oHlO6o8Z50JJR2qJ6ZofSLTX4uy+jtM+8SFueeWpMP+hMKexUnZ88pWtmB6e3V6A9obBd/avMvjUvZGyeAzm917URslodz6n/P2OWs9Q6+AaazYEGTWW3VLiqB3paM1QPaA05GT3rlG5I3BzSqTWiOCr0bPhPbMEdTxbsfPpW359yciDPXylHwHKZ0mV/JHnmLDNlSmf8q7VfyzmwmVG4qXoXlH61B1JmTvX/SZnXIR+6uBRU56KknzTY0ySnukgp59YXYC+hcE/9i6WkzKLWSUkyq/4uTuq09NmNEe6qn0sq5QpkMkY6qX6JpczjwARuk9dxl1bKwpGIYyMlTlhSykyB6cC+ae13WaX8ng9qknbaDsatD7wEw4YrjwG9igNmJRKZPwIMAI0eipslD3gdAAAAAElFTkSuQmCC", size2)
							});
						}
						/*function attachInstructionText(marker, text) {
							google.maps.event.addListener(marker, 'click', function() {
							  // Open an info window when the marker is clicked on,
							  // containing the text of the step.
							  stepDisplay.setContent(text);
							  stepDisplay.open(mapCanvas, marker);
							});
					  }*/
					  }					  
					  
						function cRoute(){
						calcRoute();
						}
						cRoute();
					}
				});
				//}
			}
		}
	  }
	]
  }
});