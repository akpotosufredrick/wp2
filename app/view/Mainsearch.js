Ext.define("Wickelplaetze.view.Mainsearch", {
    extend: 'Ext.navigation.View',
    xtype: 'mainsearch',
    requires: [
        'Wickelplaetze.view.Search'
    ],

    config: {
		/*navigationBar: {
            items: [
                {
					xtype:'button',
					iconCls:'search1',
					align:'right', 
					itemId:'callsearch',
					ui: 'plain',
					iconMask: true
                }
            ]
        },*/
		
		store: 'placesstore',
		useTitleAsBackText: false,
		defaultBackButtonText: 'Zur&uuml;ck',
		autoDestroy: true,
        items: [
            {
                xtype: 'search'
            }
        ]
    }

});