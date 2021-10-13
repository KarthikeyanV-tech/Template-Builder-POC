import {useDispatch, useSelector} from "react-redux";
import * as Constants from "../../../constants/Constants";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {Select} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import {uuid} from 'uuidv4';
import * as Utils from '../../../constants/Utils';
import chartService from "../../../services/chartService";
import AddTableInfo from "../settings/AddTableInfo";
import {EditableInput} from "react-color/lib/components/common";
import {SketchPicker, TwitterPicker} from 'react-color';
import ColorPicker from "material-ui-color-picker";
import _ from "lodash";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    formControlChartDataSource: {
        margin: theme.spacing(1),
        minWidth: 350,
    },
    formControlTableColumn: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    formControlTableFilter: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    gridContainer: {
        width: 500,
    },
    addTableInfoMargin: {
        //margin: theme.spacing(1),
    },
    addTableInfoIcon: {
        //marginRight: theme.spacing(1),
    }
}));

const inputStylesColorPicker = {
    input: {
        border: 'none',
    },
    label: {
        fontSize: '12px',
        color: '#999',
    },
};

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const WidgetConfigDialog = (props) => {

   /* const [open, setOpen] = React.useState(false);

    const onclickHandler = () => {
        dispatch({
            type: Constants.EVT_LOGOUT
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };*/

    //const dispatch = useDispatch();

    /*const handleClose = () => {
        //setOpen(false);
        //Constants.widgets.BAR_CHART
        dispatch({
            type: Constants.EVT_ADD_WIDGET_CLOSE
        });
    };*/

    /*const open = useSelector(state => state.homeReducer.isAddWidgetDialogOpen);
    const widgetsList = [];
    if(props.isOpen) {
        /!*Object.values(Constants.widgets).forEach((value) => {
            //console.log(value);
        });*!/
        //widgetsList.push(Object.values(Constants.widgets))
        //.log(widgetsList.length);
        /!*for(const value of widgetsList) {
            console.log(value);
            widgetsList.push(value);
        }*!/
    }
    const getMenuItem = () => {

    }*/

    /*let widgetConfigInitialize = {
        selectedWidget: "line_chart",
        widgetType: "chart",
        chart: {
            title: "",
            tableInfoList: [
                {
                    tableName: "cost",
                    selectedColumns: ["Value"],
                    selectedFilter: ["year"],
                    color: "",
                    id: 1
                },
                {
                    tableName: "consumption",
                    selectedColumns: ["Value"],
                    selectedFilter: ["year"],
                    color: "",
                    id: 2
                }
            ],
        },
        grid: {
            title: "",
            tableInfoList: [
                {
                    tableName: "cost",
                    selectedColumns: ["Value"],
                    selectedFilter: ["year"],
                    color: "",
                    id: 1
                },
                {
                    tableName: "consumption",
                    selectedColumns: ["Value"],
                    selectedFilter: ["year"],
                    color: "",
                    id: 2
                }
            ],
        },
        image: {
            imageUrl: "",
            label: ""
        },
        link: {
            linkUrl: "",
            label: ""
        }
    }

    /*const initializeWidgetConfig = () => {
        let widgetInfo = null;
        if (widgetConfig) {
            dialogTitle = "Edit Widget";
            widgetInfo = widgetConfig;
        } else {

        }
        // setTitle(widgetInfo.title);
        // setSelectedWidgetInfo(widgetInfo.widget_info);
        // setDatasource(widgetInfo.datasource);
        // setTables(widgetInfo.tables);
        return widgetInfo;
    }

    //const [isConfigOpen, setIsConfigOpen] = useState(true);
     */


    const dispatch = useDispatch();

    const { widgetConfig, onCloseDialog } = props;

    //let dialogTitle = "Add Widget";

    const classes = useStyles();

    const widgetTypes = Utils.getWidgetTypeList(Constants.widgets);

    const dataSourceTypes = {...Constants.dataSources};

    const access_token = useSelector((state) => state.homeReducer.access_token);
    
    
    const [selectedWidget, setSelectedWidget] = useState(widgetConfig);
    let dialogTitle = selectedWidget.isNewWidget?"Add Widget":"Edit Widget";
    const [selectedWidgetInfo, setSelectedWidgetInfo] = useState(selectedWidget.widget_info);
    const [selectedDatasourceInfo, setSelectedDatasourceInfo] = useState(selectedWidget.datasource);
    const [dataSourceList, setDataSourceList] = useState(selectedWidget.dataSourceList);
    const [tables, setTables] = useState(selectedWidget.tables);
    const [title, setTitle] = useState(selectedWidget.title);
    const [units, setUnits] = useState(selectedWidget.units);
    const [source, setSource] = useState(selectedWidget.source);
    const [type, setType] = useState(selectedWidget.type);
    //const [datasource, setDatasource] = useState(selectedWidget.datasource);
    const [dataPath, setDataPath] = useState(selectedWidget.data_path);
    const [backgroundColor, setBackgroundColor] = useState(selectedWidget.backgroundColor);
    const [startDate, setStartDate] = useState(selectedWidget.startDate);//_.isEmpty(selectedWidget.startDate)?Utils.convertEpocToDateString(true,selectedWidget.startDate):selectedWidget.startDate);
    const [endDate, setEndDate] = useState(selectedWidget.endDate);//_.isEmpty(selectedWidget.endDate)?Utils.convertEpocToDateString(true,selectedWidget.endDate):selectedWidget.endDate);
    const [columns, setColumns] = useState([]);

    // const [imageConfig, setImageConfig] = useState(widgetConfig.image);
    // const [linkConfig, setLinkConfig] = useState(widgetConfig.link);


    const onWidgetTypeSelectionChange = event => {
        onWidgetChangeReset();
        let selectedWidget = widgetTypes.find(type => type.id ===event.target.value);
        setSelectedWidgetInfo(selectedWidget);
        let dataSourceListOnWidgetSelection = dataSourceTypes[selectedWidget.type];
        setDataSourceList(dataSourceListOnWidgetSelection?dataSourceListOnWidgetSelection:[]);
    };

    const onDatasourceTypeSelectionChange = event => {
        setSelectedDatasourceInfo(dataSourceList.find(type => type.id ===event.target.value));
    };
    
    const onAddTableInfoClickHandler = () => {
        const table = {
            tableName: "",
            columns: columns,//["Date","Value"],
            gridColumns:[],
            selectedColumns: [],
            selectedGridColumns: [],
            filters: columns,//["Date","Value"],
            selectedFilters: [],
            color: "",
            selectedWidgetInfo: selectedWidgetInfo,
            yAxisStops:[],
            id: uuid()
        };

        setTables([...tables, table]);
    };

    const onRemoveTableInfoClickHandler = (id) => {
        setTables(tables.filter(table => table.id != id));
    };

    const onTableInfoChange = (id) => (e) => {
        const { name, value } = e.target;
        // const tableInfoListCopy = [...tableInfoList];
        // tableInfoListCopy[idx].tableName = value;
        // setTableInfoList(tableInfoListCopy);
    };

    const onColumnMultiSelectChange = (id) => (e) => {
        const { name, value } = e.target;
        // const tableInfoListCopy = [...tableInfoList];
        // let selectRow = tableInfoListCopy[idx];
        // selectRow.selectedColumns = [...selectRow.selectedColumns,value]
        // tableInfoListCopy[idx].selectedColumns = [...selectRow.selectedColumns,value];
        // /*tableInfoListCopy[idx] = {
        //     [name]: [name].push(value)
        // };*/
        // setTableInfoList(tableInfoListCopy);
    };

    const onFilterMultiSelectChange = (idx) => (e) => {
        const { name, value } = e.target;
        // const tableInfoListCopy = [...tableInfoList];
        // let selectRow = tableInfoListCopy[idx];
        // selectRow.selectedFilters = [...selectRow.selectedFilters,value]
        // // tableInfoListCopy[idx] = {
        // //     [name]: [name].push(value)
        // // };
        // setTableInfoList(tableInfoListCopy);
    };

    const onWidgetChangeReset = () =>{
        let selectedWidgetReset = {...Constants.new_widget};
        setSelectedWidget(selectedWidgetReset);
        setTitle(selectedWidgetReset.title);
        setUnits(selectedWidgetReset.units);
        setSource(selectedWidgetReset.source);
        setType(selectedWidgetReset.type);
        setBackgroundColor(selectedWidgetReset.backgroundColor);
        setSelectedDatasourceInfo(selectedWidgetReset.datasource);
        setDataPath(selectedWidgetReset.data_path);
        setTables(selectedWidgetReset.tables);
        setStartDate(Utils.convertEpocToDateString(true,selectedWidgetReset.startDate));
        setEndDate(Utils.convertEpocToDateString(true,selectedWidgetReset.endDate));
    }

    const updateWidgetInfo = () => {
        selectedWidget.widget_info = selectedWidgetInfo;
        selectedWidget.title = title;
        selectedWidget.units = units;
        selectedWidget.source = source;
        selectedWidget.type = type;
        selectedWidget.datasource = selectedDatasourceInfo;
        selectedWidget.data_path = dataPath;
        selectedWidget.tables = tables;
        selectedWidget.startDate = startDate;
        selectedWidget.endDate = endDate;
        selectedWidget.backgroundColor = backgroundColor;
        selectedWidget.dataSourceList = dataSourceList;
    }

    const onFetchClickHandler = () => {
        if(tables && tables.length>0) {
            updateWidgetInfo();
            chartServiceApi(true);
        }
    }

    const onSaveChangeClickHandler = () => {
        if(selectedWidget && selectedWidget.widget_info && selectedWidget.datasource
            && selectedWidget.data_path) {
            updateWidgetInfo();
            chartServiceApi(false);
        }
    }

    const chartServiceApi = (fetchMetadata) => {
        debugger;
        let requestInfo = Utils.requestBuilderCharts(selectedWidget, access_token, fetchMetadata);
        chartService(requestInfo).then(response => {//{access_token, isWidgetSetup : (widgetSetupFlag)?'yes':'no'}
            debugger;
            if(response && response.status === 200) {
                let data ;
                if(fetchMetadata) {
                    data = Utils.getResponseMetaData(response, selectedWidget);
                    setTables([...data]);
                }else{
                    data = Utils.formatResponse(response, selectedWidget);
                    selectedWidget.data = data;
                    let eventName = Constants.EVT_UPDATE_WIDGET;
                    if(selectedWidget.isNewWidget){
                        selectedWidget.widget_id = uuid();
                        eventName = Constants.EVT_ADD_WIDGET;
                    }
                    dispatch({
                        type: eventName,
                        value: (eventName = Constants.EVT_ADD_WIDGET)?selectedWidget:{...selectedWidget}
                    });
                    onClose();
                }
            }else{
                selectedWidget.data = null;
            }
        }).catch(error => {
            onClose();
            alert(error);
        });
    }

    const onClose = () => {
        onCloseDialog();
    }

    const onColorChange = (color) => {
        debugger;
        setBackgroundColor(color);
    }

   /* const onDateChange = () => (e) => {
        debugger;
        setStartDate(e.target.value);
    }*/

    return(
        <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={true} fullWidth maxWidth="md">
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                {dialogTitle}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container alignItems="flex-start" spacing={1}>
                  {
                      selectedWidget.isNewWidget?
                      <Grid item={true} xs={12}>
                        <FormControl required className={classes.formControl}>
                            <InputLabel id="widget-list">Widget Type</InputLabel>
                            <Select
                                labelId="widget-select-required-label"
                                id="widget-select-required"
                                value={selectedWidgetInfo ? selectedWidgetInfo.id : null}
                                onChange={onWidgetTypeSelectionChange}
                                className={classes.selectEmpty}
                                label={"Select Widget"}
                            >
                                {widgetTypes.map(widgetType => {
                                    return (
                                        <MenuItem key={widgetType.id} value={widgetType.id}>{widgetType.name}</MenuItem>
                                    )
                                })}
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                      </Grid> : null
                  }
                  {
                    (selectedWidgetInfo && (selectedWidgetInfo.group === Constants.widgets.LINE_CHART.group
                    || selectedWidgetInfo.group === Constants.widgets.GRID.group))?

                      <Grid item={true} xs={12}>
                          <FormControl required className={classes.formControlChartDataSource}>
                              <TextField value={title} required id="standard-required-title"
                                         onChange={evt => setTitle(evt.target.value)} label="Title" defaultValue=""/>
                              <FormHelperText>Required</FormHelperText>
                          </FormControl>
                          <FormControl  className={classes.formControlChartDataSource}>
                              <ColorPicker
                                  name="color"
                                  defaultValue="#000"
                                  label="Background color"
                                  value={backgroundColor}
                                  onChange={onColorChange}
                              />
                          </FormControl>
                          <FormControl required className={classes.formControlChartDataSource}>
                              <TextField value={units} required id="standard-required-units"
                                         onChange={evt => setUnits(evt.target.value)} label="Units" defaultValue=""/>
                              <FormHelperText>Required</FormHelperText>
                          </FormControl>
                          <FormControl required className={classes.formControlChartDataSource}>
                              <TextField value={source} required id="standard-required-source"
                                         onChange={evt => setSource(evt.target.value)} label="Source" defaultValue=""/>
                              <FormHelperText>Required</FormHelperText>
                          </FormControl>
                          <FormControl required className={classes.formControlChartDataSource}>
                              <TextField value={type} required id="standard-required-type"
                                         onChange={evt => setType(evt.target.value)} label="Type" defaultValue=""/>
                              <FormHelperText>Required</FormHelperText>
                          </FormControl>
                          <FormControl required className={classes.formControlChartDataSource}>
                              <InputLabel id="datasource-list">Datasource</InputLabel>
                              <Select
                                  labelId="datasource-select-required-label"
                                  id="datasource-select-required"
                                  value={selectedDatasourceInfo ? selectedDatasourceInfo.id : null}
                                  onChange={onDatasourceTypeSelectionChange}
                                  className={classes.selectEmpty}
                                  label={"Select Datasource"}
                              >
                                  {dataSourceList.map(dataSourceType => {
                                      return (
                                          <MenuItem key={dataSourceType.id} value={dataSourceType.id}>{dataSourceType.label}</MenuItem>
                                      )
                                  })}
                              </Select>
                              <FormHelperText>Required</FormHelperText>
                          </FormControl>
                          <FormControl required className={classes.formControlChartDataSource}>
                              <TextField value={dataPath} required id="standard-required-datapath"
                                         onChange={evt => setDataPath(evt.target.value)} label="Data path" defaultValue=""/>
                              <FormHelperText>Required</FormHelperText>
                          </FormControl>

                          <Grid item={true} xs={12}>
                              <Fab
                                  variant="extended"
                                  size="small"
                                  color="secondary"
                                  aria-label="add"
                                  className={classes.addTableInfoMargin}
                                  onClick={onAddTableInfoClickHandler}
                                  disabled={((_.isEqual(selectedWidgetInfo.type, Constants.widgets.GRID.type) ||
                                      _.isEqual(selectedWidgetInfo.type, Constants.widgets.GAUGE_CHART.type) ||
                                      _.isEqual(selectedWidgetInfo.type, Constants.widgets.PIE_CHART.type)) &&
                                      tables.length === 0)?false:(_.isEqual(selectedWidgetInfo.type, Constants.widgets.GRID.type) ||
                                      _.isEqual(selectedWidgetInfo.type, Constants.widgets.GAUGE_CHART.type) ||
                                      _.isEqual(selectedWidgetInfo.type, Constants.widgets.PIE_CHART.type))?true:false}>
                                  <AddIcon className={classes.addTableInfoIcon} />
                                  Add Metrics
                              </Fab>
                          </Grid>
                          {tables.map((table) => (
                              <AddTableInfo table={table} onRemove={onRemoveTableInfoClickHandler}/>
                          ))}
                          <Grid container alignItems="flex-start" spacing={1}>
                              <Grid item={true} xs={12}></Grid>
                              <Grid item={true} xs={6}>
                                  <FormControl required className={classes.formControlChartDataSource}>
                                      <TextField
                                          id="date"
                                          label="Start date"
                                          type="datetime-local"
                                          value={startDate}
                                          //defaultValue="2017-05-24"
                                          onChange={evt => setStartDate(evt.target.value)}
                                          InputLabelProps={{
                                              shrink: true,
                                          }}
                                      />
                                  </FormControl>
                              </Grid>
                              <Grid item={true} xs={6}>
                                  <FormControl required className={classes.formControlChartDataSource}>
                                      <TextField
                                          id="date"
                                          label="End date"
                                          type="datetime-local"
                                          value={endDate}
                                          //defaultValue="2017-05-24"
                                          //className={classes.textField}
                                          onChange={evt => setEndDate(evt.target.value)}
                                          InputLabelProps={{
                                              shrink: true,
                                          }}
                                      />
                                  </FormControl>
                              </Grid>
                          </Grid>
                          <Grid item={true} xs={12}>
                              <Button autoFocus onClick={onFetchClickHandler} color="primary">
                                  Fetch
                              </Button>
                          </Grid>
                          {/*<Grid container alignItems="flex-start" spacing={2}>

                          </Grid>*/}
                      </Grid>

                      :
                      <Grid item={true} xs={6}>
                          <Grid container alignItems="flex-start" spacing={1}>

                          </Grid>
                      </Grid>
                  }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onSaveChangeClickHandler} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default WidgetConfigDialog;
