Ext.define('Wickelplaetze.controller.Home', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
			buttoninfo: 'home #buttninfo'
        },
        control: {
			'home #buttninfo': {
                tap: function(){
					var popup = new Ext.Panel({
						top: 0,
						left: 0,
						centered: true,
						modal: true,
						width: '100%',
						height: '100%',
						styleHtmlContent: true,
						style: 'background: #fff;',
						fullscreen: true,
						html: 'Just a Test Offcourse. <br>This was created by Akpotosu-Nartey, Fredrick <br> Eltern.de <br>FreakP.com',
						items: [{
							xtype:'toolbar',
							title: 'Information',
							docked: 'top',
							items:[
								{
									xtype: 'spacer'
								},
								{
									text:'Close',
									handler: function(){
										popup.hide();
									}
								}
							]
						}]
					})
					Ext.Viewport.add(popup);
					popup.show();
				}
            },
            'home #buttnsearch': {
                tap: function(){
					Ext.getCmp('mainpanel').setActiveItem(1, 'slide')
				}
            },
			'home #buttnfav': {
                tap: function(){
					Ext.getCmp('mainpanel').setActiveItem(2, 'slide')
				}
            },
			'home #buttnvorschlag': {
                tap: function(){
					Ext.getCmp('mainpanel').setActiveItem(3, 'slide')
				}
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
    }
});