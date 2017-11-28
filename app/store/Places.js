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
		/*proxy: {
            type: 'ajax',
			url: 'http://freakp.com/wpapp/connect.php',
			method: 'GET',
			withCredentials: false,
			useDefaultXhrHeader: false
        },*/
		autoLoad: false,
		listeners: {
			load: function() {
				console.log('Loading Store');
			}
		}
		
    }	
});