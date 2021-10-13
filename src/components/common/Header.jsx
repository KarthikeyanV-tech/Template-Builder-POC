import React, {useState} from 'react';
import './css/Header.css';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../constants/Constants';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { uuid } from 'uuidv4';
import WidgetConfigDialog from '../content/widgets/WidgetConfigDialog';

const Header = () => {

    const dispatch = useDispatch();   

    const [selectedTemplateId, setSelectedTemplateId] = useState('');

    const [tenantName, setTenantName] = useState('');

    const [openAddTenant, setOpenAddTenant] = useState(false);

    const template_list = useSelector((state) => state.homeReducer.templateData.templates);

    const access_token = useSelector((state) => state.homeReducer.access_token);   
    
    const isOpen = useSelector((state) => state.contentReducer.isOpenConfig); 
    const selectedWidget = useSelector((state) => state.contentReducer.selectedWidget); 

    const rand = () => {
        return Math.round(Math.random() * 20) - 10;
    }

    const getModalStyle = () => {
        const top = 50 + rand();
        const left = 50 + rand();
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const [modalStyle] = React.useState(getModalStyle);

    

    
    

    // const selectedTemplate = useSelector((state) => state.homeReducer.selectedTemplate);

    // const [template_name, setTemplateName] = useState(selectedTemplate.template_name);

    const onclickHandler = () => {
        dispatch({
            type: Constants.EVT_LOGOUT
        });
    };

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 200,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          }
      }));

    const classes = useStyles();

    const handleChange = (event) => {
        setSelectedTemplateId(event.target.value); 
        fireSetTemplateEvent(template_list.find(item => item.template_id === event.target.value));
    };

    const onClickAddNewTenant = () => {
        const blank_template = {...Constants.new_template};
        blank_template.template_name = tenantName;
        blank_template.template_id = uuid();
        blank_template.navigators = [];
        console.log(Constants.new_template);
        dispatch({
            type: Constants.EVT_CREATE_NEW_TENANT,
            value: blank_template
        });            
        setTenantName("");
        setSelectedTemplateId(blank_template.template_id);
        fireSetTemplateEvent(blank_template);
        setOpenAddTenant(false); 
    }

    const fireSetTemplateEvent = (template) => {
        dispatch({
            type: Constants.EVT_SET_TEMPLATE,
            value: template
        });
    }

    /*const onClickAddWidget = (event) => {
        // let new_widget = {...Constants.new_widget};
        // new_widget.title = "Metric";
        // new_widget.widget_info = Constants.widgets.LINE_CHART;
        // new_widget.widget_id = uuid();
        // new_widget.datasource = "http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetlineChartData";
        // new_widget.tables = [];
        // setSelectedWidget(new_widget);  
        // setIsWidgetConfigOpen(true);    
        let new_widget = {...Constants.new_widget};
        new_widget.title = "Metric";
        new_widget.widget_info = Constants.widgets.LINE_CHART;
        new_widget.widget_id = uuid();
        new_widget.data = [];
        new_widget.tables = [{        
            tableName: "cost",
            columns: [{name:"Date"}, {name:"time"}],
            selectedColumns: [{name:"Value"}],
            filters: [{name:"Date"}, {name:"time"}],
            selectedFilters: [],
            color: "",
            id: uuid()
        },
        {        
          tableName: "consumption",
          columns: [{name:"Date"}, {name:"time"}],
          selectedColumns: [{name:"Value"}],
          filters: [{name:"Date"}, {name:"time"}],
          selectedFilters: [],
          color: "",
          id: uuid()
      }];  
     
        dispatch({
          type: Constants.EVT_OPEN_CONFIG,
          value:  new_widget
        });

        // setSelectedWidget(new_widget);  
        // setIsWidgetConfigOpen(true);
    }*/

    const closeAddEditWidgetDialog = () => {
        //setIsWidgetConfigOpen(false);
        dispatch({
            type: Constants.EVT_OPEN_CONFIG,
            value:  selectedWidget
          });
    }

    return(

        <div className="add-template-container">
            <div className="template-selection-container">
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Tenant</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTemplateId}
                    onChange={handleChange}>
                    {
                        template_list ?
                            template_list.map(template => {
                                return (<MenuItem key={template.template_id} 
                                    value={template.template_id}>{template.template_name}</MenuItem>)
                            }) :null
                    }
                </Select>           
                </FormControl> 
                <Button size="small" variant="contained" onClick={()=> setOpenAddTenant(true)}
                    color="primary">+</Button>
            </div>                         
            <div>                
                <Button className="logout-btn" size="small" variant="contained" 
                    onClick={onclickHandler} color="secondary">Logout</Button>                
            </div>    
            <Dialog open={openAddTenant}  onClose={() => setOpenAddTenant(false)} 
                 aria-labelledby="customized-dialog-title">
                <DialogTitle id="customized-dialog-title" onClose={() => setOpenAddTenant(false)}>
                 Add New Tenant
               </DialogTitle>
               <DialogContent dividers>
                    <div style={{width:230, height:70}}>
                        <TextField id="standard-basic" label="Tenant Name" value={tenantName}
                            onChange={(event) => setTenantName(event.target.value)} />
                    </div>
               </DialogContent>
               <DialogActions>
                    <Button autoFocus onClick={() => setOpenAddTenant(false)} color="primary">
                        Cancel
                    </Button>
                    <Button autoFocus onClick={onClickAddNewTenant} color="primary">
                        Add
                    </Button>
                   
               </DialogActions>
            </Dialog>   
            { isOpen ?
                <WidgetConfigDialog widgetConfig={selectedWidget} 
                    onCloseDialog={closeAddEditWidgetDialog}/> : null
            }    
        </div>
        
        
    );
}

export default Header;
