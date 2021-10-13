import * as Constants from '../../constants/Constants';

const initialState = {
    access_token: null,
    isLogged : false,
    loggedInUser: Constants.userRoles.ADMIN_USER,
    templateData: [],
    selectedTemplate: null
};

const HomeReducer = (state = initialState, action) => {
    switch(action.type) {
        case Constants.EVT_LOGIN_SAGA:
            return {...state, 
                    isLogged: true,
                    loggedInUser: Constants.userRoles.ADMIN_USER,
                    access_token: action.value.response.data.access_token,
                    templateData: action.value.templateData};
        break;
        case Constants.EVT_SET_TEMPLATE:
            return {...state, selectedTemplate: state.templateData.templates.find(item => item.template_id === action.value.template_id)};
        break;
        case Constants.EVT_LOGOUT:
            return {...state, isLogged: false, access_token: null};
        break;
        case Constants.EVT_CREATE_NEW_TENANT:
            state.templateData.templates.push(action.value);
            state.selectedTemplate = action.value;
            return state;
        break;
        default:
            return state;
    }
};

export default HomeReducer;
