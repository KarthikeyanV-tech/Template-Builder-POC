import React, {useEffect, useContext} from 'react';
import { useHistory} from 'react-router-dom';
import './css/Login.css';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../constants/Constants.js';
import AppContext from '../../constants/AppContext';

const Login = () => {

    const dispatch = useDispatch();

    const context = useContext(AppContext);

    const history = useHistory();

    const isLogged = useSelector(state => state.homeReducer.isLogged);

    useEffect(()=> {
        if(isLogged) {
            history.push("/home");
        } else {
            history.push("/");
        }
    }, [isLogged]);

    const onLoginClick = () => {
        dispatch({
            type: Constants.EVT_LOGIN,
            value: {
                username: Constants.username,
                password: Constants.password,
                grantType: Constants.grantType
            }
        })
    };

    return(
        <div className="login-container">
            <div className="login-control-container">
                <h1>Login Page</h1>
                <button onClick={onLoginClick} className="btn btn-primary">Login</button>
            </div>            
        </div>
        
    );
}

export default Login;