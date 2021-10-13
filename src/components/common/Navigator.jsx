import React from 'react';
import './css/Navigator.css';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from  '../../constants/Constants';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';




const Navigator = () => {
    const navigators = useSelector(state => state.navigatorReducer.navigators);

    const dispatch = useDispatch();

    const onTreeItemClick = (node) => {
        dispatch({
            type: Constants.EVT_SET_SELECTED_NAVIGATOR,
            value: node
        });
        // console.log(node.id);
    };

    const renderTree = (node) => {
        return (<TreeItem key={node.id} nodeId={node.id} label={node.name}
            onLabelClick={() => {onTreeItemClick(node)}}>
            {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
        </TreeItem>);
    }

    return (
        
        
            navigators ? 
        
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            { navigators.map(node => {
               return renderTree(node);
            })
        }
        </TreeView> : null

    
       
    );
}


export default Navigator;