import {put, delay, call} from 'redux-saga/effects';
import * as Constants from '../../constants/Constants.js';
import * as Utils from '../../constants/Utils.js';
import chartService from '../../services/chartService.js';

export function* getChartDataSaga(action) {
    const response = yield call(chartService, action.value);
    if(response && response.status == 200) {
        const data = Utils.formatResponse(response, action.value.widgetInfo.tables);
        action.value.widgetInfo.data = data;
        yield put({type: Constants.EVT_ADD_WIDGET, value: action.value.widgetInfo});        
    } else {
        alert("Chart Service failed!! " + response.status);
    }
}