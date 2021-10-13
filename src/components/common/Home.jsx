import React, {useEffect, useContext, useState} from 'react';
import { useHistory} from 'react-router-dom';
import './css/Home.css';
import './css/Navigator.css';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header';
import Navigator from './Navigator';
import AppContext from '../../constants/AppContext';
import WidgetContainer from '../content/WidgetContainer';
import Button from '@material-ui/core/Button';
import {uuid} from 'uuidv4';
import * as Constants from '../../constants/Constants';
import WidgetConfigDialog from '../content/widgets/WidgetConfigDialog';
import * as Utils from '../../constants/Utils';
import chartService from "../../services/chartService";

const Home = () => {

    //const templateInfo = useSelector(state => state.homeReducer);
    const dispatch = useDispatch();

    const context = useContext(AppContext);

    const isLogged = useSelector(state => state.homeReducer.isLogged);

    const selectedTemplate = useSelector(state => state.homeReducer.selectedTemplate);

    const selectedNavigator = useSelector(state => state.navigatorReducer.selectedNavigator);

    const refreshCount = useSelector(state => state.navigatorReducer.refreshCount);

    const history = useHistory();

    const [isWidgetConfigOpen, setIsWidgetConfigOpen] = useState(false);

    const [selectedWidget, setSelectedWidget] = useState({});

    const access_token = useSelector((state) => state.homeReducer.access_token);

    const onClickAddNavigator = () => {
      const navigator = {...Constants.new_navigator};
      navigator.name = "Navigator 1";
      navigator.id = uuid();
      navigator.parent_id = null;
      navigator.children = [];
      navigator.page = {
        layout: [],//Constants.getLayoutForChartWidgetById(uuid())],
        widgets:[]
      };

      dispatch({
        type: Constants.EVT_ADD_NAVIGATOR,
        value: navigator
      });
    }

    useEffect(()=> {
        if(isLogged) {
            history.push("/home");
        } else {
            history.push("/");
        }
    }, [isLogged]);

    const closeAddEditWidgetDialog = () => {
      setIsWidgetConfigOpen(false);
    }

    const onClickAddWidget = (event) => {  
      // let new_widget = {...Constants.new_widget};
      // new_widget.title = "Metric";
      // new_widget.widget_info = Constants.widgets.LINE_CHART;
      // new_widget.widget_id = uuid();
      // new_widget.datasource = "http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetlineChartData";
      // new_widget.tables = [];
      // setSelectedWidget(new_widget);  
      // setIsWidgetConfigOpen(true);    
      let new_widget = {...Constants.new_widget};
      /*new_widget.title = "Metric";
      new_widget.widget_info = Constants.widgets.LINE_CHART;
      new_widget.widget_id = uuid();
      new_widget.data = [];
      new_widget.datasource = "http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetlineChartData";
      new_widget.data_path = "usp_GetDetailSplineChartData";
      new_widget.startDate = "1617624000";
      new_widget.endDate = "1617624000";
      new_widget.tables = [{        
          tableName: "cost",
          columns: ["Date","Value"],
          selectedColumn: "Value",
          filters: ["Date","Value"],
          selectedFilters: ["Value"],
          color: "",
          id: uuid()
      },
      {        
        tableName: "consumption",
        columns: ["Date","Value"],
        selectedColumn: "Value",
        filters: ["Date","Value"],
        selectedFilters: ["Value"],
        color: "",
        id: uuid()
    }]; */
   
      dispatch({
        type: Constants.EVT_OPEN_CONFIG,
        value:  new_widget
      });
        
      // setSelectedWidget(new_widget);  
      // setIsWidgetConfigOpen(true);


      // dispatch({
      //     type: Constants.EVT_ADD_TEMP_LAYOUT,
      //     value:  new_widget.widget_id
      // });
      // chartService({access_token, isWidgetSetup : 'no'}).then(response => {
      //     if(response && response.status === 200) {
      //         const series = Utils.formatResponse(response, new_widget.tables);
      //         new_widget.data = series;
      //         dispatch({
      //             type: Constants.EVT_ADD_WIDGET,
      //             value:  new_widget
      //         });
      //         // onClose();
      //     }
      // }).catch(error => {
      //     // onClose();
      //     alert(error);            
      // });
      // dispatch({
      //     type: Constants.EVT_ADD_WIDGET,
      //     value:  new_widget
      // });
  }

  return(
      isLogged ?
        <div className="app-container">   
        <div className="app-header-container">
          <Header/>
        </div>
        <div className="app-content-container">
          <div className="app-nav-container">
            <div className="app-control-panel-container"> 
              {
                selectedTemplate ? 
                <Button size="small" variant="contained" onClick={onClickAddNavigator}
                  color="primary">+</Button> : null
              }
            </div>
            <Navigator/>
          </div>
          <div className="app-workarea-container">
            <div className="app-control-panel-container"> 
              {
                selectedNavigator ? 
                <Button size="small" variant="contained" 
                  color="primary" onClick={onClickAddWidget}>+ Add Widget</Button> : null
              }              
            </div>
            <WidgetContainer/>
          </div>
        </div>
        <div className="app-footer-container">
        </div>  
      
    </div> :  null
    );
};

export default Home;
