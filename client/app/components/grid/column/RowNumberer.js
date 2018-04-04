Ext.define('App.components.grid.column.RowNumberer', {
    extend: 'Ext.grid.column.RowNumberer',
    alias: 'widget.infinityrownumberer',

    defaultRenderer: function(value, metaData, record, rowIdx, colIdx, dataSource, view) {
        var me = this,
            rowspan = me.rowspan,
            page = dataSource.currentPage,
            result = record ? view.store.indexOf(record) : value - 1;

        if (metaData && rowspan) {
            metaData.tdAttr = 'rowspan="' + rowspan + '"';
        }
 
        // Нам уже не нужна эта логика
        // if (page > 1) {
        //     result += (page - 1) * dataSource.pageSize;
        // }

        return result + 1;
    },

});