import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class Employee extends Component {
	constructor(props,context){
		super(props,context);
	}

	render(){
		console.log(this.props , "========Employee")
		return (
			<div onClick={() => {
				this.props.history.push('/login')
			}}>
				Employee
			</div>

		)
	}
}