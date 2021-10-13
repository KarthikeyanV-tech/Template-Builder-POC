import {takeEvery} from 'redux-saga/effects';
import * as Constants from '../../constants/Constants.js';
import { loginSaga } from './loginSaga.js';
import { getChartDataSaga } from './getChartDataSaga';

export function* rootSaga() {
    yield takeEvery(Constants.EVT_LOGIN, loginSaga);
    //yield takeEvery(Constants.EVT_ADD_WIDGET_SAGA, getChartDataSaga);
}