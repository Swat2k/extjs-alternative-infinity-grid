Ext.define('App.view.main.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'app-main',
    requires: [
        'App.components.grid.column.RowNumberer',
        'App.components.grid.plugin.LazyLoad',
        'App.view.main.MainController',
        'App.view.main.MainModel'
    ],
    viewModel: 'main',
    bind: '{articles}',
	plugins: [{
		ptype: 'lazyload'
	}],
    columns: {
        defaults: {
            flex: false,
            sortable: false,
            editor: false,
            align: 'center',
            minWidth: 30,
            width: 60
        },
        items: [{
            xtype: 'infinityrownumberer',
            text: '#',
            align: 'left',
            maxWidth: 60,
            sortable: false,
            hideable: false,
            menuDisabled: true
        }, {
            text: 'title',
            dataIndex: 'title',
            align: 'left',
            width: 200
        }, {
            text: 'message',
            dataIndex: 'message',
            width: 180,
            flex: true
        }, {
            text: 'Note',
            dataIndex: 'note',
            width: 80
        }]
    }
});
