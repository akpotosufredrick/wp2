Ext.define("Wickelplaetze.view.Suggestloc",{
	extend: 'Ext.form.Panel',
	xtype: 'suggestloc',
	
	config: {	
		
		styleHtmlcontent: true,
		autoDestroy: true,
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Platz vorschlagen',
				layout: 'fit',
				cls: 'graytoolbar'
			},
			{
				xtype: 'fieldset',
				width: '100%',
				instructions: 'Kennen Sie einen Wickelplatz, den Sie gern teilen wollen?',
				items: [
					{
						xtype: 'textfield',
						name : 'locName',
						label: 'Name',
						required: true,
						id: 'locName'
					},
					{
						xtype: 'textfield',
						name : 'address',
						label: 'Adresse',
						required: true,
						id: 'address'
					},
					{
						xtype: 'numberfield',
						name : 'plz',
						label: 'PLZ',
						required: true,
						id: 'plz'
					},
					{
						xtype: 'textfield',
						name : 'ort',
						label: 'Ort',
						required: true,
						id: 'ort'
					},
					{
						xtype: 'hiddenfield',
						name : 'fullAddress',
						id: 'fullAddress',
						value: ''
					},
					{
						xtype: 'hiddenfield',
						name : 'lat',
						id: 'lat',
						value: ''
					},
					{
						xtype: 'hiddenfield',
						name : 'lon',
						id: 'lon',
						value: ''
					},					
					{
						xtype: 'button',
						ui: 'confirm',
						margin: '10px 10px',
						text: 'Absenden',
						id: 'locSubmit'
					}
				]
			}
		]
	}
});