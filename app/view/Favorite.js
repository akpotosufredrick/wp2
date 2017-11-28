Ext.define("Wickelplaetze.view.Favorite",{
	extend: 'Ext.List',
    xtype: 'favorite',
	
	requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],

    config: {
        store: 'favoritesstore',
        onItemDisclosure: false,
        disableSelection: true,
		styleHtmlContent: true,
		cls: 'fav',
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Favoriten',
				cls: 'graytoolbar'
			}
		],

        plugins: [
            { 
				xclass: 'Ext.plugin.ListPaging',
				autoPaging: false,
				noMoreRecordsText: 'Kein Wickeltisch mehr vorhanden'  
			}
            /*{
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down to refresh',
				releaseRefreshText:'Release to refresh...',
                refreshFn: function() {             
                  Ext.getStore('favoritesstore').load();
                }
            }*/
        ],

        emptyText: '<p class="no-searches">Keine Wickelpl&auml;tze in Ihre Favoriten</p>',

        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="favloc">',
				'<span class="loclistdata">',
                '<span class="header2">{locName}</span><br>',
				'<span>{address}</span><br>',
				'</span>',
            '</div>'
        )
    }
});