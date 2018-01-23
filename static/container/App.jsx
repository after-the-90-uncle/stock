import React from 'react';
import { BrowserRouter, Route, NavLink ,Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import actions from 'selfRedux/actions';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../auth.entry';
//路由
import router from './router';
import { FadeIn } from "animate-components";

import {message} from 'antd';

import Navigator from 'common/Navigator';

import 'antd.css';

message.config({
  top: 100,
  duration: 2,
});

export default class App extends React.Component{
    constructor(props, context){
      super(props, context);
    }

    initComponent(item){
      let componentName = connect((state) => {
            return {store:state.default , actions };
          })(item.name);

      return item.path == '/login'?
              userIsNotAuthenticatedRedir(componentName)
              :userIsAuthenticatedRedir(componentName);
    }

    render(){

        return (
          <Navigator ref='navigator' >
            <BrowserRouter
              forceRefresh={false}
            >
                <div style={{width:'100%',height:'100%'}}>
                {router.map((item,index) =>{
                  let Component = this.initComponent(item);
                  return (
                        <Route  
                            key={index}
                            path={item.path} 
                            render = {(props) => {
                              if(this.refs.navigator){
                                this.refs.navigator.context = props;
                                this.refs.navigator.isLoginPage(props.location.pathname =='/login')
                              }
                              return (
                                <FadeIn style={{width:'100%',height:'100%'}} key={index} duration=".75s" timingFunction="ease-out">
                                  <Component {...props} />
                                </FadeIn>
                              )
                            }}
                        />
                      )
                })}
               </div>
            </BrowserRouter>
           </Navigator>
        );
    }
}
