Ext.define('Wickelplaetze.model.Location', {
	extend: 'Ext.data.Model',
	
	config:{
		fields:[
			{ name: 'locName', type: 'string'},
			{ name: 'address', type: 'string' },
			{ name: 'plz', type: 'string' },
			{ name: 'ort', type: 'string' },
			{ name: 'punkte', type: 'int' },
			{ name: 'fullAddress', type: 'string'},
			{ name: 'lat', type: 'string' },
			{ name: 'lon', type: 'string' },
			{name: 'distance', type: 'int'}
		],
		
		validations: [
            { type: 'presence', field: 'locName', message: 'Bitte eine Name eingeben' },
            { type: 'presence', field: 'address', message: 'Bitte eine Addresse eingeben' },
			{ type: 'length', field: 'plz', max: 5, message: 'Maximal 5 stellig' }
        ]
	},
	locName: function() {
        var d = this.data,
            names = [
            d.locName
            ];
        return names.join(" ");
    }
});