Ext.define('App.components.data.InfinityStore', {
    extend: 'Ext.data.Store',
 
    alias: 'store.infinitystore',

    config: {
        hasMore: true,
        clearOnPageLoad: false
    },

    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful();

        if (me.destroyed) {
            return;
        }

        if (resultSet) {

            // Нужно правильно взводить флаг
            if (Ext.decode(operation.getResponse().responseText).has_more) {
                me.setHasMore(true);
            } else {
                me.setHasMore(false);
            }

            me.totalCount = me.getTotalCount() + resultSet.getTotal();

        }

        if (successful) {
            records = me.processAssociation(records);
            me.loadRecords(records, operation.getAddRecords() ? {
                addRecords: true
            } : undefined);
            me.attachSummaryRecord(resultSet);
        } else {
            me.loading = false;
        }

        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful, operation);
        }
        me.callObservers('AfterLoad', [records, successful, operation]);
    },

    previousPage: function(options) {
        Ext.raise('Not be implemented');
    },

    loadPage: function(page, options) {
        var me = this;
 
        if (me.currentPage >= page) {
            Ext.raise('page number should be more');
        }

        if (me.getHasMore())
            me.callParent(arguments);
    },

    reload: function() {
        var me = this;

        me.currentPage = 0;
        me.totalCount = 0;

        me.nextPage();
    }

 
});