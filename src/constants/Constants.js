import {uuid} from 'uuidv4';

export const EVT_LOGIN = "LOGIN_EVENT";
export const EVT_LOGIN_SAGA = "LOGIN_EVENT_SAGA";
export const EVT_LOGOUT = "LOGOUT_EVENT";
export const EVT_SET_TEMPLATE = "SET_TEMPLATE_EVENT";
export const EVT_CREATE_NEW_TENANT = "CREATE_NEW_TENANT_EVENT";
export const EVT_SET_SELECTED_NAVIGATOR = "SET_SELECTED_NAVIGATOR_EVENT";
export const EVT_ON_LAYOUT_CHANGE = "LAYOUT_CHANGE_EVENT";
export const EVT_ADD_NAVIGATOR = "ADD_NAVIGATOR_EVENT";
export const EVT_ADD_WIDGET = "ADD_NEW_WIDGET";
export const EVT_UPDATE_WIDGET = "UPDATE_WIDGET";
export const EVT_ADD_WIDGET_SAGA = "ADD_NEW_WIDGET_SAGA";
export const EVT_SET_WIDGET_REF = "SET_WIDGET_REF";
export const EVT_ADD_TEMP_LAYOUT = "ADD_TEMP_LAYOUT";
export const EVT_OPEN_CONFIG = "OPEN_CONFIG";
export const username = "Admin";
export const password = "Password";
export const grantType = "password";

export const userRoles = Object.freeze({
    ADMIN_USER: {name: "Admin", role: "admin", id: "1", group: "admin"},
    ENGINEER_USER: {name: "Engineer", role: "engineer", id: "2", group: "user"},
    OPERATOR_USER: {name: "OPERATOR", role: "operator", id: "3", group: "user"}
});

export const widgets = Object.freeze({
    PIE_CHART: {name: "pie_chart", type: "piechart", id: "1", group: "chart", source:"timeseries"},
    LINE_CHART: {name: "line_chart", type: "linechart", id: "2", group: "chart", source:"timeseries"},
    //BAR_CHART: {name: "bar_chart", type: "barchart", id: "3", group: "chart", source:"timeseries"},
    GAUGE_CHART: {name: "gauge_chart", type: "guagechart", id: "3", group: "chart", source:"timeseries"},
    GRID: {name: "grid", type: "grid", id: "4", group: "grid", source:"timeseries"},
    TEXT_BOX: {name: "text_box", type: "textbox", id: "5", group: "textbox", source:"timeseries"},
    //IMAGE: {name: "image", type: "image", id: "7", group: "image"},
    //LINK: {name: "link", type: "link", id: "8", group: "link"},
});

export const filters = Object.freeze({
    DATE: {name: "filter by date", type: "date"},
    NAME: {name: "filter by name", type: "name"},
});

export const getLayoutForChartWidgetById = (widget_id) => {
    return {"w":12,"h":4,"x":0,"y":0,"i":widget_id,"moved":false,"static":false}
}

export const new_template = {
        template_id: null,
        template_name: "",
        creation_date: new Date(),
        modified_date: new Date(),
        header: {},
        footer: {},
        navigators: []
     };

export const new_header = {
    tenant_name: "Test Tenant",
    tenant_logo: {
        img_url: "http://tinyurl.com/12345",
        height: "25",
        width: "100",
        unit: "px"
    }
};

export const new_navigator = {
        name: "",
        id: "",
        count: 0,
        parent_id: null,
        children: [],
        page: {}
    };

export const new_widget = {
    title: "",
    units: "",
    source: null,
    type: "",
    description: "",
    dataSourceList: [],
    datasource: null,
    data_path: "",
    widget_info: null,
    widget_id: uuid(),
    tables: [],
    startDate:"",
    endDate:"",
    backgroundColor: "",
    isNewWidget: true
};

export const new_table = {
    table_name: null,
    columns: [{
        column_name: null,
    }],
    filter: [{
        column_name: null,
    }]
};

export const template_blank = {
    user:{
        username: "test_user"
    },
    templates: []   
};

export const dataSources = {
    [widgets.LINE_CHART.type]:[
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line chart)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetlineChartData"
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Line chart)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetlineChartData"
        },
    ],
    [widgets.GAUGE_CHART.type]:[
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Gauge chart)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetGuageChartData"
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Gauge chart)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetGuageChartData"
        },
    ],
    [widgets.GRID.type]:[
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Usage Process DataTable)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetDataTableData"
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water(Usage Process DataTable)",
            label: "Watnon Water(Usage Process DataTable)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetDataTableData"
        }
        /*{
            id: 3,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Usage System DataTable)",
            url: " http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetUsageBySystemChartData"
        },
        {
            id: 4,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Usage System DataTable)",
            url: " http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetUsageBySystemChartData"
        }*/
    ],
    [widgets.PIE_CHART.type]:[
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Pie chart)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetUsageByProcessChartData"
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Pie chart)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergyAPI/api/Energy/GetUsageByProcessChartData"
        },
    ],
    [widgets.TEXT_BOX.type]:[
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Text Box)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetTextBoxData"
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Text Box)",
            url: "http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetTextBoxData"
        },
    ],
}
export const request_info_blank = {
    access_token:"",
    url:"",
    request: {
        info: {
            deviceName: "",
            deviceId: 1,
            dataPath: "",
            desc: "desc",
            source: ""
        },
        config: {
            type: "",
            widgetsetup: "",
            metrics: []
        }
    }
}

