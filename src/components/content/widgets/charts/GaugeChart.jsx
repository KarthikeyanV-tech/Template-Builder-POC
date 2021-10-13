import React from "react";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import {DEFAULT_TEXT_STYLE} from "./LineChart";
import * as Constants from "../../../../constants/Constants";
import {useDispatch} from "react-redux";

highchartsMore(Highcharts);
solidGauge(Highcharts);

export const GaugeChartWidget = (props) => {
    const {widgetConfig} = props;
    const dispatch = useDispatch();
    const type = "gauge";
    const chart = `${widgetConfig.widget_id}_${widgetConfig.widget_info.name}`;
    const units = widgetConfig.units;
    const backGroundColor = widgetConfig.backgroundColor;
    const minValue = (widgetConfig.data && widgetConfig.data.length>0)?widgetConfig.data[0].l:0;
    const maxValue = (widgetConfig.data && widgetConfig.data.length>0)?widgetConfig.data[0].hh:0;
    const lowValue = (widgetConfig.data && widgetConfig.data.length>0)?widgetConfig.data[0].ll:0;
    const midValue = (widgetConfig.data && widgetConfig.data.length>0)?widgetConfig.data[0].mm:0;

    /*let gaugeOptions = {
        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };*/

    let chartGauge = {};
    const createGaugeChart = (data) => {
        debugger;
        if(document.getElementById(chart) == null) {
            return;
        }
        chartGauge = Highcharts.chart(
            {

                chart: {
                    type: type,
                    style: DEFAULT_TEXT_STYLE,
                    backgroundColor: backGroundColor?backGroundColor:'#ffffff',
                    zoomType: false,
                    renderTo: chart,
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: null,
                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },
                /*pane: {
                    center: ['50%', '80%'],
                    size: '130%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: backGroundColor?backGroundColor:'#ffffff',
                        innerRadius: '90%',
                        outerRadius: '105%',
                        shape: 'arc',
                        borderColor: '#fff'
                    }
                },*/

                tooltip: {
                    enabled: true
                },

                // the value axis
                // the value axis
                yAxis: {
                    min: 0,
                    max: 200,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: 'km/h'
                    },
                    plotBands: [{
                        from: minValue,
                        to: lowValue,
                        color: '#55BF3B' // green
                    }, {
                        from: lowValue,
                        to: midValue,
                        color: '#DDDF0D' // yellow
                    }, {
                        from: midValue,
                        to: maxValue,
                        color: '#DF5353' // red
                    }]
                },

                series: [{
                    name: (widgetConfig.data && widgetConfig.data.length>0)?widgetConfig.data[0].name:"",
                    data: (widgetConfig.data && widgetConfig.data.length>0)?widgetConfig.data[0].data:[],
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:18px">{y}</span><br/>' +
                            '<span style="font-size:12px;opacity:0.4">{units}</span>' +
                            '</div>'
                    },
                    tooltip: {
                        valueSuffix: units
                    }
                }],
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
            }
        );
        dispatch({
            type: Constants.EVT_SET_WIDGET_REF,
            value: {
                ref: chartGauge,
                id: widgetConfig.widget_id
            }
        });
       /* let chartSpeed = Highcharts.chart(chart, Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 200,
                title: {
                    text: 'Speed'
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Speed',
                data: [80],
                dataLabels: {
                    format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                        '</div>'
                },
                tooltip: {
                    valueSuffix: ' km/h'
                }
            }]

        }));*/


// The RPM gauge
 /*   let chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 5,
            title: {
                text: 'RPM'
            }
        },

        series: [{
            name: 'RPM',
            data: [1],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px">{y:.1f}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">' +
                    '* 1000 / min' +
                    '</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' revolutions/min'
            }
        }]

    }));*/

// Bring life to the dials
    /*setInterval(function () {
        // Speed
        let point,
            newVal,
            inc;

        if (chartSpeed) {
            point = chartSpeed.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }

        // RPM
        /!*if (chartRpm) {
            point = chartRpm.series[0].points[0];
            inc = Math.random() - 0.5;
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 5) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }*!/
    }, 2000);*/
    }
    return(
        <div key={widgetConfig.widget_id} >
            {setTimeout(() => createGaugeChart(props.widgetConfig.data))}
        </div>
    )
}
