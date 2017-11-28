Ext.define('Wickelplaetze.model.Favorites', {
	extend: 'Ext.data.Model',
	
	config:{
		identifier: 'uuid',
		fields:[
			{ name: 'locName', type: 'string'},
			{ name: 'address', type: 'string' },
			{ name: 'plz', type: 'string' },
			{ name: 'ort', type: 'string' },
			{ name: 'punkte', type: 'int' },
			{ name: 'fullAddress', type: 'string'}
		]
	}
});