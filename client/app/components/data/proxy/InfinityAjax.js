Ext.define('App.components.data.proxy.InfinityAjax', {
    extend: 'Ext.data.proxy.Ajax',
 
    alias: 'proxy.infinityajax',

    doRequest: function(operation) {
        var me = this,
            writer  = me.getWriter(),
            request = me.buildRequest(operation),
            method  = me.getMethod(request),
            jsonData, params;
           
        if (writer && operation.allowWrite()) {
            request = writer.write(request);
        }

        // Нужно обновить параметры
        let current_params = request.getParams();
        current_params.count = operation.getInternalScope().getTotalCount();
        request.setParams(current_params);
        
        request.setConfig({
            binary              : me.getBinary(),
            headers             : me.getHeaders(),
            timeout             : me.getTimeout(),
            scope               : me,
            callback            : me.createRequestCallback(request, operation),
            method              : method,
            useDefaultXhrHeader : me.getUseDefaultXhrHeader(),
            disableCaching      : false // explicitly set it to false, ServerProxy handles caching 
        });
        
        if (method.toUpperCase() !== 'GET' && me.getParamsAsJson()) {
            params = request.getParams();
 
            if (params) {
                jsonData = request.getJsonData();
                if (jsonData) {
                    jsonData = Ext.Object.merge({}, jsonData, params);
                } else {
                    jsonData = params;
                }
                request.setJsonData(jsonData);
                request.setParams(undefined);
            }
        }
        
        if (me.getWithCredentials()) {
            request.setWithCredentials(true);
            request.setUsername(me.getUsername());
            request.setPassword(me.getPassword());
        }
        return me.sendRequest(request);
    },
 
});