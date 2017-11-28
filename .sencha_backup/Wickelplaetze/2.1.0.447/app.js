//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'Wickelplaetze': 'app'

});
//</debug>

Ext.application({
    name: 'Wickelplaetze',
	
	viewport: {
		autoMaximize: true
	},

    requires: [
		'Ext.XTemplate',
        'Ext.MessageBox',
		'Ext.ActionSheet',
		'Ext.data.Store',
		'Ext.Map',
		'Ext.data.JsonP',
		'Ext.data.Model',
        'Ext.Ajax',
		'Ext.util.Geolocation',
		'Ext.field.Search',
		'Ext.data.proxy.Ajax',
		'Ext.data.proxy.JsonP',
		'Ext.util.DelayedTask',
		'Ext.TitleBar',
		'Ext.field.Field',
		'Ext.form.FieldSet',
		'Ext.SegmentedButton',
		'Ext.field.Number',
		'Ext.data.proxy.LocalStorage',
		'Ext.data.identifier.Uuid',
		'Ext.field.Hidden',
		'Ext.field.Select',
		'Ext.data.proxy.SQL'
    ],
	
	controllers: [
		'Home',
		'Suggestloc',
		'Search',
		'Indernaehe'
	],
	
	models: [
		'Location',
		'Favorites'
	],
	
	stores: [
		'Locations',
		'Favorites',
		'Places'
	],

    views: [
		'Main',
		'Indernaehe',
		//'Home',
		'Mainsearch',
		'MainsearchFull',
		'Search',
		'FullSearch',
		'Searchdetail',
		'SearchdetailFull',
		'Suggestloc',
		'SearchdetailMap',
		'SearchdetailMapFull',
		'Favorite'
	],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    launch: function() {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Bitte warten..'
        });
        Ext.create('Ext.util.DelayedTask', function() {
            Ext.Viewport.add(Ext.create('Wickelplaetze.view.Main'));
        }).delay(400);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
