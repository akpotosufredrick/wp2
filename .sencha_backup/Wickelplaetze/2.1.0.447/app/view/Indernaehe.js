Ext.define("Wickelplaetze.view.Indernaehe", {
    extend: 'Ext.Map',
	xtype: 'indernaehe',

    config: {
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Wickel mich'
			}
        ],
		
		useCurrentLocation: false,
		mapOptions: {
			disableDefaultUI: true,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			noClear: true,
			overviewMapControl: true,
			scaleControl: true,
			zoomControl: true
		},
        listeners: [
            {
                fn: 'onMapMaprender',
                event: 'maprender'
            }
        ]
    },

    onMapMaprender: function(map, gmap, options) {
        var store = Ext.getStore('locationsstore');
        var count = store.getCount();
        //debugger;

        store.load({
            scope: this,
            callback: function(records) {
                //debugger;
                this.processlocations(records);
            }
        });

    },
	
    processlocations: function (locationlist) {
        //console.log("hay "+locationlist.length+" elementos");
        for (var i = 0, ln = locationlist.length; i < ln; i++) {
            var location = locationlist[i].data;
            if (location.address && location.ort) {
					this.addMarker(location);
                //console.log("coordenadas? "+i);
            }
        }
    },
	
    addMarker: function(location) {
		var infoWindow = new google.maps.InfoWindow({
			disableAutoPan:true
		});
		var geocoder = new google.maps.Geocoder();
		var geo = Ext.create('Ext.util.Geolocation', {
			autoUpdate: false,
			allowHighAccuracy: true,
			maximumAge: 6000,
			listeners: {
				locationupdate: function(geo) {
					//console.log('New latitude: ' + geo.getLatitude());
				},
				locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
					if(bTimeout){
						Ext.Msg.alert('Timeout occurred.');
					} else {
						Ext.Msg.alert('Error occurred.');
					}
				}
			}
		});
		geo.updateLocation();
		var address = location.address+" "+location.plz+" "+location.ort;
		var lat = location.lat;
		var lon = location.lon;
		var mymap = this.getMap();
		var marker, i;
		var boxText = document.createElement("div");
        boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
                
        var myOptions = {
                 content: boxText
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-100, -90)//(-140, 0)
                ,zIndex: null
                ,boxStyle: { 
                  background: "#5079DD"
				  ,backgroundRepeat: "repeat-x"
                  ,backgroundColor: "#5079DD"
				  ,width: "200px"
				  ,color: "#F1F1F1"
				  ,fontSize: "14px"
				  ,paddingLeft: "5px"
				  ,borderRadius: "5px"
                 }
                ,closeBoxMargin: "10px 2px 2px 2px"
                ,closeBoxURL: "data:image/png;base64,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"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        };
        var ib = new InfoBox(myOptions);
		
		geocoder.geocode({ 'address': address }, function(results, status) {
					mymap.setCenter(new google.maps.LatLng(geo.getLatitude(), geo.getLongitude()));
					var curpomarker = new google.maps.Marker({
						position: new google.maps.LatLng(geo.getLatitude(), geo.getLongitude()),
						map: mymap,
						icon: 'images/scoutgroup.png'
					  });
					marker = new google.maps.Marker({
						map: mymap,
						position: new google.maps.LatLng(lat,lon),
						icon: 'images/nursery.png'
					});
					google.maps.event.addListener(marker, "click", function() {
						ib.close();
						ib.open(this.getMap(), marker, i);
						ib.setContent(location.locName+"<br> "+location.fullAddress);
					});
					google.maps.event.addListener(curpomarker, "click", function() {
						ib.close();
						ib.open(this.getMap(), curpomarker, i);
						ib.setContent('Ihre Standort');
					});
					Ext.Viewport.setMasked(false);
					google.maps.event.addDomListener(boxText,'click',function(){
						alert('clicked!'); 
					});
			
		})
	}
});