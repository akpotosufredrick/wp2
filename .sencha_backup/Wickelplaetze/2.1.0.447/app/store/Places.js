Ext.define('Wickelplaetze.store.Places', {
    extend: 'Ext.data.Store',
    requires: 'Wickelplaetze.model.Location',

    config: {
        model: 'Wickelplaetze.model.Location',
		clearOnPageLoad: false,
		remoteFilter:true,
		sortOnFilter:true,
		destroyRemovedRecords: false,
		storeId: 'placesstore',
		grouper: {
                    groupFn: function(record) {
                    //console.log(record.get("ort"));
                    if(record.get("distance")!= null){
                    return record.get('distance')[0];
					}
            }
        },
		proxy: {
            type: 'ajax',
			url: 'http://freakp.com/wpapp/full-data.json',
			withCredentials: false,
			useDefaultXhrHeader: false
        },
		autoLoad: true,
		listeners: {
			load: function() {
				console.log('Loading Store');
			}
		}
		
    }	
});