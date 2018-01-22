import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import actions from 'selfRedux/actions';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../auth.entry';
//路由
import router from './router';

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
            return {store:state.default , actions};
          })(item.name);

      return item.path == '/login'?
              userIsNotAuthenticatedRedir(componentName)
              :userIsAuthenticatedRedir(componentName);
    }
    render(){
      console.log(this.props , "======this---")
        return (
          <Navigator>
            <BrowserRouter>
                <div>
                {router.map((item,index) =>{
                  return (<Route  
                            key={index} 
                            path={item.path} 
                            component={this.initComponent(item)}
                          />
                        )
                })}
               </div>
            </BrowserRouter>
           </Navigator>
        );
    }
}
