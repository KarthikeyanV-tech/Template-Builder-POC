import {put, delay, call} from 'redux-saga/effects';
import * as Constants from '../../constants/Constants.js';
import loginService from '../../services/loginService.js';
import tenplateService from '../../services/templateService.js';

export function* loginSaga(action) {
    const response = yield call(loginService, action.value);
    if(response && response.status == 200) {
        const templateData = yield call(tenplateService, response);
        yield put({type: Constants.EVT_LOGIN_SAGA, value: {response, templateData}});
        
    } else {
        alert("Login failed!! " + response.status);
    }
}