import actions from 'selfRedux/actions';

import {
    connect
} from 'react-redux';

function connectHelper(fn){
    return connect(
        state=>{
            return {...fn(state), user:state.user, actions};
        }
    ,null,null,{withRef:true});
}

module.exports=connectHelper;
