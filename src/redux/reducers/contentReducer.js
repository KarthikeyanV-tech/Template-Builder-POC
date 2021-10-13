import * as Constants from '../../constants/Constants';
import _ from 'lodash';

const initialState = {
    selectedPage: null,
    layout: [],
    refreshCount: 0,
    isOpenConfig: false
};

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.EVT_SET_SELECTED_NAVIGATOR:
            return {selectedPage: action.value.page, layout: action.value.page.layout, 
                refreshCount: state.refreshCount + 1, selectedWidget: null, isOpenConfig: false}
        break;
        case Constants.EVT_ON_LAYOUT_CHANGE:
            if (state.selectedPage) {
                state.selectedPage.layout =  action.value;
                //state.layout = action.value;
            }            
            return state;
        break;
        case Constants.EVT_ADD_WIDGET:
            if(state.selectedPage) {
                //state.layout.push(Constants.getLayoutForChartWidgetById(action.value.widget_id));
                state.selectedPage.layout.push(Constants.getLayoutForChartWidgetById(action.value.widget_id));
                state.selectedPage.widgets.push(action.value);
                state.refreshCount += 1;
            }
            return state;
        break;
        case Constants.EVT_UPDATE_WIDGET:
            if(state.selectedPage) {
                debugger;
                // Find item index using _.findIndex
                let index = _.findIndex(state.selectedPage.widgets, {widget_id: action.value.widget_id});
                // Replace item at index using native splice
                state.selectedPage.widgets.splice(index, 1, action.value);
                state.refreshCount += 1;
            }
            return state;
            break;
        case Constants.EVT_ADD_TEMP_LAYOUT:
            if(state.selectedPage) {//} && state.selectedPage.widgets.length) {
                state.selectedPage.layout.push(Constants.getLayoutForChartWidgetById(action.value));
                //state.refreshCount += 1;
            }
            return state;
        break;
        case Constants.EVT_OPEN_CONFIG:
            state.selectedWidget = action.value;
            state.isOpenConfig = !state.isOpenConfig;
            return state;
        break;
        case Constants.EVT_SET_WIDGET_REF:
            const selectedWidget = state.selectedPage.widgets.find(item => item.widget_id === action.value.id);
            selectedWidget.ref = action.value.ref;
            return state;
        break;
        case Constants.EVT_SET_TEMPLATE:
            state.selectedPage = null;
        default:
            return state;
        break;
    }
}

export default contentReducer;
