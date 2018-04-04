Ext.define('App.components.grid.plugin.LazyLoad', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.lazyload',

    config: {
        loadingZone: 200,
        isLoading: false
    },
 
    init: function(grid) {
        var me = this,
            view = grid.getView();

        view.on('scrollend', me.onViewScroll, me);
    },

    onViewScroll: function(view, x, y) {
        let me = this,
            store = view.getStore(),
            scroller = view.getScrollable(),
            maxPos = scroller.getMaxPosition();

        if (store.isLoading() || store.hasPendingLoad() || me.getIsLoading() || !store.getHasMore()) {
            return;
        }

        if ( y > maxPos.y - me.getLoadingZone()) {
            me.setIsLoading(true);
            store.nextPage({
                callback: function() {
                    view.refresh();
                    me.setIsLoading(false);
                }
            });
        }

        return false;
    }

});