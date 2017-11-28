Ext.define('Babyfood.view.Rezeptmain', {

    extend: 'Ext.navigation.View',
    
	xtype: "rezeptmain",
    
	config: {
        fullscreen: true,
		items: [
			{
				xtype:'rezepte'
			}
		]
        
    }
});