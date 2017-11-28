Ext.define('Wickelplaetze.store.Favorites', {
    extend: 'Ext.data.Store',
    requires: 'Wickelplaetze.model.Favorites',

    config: {
        model: 'Wickelplaetze.model.Favorites',
		storeId: 'favoritesstore',
		clearOnPageLoad: false,
		destroyRemovedRecords: false,
		grouper: {
                    groupFn: function(record) {
                    //console.log(record.get("ort"));
                    if(record.get("ort")!= null){
                    return record.get('ort')[0];
					}
            }
        },
		proxy: {
            type: 'localstorage',
			itemId: 'favorite-locations'
        },
		autoLoad: true
    }
});