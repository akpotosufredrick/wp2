Ext.define("Wickelplaetze.view.Searchdetail", {
    extend: 'Ext.Panel',
    xtype: 'searchdetail',

	
	config: {
		layout: 'vbox',
		cls: 'searchdetail',
		store: 'locationsstore',
		record: 'location',
		styleHtmlContent: true,
		autoDestroy: true,
		tpl: [
				'<div class="locdetail">',
				'<div class="loclistdata">',
				'<h2 id="loclist-locName">{locName}</h2>',
				'<span id="loclist-address">{address}, {plz}, {ort}</span><br/>',
				'<span id="loclist-km">{[setTimeout( function () {getDistance( { success: function( destination, km ) { document.getElementById("loclist-km").innerHTML=(km)},error: function( status ) { console.log( "ERROR: " + status )} } )},500)]}</span>',
				//Rating
				'<div class="srtgs" id="rt_{lat}_{lon}"></div>',
				//Rating
				'<span id="loclist-lat" style="display:none;">{lat}</span>',
				'<span id="loclist-lon" style="display:none;">{lon}</span>',				
				'</div>',
				'</div>'
		],
		items: [
			{
				xtype: 'button',
				top: 30,
				itemId: 'addtofav',
				right: 20,
				iconCls: 'favorites',
				ui: 'plain',
				iconMask: true
			}	
		],
		//Rating JS
		listeners:{
			painted: function(){
				setTimeout("getRtgsElm()", 100);
			}
		}
    }

});