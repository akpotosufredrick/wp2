/**
 * app/controller/Portfolio.js
 *
 */
Ext.define('Wickelplaetze.controller.Indernaehe', {
    extend: 'Ext.app.Controller',
    requires: [
        'Wickelplaetze.view.Indernaehe'
    ],
    /**
     * Configuration
     */
    config: {
        /**
         * Refs
         */
        refs: {
            viewport: 'demo-viewport',
            portfolioIndex: {
                selector: 'portfolio-index',
                xtype: 'portfolio-index',
                autoCreate: true
            }
        },
        /**
         * Controls
         */
        control: {
            /**
             * Product index events
             */
            index: {
                show: function(){
                    var me = this;

                    Ext.create('Ext.util.DelayedTask', function () {
                        me.getIndex().fireEvent('showDelay');
                    }).delay(600);
                    // 500 should be set to more than your card layout transition time
                },
                showDelay: function(){

                    /**
                     * More processor intense processing can be done
                     * here, as panel will have been in view
                     */
                }
            }
        }
    }
});