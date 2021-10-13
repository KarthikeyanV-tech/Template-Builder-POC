import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {Select} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Input from '@material-ui/core/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from "lodash";
import * as Constants from "./../../../constants/Constants";



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
    },
}));

const AddTableInfo = ({table, onRemove}) => {
    debugger;
    const classes = useStyles();

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

    const [selectedColumn, setSelectedColumn] = useState(table.selectedColumn);
    const [selectedGridColumns, setSelectedGridColumns] = useState(table.selectedGridColumns);
    const [selectedFilters, setSelectedFilters] = useState(table.selectedFilters);
    const [selectedTableName, setSelectedTableName] = useState(table.tableName);

    const onColumnMultiSelectChange = event => {
        setSelectedColumn(event.target.value);
        table.selectedColumn = event.target.value;
    }

    const onFilterMultiSelectChange = event => {
        setSelectedFilters(event.target.value);
        table.selectedFilters = event.target.value;
    }

    const onGridColumnFilterMultiSelectChange = event => {
        setSelectedGridColumns(event.target.value);
        table.selectedGridColumns = event.target.value;
    }

    const onTableInfoChange = event => {
        setSelectedTableName(event.target.value);
        table.tableName = event.target.value;
        // event.preventDefault();
        // event.stopPropagation();
    }


    return(
       
       <Grid container alignItems="flex-start" spacing={1}>
            <Grid item={true} xs={3}>
                <FormControl required className={classes.formControl}>
                    <TextField value={selectedTableName} required id="standard-basic"
                    label="Table Name" defaultValue="" onChange={(evt) => onTableInfoChange(evt)} />
                </FormControl>
            </Grid>
           {
               (_.isEqual(table.selectedWidgetInfo.type, Constants.widgets.GRID.type)) ?
                   <Grid item={true} xs={3}>
                       <FormControl required className={classes.formControlTableColumn}>
                           <InputLabel id="grid-column-list">Columns</InputLabel>
                           <Select
                               labelId="grid-column-select-required-label"
                               id="grid-column-select-required"
                               multiple
                               value={selectedGridColumns}
                               onChange={evt => onGridColumnFilterMultiSelectChange(evt)}
                               className={classes.selectEmpty}
                               label={"Select Filters"}
                               input={<Input />}
                               MenuProps={MenuProps}
                               renderValue={(selected) => selected.join(', ')}>
                               {table.gridColumns.map(filter => {
                                   return (
                                       <MenuItem key={Math.random()+filter} value={filter}>
                                           <Checkbox checked={selectedGridColumns.indexOf(filter) > -1} />
                                           <ListItemText primary={filter} />
                                       </MenuItem>
                                   )
                               })}
                           </Select>
                       </FormControl>
                   </Grid>
                   :
                   <Grid item={true} xs={3}>
                       <FormControl required className={classes.formControlTableColumn}>
                           <InputLabel id="column-list">Columns</InputLabel>
                           <Select
                               labelId="columns-select-required-label"
                               id="columns-select-required"
                               value={selectedColumn}
                               onChange={evt => onColumnMultiSelectChange(evt)}
                               className={classes.selectEmpty}
                               label={"Select Columns"}
                               input={<Input/>}
                               MenuProps={MenuProps}>
                               {table.columns.map(column => {
                                   return (
                                       <MenuItem key={Math.random()} value={column}>{column}</MenuItem>
                                   )
                               })}
                           </Select>

                       </FormControl>
                   </Grid>

           }
           {
               (_.isEqual(table.selectedWidgetInfo.type, Constants.widgets.PIE_CHART.type)) ? null
                   :
                   <Grid item={true} xs={3}>
                       <FormControl required className={classes.formControlTableColumn}>
                           <InputLabel id="filter-list">Filter by</InputLabel>
                           <Select
                               labelId="filter-select-required-label"
                               id="filter-select-required"
                               multiple
                               value={selectedFilters}
                               onChange={evt => onFilterMultiSelectChange(evt)}
                               className={classes.selectEmpty}
                               label={"Select Filters"}
                               input={<Input />}
                               MenuProps={MenuProps}
                               renderValue={(selected) => selected.join(', ')}>
                               {table.filters.map(filter => {
                                   return (
                                       <MenuItem key={Math.random()} value={filter}>
                                           <Checkbox checked={selectedFilters.indexOf(filter) > -1} />
                                           <ListItemText primary={filter} />
                                       </MenuItem>
                                   )
                               })}
                           </Select>
                       </FormControl>
                   </Grid>
           }

            <Grid item={true} xs={3}>
                <FormControl required className={classes.formControlTableColumn}>
                    <DeleteIcon onClick={() => onRemove(table.id)}/>
                </FormControl>
            </Grid>
                    </Grid>
                    );
}

export default AddTableInfo;
