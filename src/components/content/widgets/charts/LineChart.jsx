import React, {use} from "react";
import {useDispatch} from 'react-redux';
import * as Highcharts from 'highcharts';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import * as Constants from "../../../../constants/Constants";
import chartService from "../../../../services/chartService";
import {useSelector} from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import * as Utils from '../../../../constants/Utils';


const useStyles = makeStyles(theme => ({
    gridContainer: {
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
}))

export const DEFAULT_TEXT_STYLE = {
    font: 'Helvetica, Arial, sans-serif',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontSize: '14px',
    lineHeight: 'normal',
    color: '#181818',
};

export const LineChartWidget = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const access_token = useSelector((state) => state.homeReducer.access_token);
    const {widgetConfig} = props;
    const {tables} = widgetConfig;

    const title = widgetConfig.title;
    const type = "spline";
    const chart = `${widgetConfig.widget_id}_${widgetConfig.widget_info.name}`;
    const units = widgetConfig.units;
    const backGroundColor = widgetConfig.backgroundColor;
    let xAxis = [];

    

    
    let chartLine = {};
    const createLineChart = (data) => {
        debugger;
        if(document.getElementById(chart) == null) {
            return;
        }
        chartLine = Highcharts.chart({
            chart:  {
                type,
                style: DEFAULT_TEXT_STYLE,
                backgroundColor: backGroundColor?backGroundColor:'#ffffff',
                /*events: {
                    // Workaround. Remove when https://github.com/highcharts/highcharts/issues/7765 is completed.
                    redraw: redrawHalo,
                    click: onClickOutside,
                    // Refactor when moved to edos commons lib
                },*/
                zoomType: false,
                renderTo: chart
               
            },
            title: {
                text: "",//title,
                style: {
                    ...DEFAULT_TEXT_STYLE,
                    fontWeight: 'bold',
                    letterSpacing: '-0.015em',
                    'line-height': '1.25em',
                },
                useHtml:  true,
                align: 'left',
            },
            legend: {
                itemStyle: DEFAULT_TEXT_STYLE,
            },
            credits: {
                enabled: false,
            },
            lang: {
                noData: 'No data to display',
            },
            noData: {
                style: {
                    ...DEFAULT_TEXT_STYLE,
                },
            },
            xAxis: {
                //categories: xAxis,
                tickmarkPlacement: 'off',
                title: {
                    enabled: false,

                },
            },
            yAxis: {
                //max: y_max,
                title: {
                    text: `Units (${units})`,
                },
            },
            tooltip: {
                split: true,
                valueSuffix: ` ${units}`,
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    connectNulls: true,
                },
            },
            series: data,
            responsive: {
                rules: [{
                    condition: {
                        //maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        });
        dispatch({
            type: Constants.EVT_SET_WIDGET_REF,
            value: {
                ref: chartLine,
                id: widgetConfig.widget_id
            }
        });   
    }

    return(
    
        <div key={widgetConfig.widget_id} >
            {setTimeout(() => createLineChart(props.widgetConfig.data))}
        </div>
    )
}
