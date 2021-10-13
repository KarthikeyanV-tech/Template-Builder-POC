import React from "react";
import {useDispatch} from 'react-redux';
import * as Highcharts from 'highcharts';
import * as Constants from "../../../../constants/Constants";
import {DEFAULT_TEXT_STYLE} from "./LineChart";

export const PieChartWidget = (props) => {
    const dispatch = useDispatch();
    const {widgetConfig} = props;
    const type = "pie";
    const chart = `${widgetConfig.widget_id}_${widgetConfig.widget_info.name}`;
    const units = widgetConfig.units;
    const backGroundColor = widgetConfig.backgroundColor;

    let chartPie = {};
    const createPieChart = (data) => {
        debugger;
        if(document.getElementById(chart) == null) {
            return;
        }
        chartPie = Highcharts.chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: type,
                style: DEFAULT_TEXT_STYLE,
                backgroundColor: backGroundColor?backGroundColor:'#ffffff',
                zoomType: false,
                renderTo: chart
            },
            title: null,
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: units
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
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
                ref: chartPie,
                id: widgetConfig.widget_id
            }
        });
    }

    return(

        <div key={widgetConfig.widget_id} >
            {setTimeout(() => createPieChart(props.widgetConfig.data))}
        </div>
    )
}
