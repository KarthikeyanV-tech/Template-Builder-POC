
import axios from 'axios';

const chartService = (params) => {
   /* let data = JSON.stringify({"info":{"deviceName":"","deviceId":1,"dataPath":"usp_GetDetailSplineChartData","desc":"desc","source": "timeseries"},
    "config":{"type":"linechart","widgetsetup":`${params.isWidgetSetup}`,
    "metrics":[{"metric":"cost","aggregrate":"none","start":"1617624000","end":"1617624000"},
    {"metric":"consumption","aggregrate":"none","start":"1617624000","end":"1617624000"}]}});*/
    let data = JSON.stringify(params.request);

    let config = {
        method: 'post',
        url: params.url,//'http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetlineChartData',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'BEARER ' + params.access_token
        },
        data : data
    };
    return axios(config);

}

export default chartService;
