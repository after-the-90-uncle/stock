import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { login } from 'selfRedux/actions/user'

export default class Login extends Component {
  static displayName = 'Login'

  constructor(props,context){
    super(props,context)
  }

  testClick = async () => {
    let {dispatch,actions} = this.props;
    console.log(this.props , "0000");
    await dispatch(actions.user.login({username:'duhuijie'}))
    // this.props.history.push('/authority/employee');
  }
  
  render(){
    return(
      <div onClick={this.testClick}>
        asdfas
      </div>
    )
  }
}
// export default connect(null, { login })(Login)
