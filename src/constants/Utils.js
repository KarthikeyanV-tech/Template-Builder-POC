import * as Constants from "./Constants";
import dateFormat from 'dateformat';
import _ from 'lodash';

export const getWidgetTypeList = (enumObj) => {
    let widgetTypes = [];
    for(let key in enumObj){
        widgetTypes.push(enumObj[key]);
    }
    return widgetTypes;
}

export const formatResponse = (response, selectedWidget) => {
    debugger;
    let widgetType = selectedWidget.widget_info.type;
    switch(widgetType) {
        case Constants.widgets.LINE_CHART.type:
            return formatResponseLineGaugeChart(response, selectedWidget.tables, selectedWidget.widget_info.type);
            break;
        case Constants.widgets.GAUGE_CHART.type:
            return formatResponseLineGaugeChart(response, selectedWidget.tables, selectedWidget.widget_info.type);
            break;
        case Constants.widgets.PIE_CHART.type:
            return formatResponsePieChart(response, selectedWidget.tables);
            break;
        case Constants.widgets.GRID.type:
            return formatResponseGridChart(response, selectedWidget.tables);
            break;
        default:
            return [];
    }
}

export const getResponseMetaData = (response, selectedWidget) => {
    debugger;
    let widgetType = selectedWidget.widget_info.type;
    switch(widgetType) {
        case Constants.widgets.LINE_CHART.type:
            return getLineChartMetadata(response, selectedWidget.tables);
            break;
        case Constants.widgets.GAUGE_CHART.type:
            return getGaugeChartMetadata(response, selectedWidget.tables);
            break;
        case Constants.widgets.PIE_CHART.type:
            return getPieChartMetadata(response, selectedWidget.tables);
            break;
        case Constants.widgets.GRID.type:
            return getGridMetadata(response, selectedWidget.tables);
            break;
        default:
            return [];
    }
}

export const getLineChartMetadata = (response, tables) =>{
    if(response && response.data && response.data.config && response.data.config.Metrics) {
        Object.keys(response.data.config.Metrics).forEach(key => {
          tables.forEach(table => {
              if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
                  let metricData = response.data.config.Metrics[key]
                  if(metricData && metricData.length>0){
                      let metricColumns = Object.keys(metricData[0]);
                      table.columns = metricColumns;
                      table.filters = metricColumns;
                  }
              }
          })
        })
    }
    return tables;
}

export const getGaugeChartMetadata = (response, tables) =>{
    if(response && response.data && response.data.config && response.data.config.Metrics) {
        let valueKey = "Value";
        let metricColumns = [];
        if(tables && tables.length>0) {
            Object.keys(response.data.config.Metrics).forEach(key => {
                if (_.isEqual(key.toLowerCase(), tables[0].tableName.toLowerCase())) {
                    if(response.data.config.Metrics[key] && response.data.config.Metrics[key].length>0) {
                        Object.keys(response.data.config.Metrics[key][0]).forEach(objKey => {
                            if (_.isEqual(objKey.toLowerCase(), valueKey.toLowerCase())) {
                                metricColumns.push(objKey);
                            }
                        })
                    }
                }
            });
            tables[0].columns = metricColumns;
            tables[0].filters = metricColumns;
        }
    }
    return tables;
}

export const getPieChartMetadata = (response, tables) =>{
    debugger;
    if(response && response.data && response.data.config && response.data.config.Metrics
        && tables.length>0) {
        let keyList = Object.keys(response.data.config.Metrics);
        tables[0].columns = keyList;
        tables[0].filters = keyList;
    }
    return tables;
}

export const getGridMetadata = (response, tables) =>{
    debugger;
    if(response && response.data && response.data.config && response.data.config.Metrics) {
        let keyList = Object.keys(response.data.config.Metrics);
        if(keyList.length>0){
            let metricObj = response.data.config.Metrics[keyList[0]];
            let metricColumns = Object.keys(metricObj);
            tables[0].gridColumns = metricColumns;
            tables[0].filters = metricColumns;
        }
    }
    return tables;
}

export const formatResponseLineGaugeChart = (response, tables, widgetType) =>{
    let data = [];
    if(response && response.data && response.data.config && response.data.config.Metrics){
        tables.forEach(table => {
            let table_name = table.tableName;
            let column = table.selectedColumn;
            if(column && response.data.config.Metrics[table_name]) {
                let table_data = response.data.config.Metrics[table_name]
                let seriesObj = {
                    name: "",
                    data: []
                }
                //columns.forEach(column => {
                    table_data.forEach(tableInfo => {
                        Object.keys(tableInfo).forEach(key => {
                            if(column === key){
                                seriesObj.name = table_name
                                seriesObj.data = [...seriesObj.data, tableInfo[key]]
                            } else if(widgetType === Constants.widgets.GAUGE_CHART.type){
                                seriesObj[key.toLowerCase()] = tableInfo[key]
                            }
                        })
                    });
                //});
                data.push(seriesObj)
            }
        });
    }
    return data;
}

export const formatResponsePieChart = (response, tables) =>{
    debugger;
    let data = [];
    let seriesData = {
        name: "",
        colorByPoint: true,
        data:[]
    }
    if(response && response.data && response.data.config && response.data.config.Metrics
        && tables && tables.length>0) {
        seriesData.name = tables[0].selectedColumn;
        let metricKeyList = Object.keys(response.data.config.Metrics);
        metricKeyList.forEach(key => {
            if(_.isEqual(key.toLowerCase(), tables[0].selectedColumn.toLowerCase())) {
                let keyList = response.data.config.Metrics[key];
                keyList.forEach(lst => {
                    if (lst && lst.length > 0) {
                        let dataObj = {
                            name: lst[0],
                            y: parseFloat(lst[1])
                        }
                        seriesData.data.push(dataObj);
                    }
                });
            }
        });
    }
    data.push(seriesData);
    return data;
}

export const formatResponseGridChart = (response, tables) =>{
    debugger;
    let data = {
        rows:[],
        columns:[]
    }
    if(response && response.data && response.data.config && response.data.config.Metrics){
        let metricKeyList = Object.keys(response.data.config.Metrics);
        let childObjKeyList = [];
        let rowIndex = 1;
        metricKeyList.forEach(key => {
            childObjKeyList = (childObjKeyList.length === 0)?Object.keys(response.data.config.Metrics[key]):childObjKeyList;
            data.rows.push({...response.data.config.Metrics[key], id:rowIndex});
            rowIndex++;
        });
        if(tables && tables.length>0) {
            tables[0].selectedGridColumns.forEach(gridColumn => {
                childObjKeyList.forEach(childObjKey => {
                    if (gridColumn === childObjKey) {
                        let column = {field: childObjKey, headerName: childObjKey, width: 150};
                        data.columns.push(column);
                    }
                })
            })
        }

    }
    return data;
}

export const requestBuilderCharts = (selectedWidget, access_token, fetchMetadata) =>{
    debugger;
    let type = selectedWidget.type;
    let source =  selectedWidget.source;
    /*if(_.isEqual(selectedWidget.widget_info.type, Constants.widgets.PIE_CHART.type) && selectedWidget.tables.length>0){
        type = selectedWidget.tables[0].tableName.toLowerCase() + selectedWidget.widget_info.type.toLowerCase();
        source = null;
    }*/
    let request_info_blank = {...Constants.request_info_blank}
    request_info_blank.access_token = access_token;
    request_info_blank.url = selectedWidget.datasource.url;
    request_info_blank.request.info.dataPath = selectedWidget.data_path;
    request_info_blank.request.info.source = source;
    request_info_blank.request.config.type = type;
    request_info_blank.request.config.widgetsetup = (fetchMetadata)?'yes':'no'
    request_info_blank.request.config.metrics = []
    selectedWidget.tables.forEach(tableInfo => {
        let metric;
        if(selectedWidget.startDate && selectedWidget.endDate){
            metric = {
                metric:tableInfo.tableName,
                aggregrate:"none",
                start: convertEpocToDateString(false,selectedWidget.startDate),
                end: convertEpocToDateString(false,selectedWidget.endDate)
            }
        }else {
            metric = {
                metric:tableInfo.tableName,
                aggregrate:"none"
            }
        }
        request_info_blank.request.config.metrics.push(metric);
    });
    return request_info_blank;
}

Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

export const convertEpocToDateString = (isEpocToDateString, dateTimeString) =>{
    let dateObj = null;
    if(isEpocToDateString){
        let dateString = "";
        if(_.isEmpty(dateTimeString)){
            dateObj = new Date();
            dateString = dateObj.format("yyyy-mm-dd'T'HH:MM");
            return dateString;
        }
        let epocNumber = new Number(dateTimeString);
        dateObj = new Date( epocNumber *1000);
        dateString = dateObj.format("yyyy-mm-dd'T'HH:MM");
        return dateString;
    }else{
        dateObj = (_.isEmpty(dateTimeString)) ? new Date() : new Date(dateTimeString); // Your timezone!
        let epochString = Math.round(dateObj.getTime()/1000);
        return epochString;
    }
}
