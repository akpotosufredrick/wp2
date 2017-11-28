Ext.define('Wickelplaetze.store.Locations', {
    extend: 'Ext.data.Store',
    requires: 'Wickelplaetze.model.Location',

    config: {
        model: 'Wickelplaetze.model.Location',
		clearOnPageLoad: false,
		destroyRemovedRecords: false,
		storeId: 'locationsstore',
		grouper: {
                    groupFn: function(record) {
                    //console.log(record.get("ort"));
                    if(record.get("distance")!= null){
                    return record.get('distance')[0];
					}
            }
        },
		/*proxy: {
            type: 'ajax',
			url: 'http://freakp.com/wpapp/form-data.json',
			withCredentials: false,
			useDefaultXhrHeader: false,
			params:{
				lati : lati,
				loni : loni,
				limit: 13
			}
        },*/
		autoLoad: false,
		listeners: {
			beforeload: function() {
				console.log('Loading Store....');
			}
		}
    }	
});