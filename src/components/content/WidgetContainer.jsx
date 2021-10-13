import React, {useState} from "react";
import './css/content.css';
import {useSelector, useDispatch} from 'react-redux';
import * as Constants from  '../../constants/Constants';
import {makeStyles} from "@material-ui/core/styles";
 import RGL, { WidthProvider } from "react-grid-layout";
 import Grid from "@material-ui/core/Grid";
import FilterListSharpIcon from "@material-ui/icons/FilterListSharp";
import SettingsSharpIcon from "@material-ui/icons/SettingsSharp";
import InputBase from '@material-ui/core/InputBase';
import {LineChartWidget} from "./widgets/charts/LineChart";
import WidgetConfigDialog from "./widgets/WidgetConfigDialog"
import {GaugeChartWidget} from "./widgets/charts/GaugeChart";
import {PieChartWidget} from "./widgets/charts/PieChart";
import {DataGridWidget} from "./widgets/charts/DataGridWidget";

const useStyles = makeStyles((theme) => ({
  margin: {
      margin: theme.spacing(1),
  },
}));

const ReactGridLayout = WidthProvider(RGL);

const WidgetContainer = () => {

  const page = useSelector((state) => state.contentReducer.selectedPage);

  //const layout = useSelector((state) => state.contentReducer.layout);

  const refreshCount = useSelector((state) => state.contentReducer.refreshCount);

  const dispatch = useDispatch();

  const classes = useStyles();

  const [selectedWidget, setSelectedWidget] = useState({});

  
  const onLayoutChange = layout => {
        //localStorage.setItem("grid-layout-setting", JSON.stringify(layout));
        dispatch({
          type: Constants.EVT_ON_LAYOUT_CHANGE,
          value: layout
        });

        if(page) {
          page.widgets.map(widget => {
            if(widget.widget_info.group === Constants.widgets.LINE_CHART.group
              && widget.ref) {
              widget.ref.reflow();
            }
          });
        }
        
        console.log(JSON.stringify(layout));
    }

    const onEditWidgetClickHandler = (widget) => {
        widget.isNewWidget = false;
        dispatch({
            type: Constants.EVT_OPEN_CONFIG,
            value:  widget
        });
    }
    // const layout = page? page.layout : [];
const layout = page? (page.layout.length ? page.layout : [])
      : [];
    console.log(layout);
    

    return ( 
      <div className="root_widgetContent">
        <ReactGridLayout  className="widgetContent" onLayoutChange={onLayoutChange} 
        layout={layout} cols={12} rowHeight={100}
        isResizable= {true} resizeHandles={['se', 'ne']}>
        {     
          page ?
          page.widgets.map(widget => {
            return (
              <div key={widget.widget_id} className="widgetContainer" id={widget.widget_id}>
                        <Grid container alignItems="flex-start" spacing={1}>
                          <Grid item={true} xs={6}>
                              <InputBase
                                  className={classes.margin}
                                  defaultValue={widget.title}
                                  inputProps={{ 'aria-label': 'naked' }}
                              />
                          </Grid>
                          <Grid item={true} xs={6}>
                              <FilterListSharpIcon fontSize={"small"}/>
                              <SettingsSharpIcon fontSize={"small"} onClick={() => onEditWidgetClickHandler(widget)}/>
                          </Grid>
                        </Grid>
                
                      {
                          (widget.widget_info.type == Constants.widgets.LINE_CHART.type) ?
                              <div id={`${widget.widget_id}_${widget.widget_info.name}`} style={{width: '100%', height: '100%'}}>
                                <LineChartWidget widgetConfig={widget}/>
                              </div>                           
                              :
                          (widget.widget_info.type == Constants.widgets.PIE_CHART.type) ?
                              <div id={`${widget.widget_id}_${widget.widget_info.name}`} style={{width: '100%', height: '100%'}}>
                                  <PieChartWidget widgetConfig={widget}/>
                              </div>
                              :
                          (widget.widget_info.type == Constants.widgets.GAUGE_CHART.type) ?
                              <div id={`${widget.widget_id}_${widget.widget_info.name}`} style={{width: '100%', height: '100%'}}>
                                  <GaugeChartWidget widgetConfig={widget}/>
                              </div>
                              :
                          (widget.widget_info.type == Constants.widgets.GRID.type) ?
                              <div id={`${widget.widget_id}_${widget.widget_info.name}`} style={{width: '100%', height: '100%'}}>
                                  <DataGridWidget widgetConfig={widget}/>
                              </div>
                              :
                          <Grid>{"Invalid Widget Selection"}</Grid>
                      }
                  
                  {/*<div>{widget.widget.name}</div>*/}
                  {/*<Grid key={widget.widget.id} container alignItems="flex-start" spacing={1}>
                      <Grid item={true} xs={6}>
                          <InputBase
                              className={classes.margin}
                              defaultValue={widget.title}
                              inputProps={{ 'aria-label': 'naked' }}
                          />
                      </Grid>
                      <Grid item={true} xs={6}>
                          <FilterListSharpIcon fontSize={"small"}/>
                          <SettingsSharpIcon fontSize={"small"}/>
                      </Grid>
                      <Grid key={widget.widget.id} container alignItems="flex-start" spacing={1} id={"widgetCont"} className="widgetContainer">
                          {
                              (widget.widget.name === Constants.widgets.LINE_CHART.name) ?
                                  <LineChartWidget widgetConfig={widget}/>
                                  :
                                  (widget.widget.name === Constants.widgets.PIE_CHART.name) ?
                                      <Grid>{widget.widget.name}</Grid>
                                      :
                                      <Grid>{"Invalid Widget Selection :-("}</Grid>
                          }
                      </Grid>
                  </Grid>*/}

              </div>)
                }) : null
          }
        </ReactGridLayout>
      </div>
    );  
}

export default WidgetContainer;
