import React, {useState} from "react";
import { XGrid } from "@material-ui/x-grid";
import { DataGrid } from '@material-ui/data-grid';
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
export const DataGridWidget = (props) => {
    debugger;
    const {widgetConfig} = props;
    const backGroundColor = widgetConfig.backgroundColor;
    const useStyles = makeStyles(theme => ({
        dataGridWrapper: {
            height: '100%',
            background: backGroundColor
        },
    }));

    const dispatch = useDispatch();
    const classes = useStyles();
    const chart = `${widgetConfig.widget_id}_${widgetConfig.widget_info.name}`;
    //const units = widgetConfig.units;

    const [rows, setRows] = useState((widgetConfig.data)?widgetConfig.data.rows:[]);
    const [columns, setColumns] = useState((widgetConfig.data)?widgetConfig.data.columns:[]);
    return(
        <div key={widgetConfig.widget_id} className={classes.dataGridWrapper}>
            <DataGrid rows={rows} columns={columns} autoPageSize={true}/>
        </div>
    )
}
