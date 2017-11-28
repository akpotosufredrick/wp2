Ext.define("Wickelplaetze.view.FullSearch",{
	extend: 'Ext.dataview.List',
    xtype: 'fullsearch',

    config: {
		title: 'Deutschlandweite Suche',
		styleHtmlContent: true,
		layout: 'fit',
		autoDestroy: false,
		listeners: [
            {
                fn: 'painted',
                event: 'painted'
            }
        ],

        items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [
					{ xtype: 'spacer' },
					{
						xtype: 'searchfield',
						placeHolder: 'Ort, Plz oder Adresse...',//try to set it dynamic
						itemId:'searchloc',
						width: '90%',
						styleHtmlContent: true
					},
					{ xtype: 'spacer' }
				],
				cls: 'original-toolbar'
			}
        ],

        store: 'placesstore',
		grouped: false,
        onItemDisclosure: false,
        indexBar: true,
        disableSelection: true,

        emptyText: '<p class="no-searches">Kein Wickelplatz vorhanden</p>',

			itemTpl: new Ext.XTemplate(
				'<div class="loclist">',
					'<span class="loclistdata">',
					'<span class="header2">{locName}</span><br>',
					'<span>{address}</span><br>',
					'<span>{plz}</span>, <span>{ort}</span><br>',
						'<tpl if="distance != undefined">',
							'<span class="loclist-km">ca. {distance}km</small></span><br>',
						'</tpl>',
					//Rating
					'<div class="srtgs" id="rt_{lat}_{lon}" style="height:37px;"></div>',
					//Rating
					'<span style="display:none;">{lat}</span>',
					'<span style="display:none;">{lon}</span>',
					'</span>',
				'</div>',
				{
					compile: true
				}
			)
    },

	painted: function(){
	console.log('Full List Painted');
	//Distance
		var geocoder = new google.maps.Geocoder();
	var geo = Ext.create('Ext.util.Geolocation',{
			autoUpdate: false,
			allowHighAccuracy: true,
			maximumAge: 5000,
	listeners: {
		locationupdate:{
			scope: this,
			fn: function(geo){
				var haversineDistance = function(lat1,lon1,lat2,lon2){
					if(typeof(Number.prototype.toRad)=="undefined"){
							Number.prototype.toRad = function(){
								return this * Math.PI/180;
							}
					}
					var R = 6378.137; // km
					var dLat = (lat2-lat1).toRad();
					var dLon = (lon2-lon1).toRad();
					var lat1 = lat1.toRad();
					var lat2 = lat2.toRad();

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
							Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					var d = R * c;
					// KM or MIles
					//return d*0.621371192; //MIles
					return Math.round(d);
				};
			var store = Ext.getStore('placesstore');
			store.suspendEvents(true);
			store.each(function(location){
				var lat2 = parseFloat(location.get('lat'))||0;
				var lon2 = parseFloat(location.get('lon'))||0;
				if(lat2 && lon2){
					var distance = haversineDistance(geo.getLatitude(),geo.getLongitude(),lat2,lon2);
					location.set('distance',distance);
				}
			}, this);
			store.resumeEvents();
			setTimeout("getRtgsElm()",150);
			store.filter('distance',/\d/);
			store.sort('distance');//check if it is not done or can not be done somewhere else
			this.getScrollable()._scroller.on('scrollend', function() {getRtgsElm()});
		}
	},
		locationerror:{
			scope: this,
			fn:function(geo,bTimeout,bPermissionDenied,bLocationUnavailable,message){
			console.log([geo,bTimeout,bPermissionDenied,bLocationUnavailable,message]);
			if(bTimeout){
				Ext.Msg.alert('Es dauert zu lange<br>um Ihre Standort <br>zu erfahren.');
			}else{
				Ext.Msg.alert('Wir d&uuml;rfen leider<br>Ihre Standort nicht<br>erfahren.');
			}
			}
		}
		}
});
geo.updateLocation();
	}
});