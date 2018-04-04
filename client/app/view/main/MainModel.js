Ext.define('App.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'App.components.data.InfinityStore'
    ],

    alias: 'viewmodel.main',

    stores: {
        articles: {
            type: 'infinitystore',
            model: 'App.model.Article',
            pageSize: 100,
            autoLoad: true
        }
    }

});
