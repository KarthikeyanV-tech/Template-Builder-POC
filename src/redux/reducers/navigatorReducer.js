import * as Constants from '../../constants/Constants';

const initialState = {
    navigators : null,
    selectedNavigator: null,
    refreshCount: 0,
    selectedWidget: null
}

const navigatorReducer = (state = initialState, action) => {
    switch(action.type) {
        case Constants.EVT_SET_TEMPLATE:
             state.navigators = action.value ? action.value.navigators : [];
             state.selectedNavigator = null;
             return state;
        break;
        case Constants.EVT_SET_SELECTED_NAVIGATOR:
             if(state.selectedNavigator) {
                if(state.selectedNavigator.id !== action.value.id) {
                    state.selectedNavigator = action.value;  
                }
             } else {
                state.selectedNavigator = action.value;  
             }
             return state;
        break;
        case Constants.EVT_ADD_NAVIGATOR:
            if(action.value.parent_id) {
                let parentNavigator = state.navigators.find( item => {
                    return item.id === action.value.parent_id ? item :
                    item.children.find(child => {
                        return child.id === action.value.parent_id;
                    });
                });
                parentNavigator.children.push(action.value);
            } else {
                state.navigators.push(action.value);
            }            
            state.refreshCount += 1;
            //state.selectedNavigator.children.push(action.value);
            //state.selectedNavigator = action.value;
            
            // for(let i = 0; i < state.navigators.length; i ++) {
            //     if(state.navigators[i].id = action.value.parent_id) {
            //         state.navigators[i].children.push(action.value);
            //     } else {
            //         for(let j = 0; j < state.navigators[i].children.length; j++) {
            //             if(state.navigators[i].children[j].id = action.value.parent_id) {
            //                 state.navigators[i].children[j].children.push(action.value);
            //             }
            //         }
            //     }
            // }
            return state;
          break;
        default:
            return state;
        break;
    }
}


export default navigatorReducer;