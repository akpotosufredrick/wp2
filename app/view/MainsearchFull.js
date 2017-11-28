Ext.define("Wickelplaetze.view.MainsearchFull", {
    extend: 'Ext.navigation.View',
    xtype: 'mainsearchfull',
    requires: [
        'Wickelplaetze.view.FullSearch'
    ],

    config: {
		store: 'placesstore',
		useTitleAsBackText: false,
		defaultBackButtonText: 'Zur&uuml;ck',
		autoDestroy: true,
        items: [
            {
                xtype: 'fullsearch'
            }
        ]
    }

});