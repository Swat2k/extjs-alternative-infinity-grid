Ext.define('App.model.Article', {
    extend: 'App.model.Base',

    requires: [
        'App.components.data.proxy.InfinityAjax'
    ],

    idProperty: 'id',
    identifier: 'uuid',

    proxy: {
        type: 'infinityajax',
        appendId: false,
        url: 'http://127.0.0.1:5000/articles',
		reader: {
			type: 'json',
            rootProperty: 'data'
		},
        noCache: false,     //to remove param "_dc"
        pageParam: false,   // to remove param "page"
        startParam: false,  //to remove param "start"
        limitParam: 'limit', 
    },

    fields: [
        { 
            name: 'message', 
            type: 'string' 
        },
        {   
            name: 'note', 
            type: 'string' 
        },
        { 
            name: 'title', 
            type: 'string' 
        }
    ]
    
});
