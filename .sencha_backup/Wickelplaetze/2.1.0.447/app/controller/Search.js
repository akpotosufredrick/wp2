Ext.define('Wickelplaetze.controller.Search', {
 extend : 'Ext.app.Controller',
  
 config: {
	 refs: {
            searchLoc: 'search',
			searchLocFull: 'fullsearch',
			main: 'mainsearch',
			mainFull: 'mainsearchfull',
			sd:'searchdetail',
			sdFull: 'searchdetailfull'
        },
        control: {
			/*'search #searchloc': {
                scope: this,
				clearicontap: 'onSearchClearIconTap'//,
				//focus: 'onSearchKeyUp'
            },*/
			'mainsearch #callsearch':{
				tap: 'onGetFullSearch'
			},
			'fullsearch #searchloc': {
                scope: this,
				clearicontap: 'onSearchClearIconTap',
				keyup: 'onSearchKeyUp'
            },
			'search': {
                disclose: 'onListDisclose',
                itemtap: 'onListItemTap'
            },
			'fullsearch': {
                disclose: 'onListDiscloseFull',
                itemtap: 'onListItemTapFull'
            },
			'searchdetail #addtofav': {
				tap: 'onAddToFav'
			}
        }
  	
    },
	init: function(){
		var store = Ext.getStore('placesstore');
		//Ajax request to Server with cors? or something else lol
		var lati;
		var loni;
		navigator.geolocation.getCurrentPosition(callback,fail);
		function callback (position) { 
			lati = position.coords.latitude; 
			loni = position.coords.longitude;
			
			Ext.Ajax.request({
					url : "http://freakp.com/wpapp/connect.php",
					method: 'GET',
					withCredentials: false,
					useDefaultXhrHeader: false,
					params:{
						lati : lati,
						loni : loni
					}
			});
			
			console.log(lati,loni);
		
		} 
		function fail(){Ext.Msg.alert('Ups');}
	},
	/**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     */
    onGetFullSearch: function(field) {
		//redirect to full search
		this.getMain().push({
            xtype: 'fullsearch'
        });
    },
	onSearchKeyUp: function(field) {
        //Ext.Msg.alert('ok');
		//get the store and the value of the field
        var value = field.getValue(),
            store = Ext.getStore('placesstore')

        //first clear any current filters on the store
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];
				
				//My Lop through
				//loop through each of the regular expressions
				if(record.get('ort')&&record.get('plz')&&record.get('address')!= null){
                    for (i = 0; i < regexps.length; i++) {
						var search = regexps[i],
							didMatch = record.get('ort').match(search)||
									   record.get('plz').match(search)||
									   record.get('address').match(search);

						//if it matched the first or last name, push it into the matches array
						matched.push(didMatch);
						setTimeout("getRtgsElm()",150);
					}
				}

                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        Ext.getStore('placesstore').clearFilter();
    },	
	//
	//when taped on list item
	//
	onListDisclose: function(list, record, target, index, e, options) {
        Ext.Viewport.setMasked(true);
		this.getMain().push({
            xtype: 'searchdetail',
            title: record.locName(),
            data: record.getData(),
			flex: 1
        }),
		this.getSd().add(
			{
				xtype: 'sdmap',
				title: 'Map',
				flex: 3
			}
		)
		Ext.Viewport.setMasked(false);
    },

    onListItemTap: function(dataview, index, target, record, e, options) {
        Ext.Viewport.setMasked(true);
		this.getMain().push({
            xtype: 'searchdetail',
            title: record.locName(),
            data: record.getData(),
			flex: 1
        }),
		this.getSd().add(
			{
				xtype: 'sdmap',
				title: 'Map',
				flex: 3
			}
		)
		Ext.Viewport.setMasked(false);
    },
	
	onListDiscloseFull: function(list, record, target, index, e, options) {
        Ext.Viewport.setMasked(true);
		this.getMain().push({
            xtype: 'searchdetailfull',
            title: record.locName(),
            data: record.getData(),
			flex: 1
        }),
		this.getSdFull().add(
			{
				xtype: 'sdmapfull',
				title: 'Map',
				flex: 3
			}
		)
		Ext.Viewport.setMasked(false);
    },

    onListItemTapFull: function(dataview, index, target, record, e, options) {
        Ext.Viewport.setMasked(true);
		this.getMain().push({
            xtype: 'searchdetailfull',
            title: record.locName(),
            data: record.getData(),
			flex: 1
        }),
		this.getSdFull().add(
			{
				xtype: 'sdmapfull',
				title: 'Map',
				flex: 3
			}
		)
		Ext.Viewport.setMasked(false);
    },
	
	onAddToFav: function(dataview, index, target, record, e, options){
		
		var store = Ext.getStore('favoritesstore');
		store.load();
		
		var locName = document.getElementById('loclist-locName').textContent;
		var address = document.getElementById('loclist-address').textContent;
		
		store.add({
			locName: locName,
			address: address
		});
		
		store.sync();
		Ext.Msg.alert('Danke', 'Die Addresse wurde zu Ihre Favoriten Hinzugef&uuml;gt');
	}
});