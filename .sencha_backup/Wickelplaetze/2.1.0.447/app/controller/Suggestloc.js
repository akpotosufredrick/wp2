Ext.define('Wickelplaetze.controller.Suggestloc', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            suggestlocForm: 'suggestloc'
			//fullAdd: 'suggestloc #fullAddress'
        },
        control: {
            'suggestloc #locSubmit': {
                tap: 'doSuggestloc'
            },
			
			'suggestloc #capture': {
				tap: 'onCapture'
			},
			'suggestloc #address': {
				change: 'add_address'
			},
			'suggestloc #plz': {
				change: 'add_address'
			},
			'suggestloc #ort': {
				change: 'add_address'
			},
			'suggestloc #fullAddress': {
				change: 'add_latlon'
			}
        }
    },
	//Add address + plz + ort to fullAddress
	add_address: function(){
		var form   = this.getSuggestlocForm(),
			values = form.getValues();
		var address = values.address;
		var plz = values.plz;
		var ort = values.ort;
		var fullAddress = Ext.getCmp('fullAddress');
		fullAddress.setValue(address+','+plz+','+ort);
	},
	//Add address to fullAddress
	add_latlon: function(){
		var geocoder = new google.maps.Geocoder();
		var form   = this.getSuggestlocForm(),
			values = form.getValues();
		var fullAddress = values.fullAddress;
		var lat = Ext.getCmp('lat');
		var lon = Ext.getCmp('lon');
		geocoder.geocode( { 'address': fullAddress}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
			//Add Lang and Long
			console.log("Geocode was successful: " + status);
			lat.setValue(results[0].geometry.location.lat());
			lon.setValue(results[0].geometry.location.lng());
			
		  } else {
			console.log("Geocode was not successful for the following reason: " + status);
		  }
		});
	},
	
	//Submit Form
	doSuggestloc: function() {
        var form   = this.getSuggestlocForm(),
            //values = JSON.stringify(form.getValues());
			values = form.getValues();
					
		// Mask the form
		form.setMasked({
			xtype: 'loadmask',
			message: 'Bitte Warten...'
		}); 
		//Validate Form
		if (values.locName != '' && values.ort != '' && values.address != '' && values.plz != '' && values.plz.length != 5){
			//Form Submit to Own Server
			Ext.Ajax.request({
					url : "http://freakp.com/wpapp/connect.php",
					params : values,
					method: 'POST',
					withCredentials: false,
					useDefaultXhrHeader: false,
					success: function (result, request){
					Ext.Msg.alert('Danke','Gespeichert!');
					form.unmask();
					form.reset();
					},
					failure: function (result, request){
						Ext.Msg.alert('Sorry', 'Fehler!');
						form.unmask();
					}
			});
		} else{
		Ext.Msg.alert('Fehler','Bitte die Felder mit Sterne ausf&uuml;hlen');
		form.unmask();
		}
    }
});