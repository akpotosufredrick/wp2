var adverts = new Ext.Panel({
                 html: '<iframe src="adverts.html" width="100%" height="48" frameBorder="0" scrolling="no"></iframe>'
});
		
Ext.define("Wickelplaetze.view.Main", {
    extend: 'Ext.tab.Panel',
	xtype: 'mainpanel',
	id: 'mainpanel',
    
    config: {
		iconMask: true,
		cls: 'tabbarbottom',
        dockedItems: [adverts],
		tabBar:{
			layout:{
				pack:'center',
				align:'center'
			},
			docked: 'bottom'
        },
		layout: 'card',
        items: [
			{
				xtype: 'indernaehe',
				iconCls: 'locate1',
				title: 'In der N&auml;he'
			},
			{
				xtype: 'mainsearch',
				iconCls: 'list',
				title: 'Wickel mich'
			},
			{
				xtype: 'favorite',
				title: 'Favoriten',
				iconCls: 'favorites'
			},
			{
				xtype: 'suggestloc',
				iconCls: 'add',
				title: 'Hinzuf&uuml;gen'
			}
        ]
    }
});