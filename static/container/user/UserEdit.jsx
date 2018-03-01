import React ,{Component} from 'react';

import { Form, Button,Divider,Modal,Input,DatePicker,message } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class UserEdit extends Component {

	constructor(props){
		super(props);
		this.state ={
		}
		console.log(this.props.userData)
	}

	handleOk (){

	}

	render (){
		let {userData} = this.props;
		const { getFieldDecorator } = this.props.form;
		let {visible} = this.state;
		return (
			<Form>
				<FormItem
			      {...formItemLayout}
			      label="姓名"
			    >
			      	{getFieldDecorator('name', {
			            rules: [
			            	{ required: true, message: '请输入姓名' }
			            ],
			            initialValue:userData.name
			        })(
			            <Input placeholder='请输入姓名'/>
			        )}
			    </FormItem>
			    <FormItem
			      {...formItemLayout}
			      label="年龄"
			    >
			      	{getFieldDecorator('age', {
			            rules: [
			            	{ required: true, message: '请输入年龄' }
			            ],
			            initialValue:userData.age
			        })(
			            <Input placeholder='请输入年龄'/>
			        )}
			    </FormItem>
			    <FormItem
			      {...formItemLayout}
			      label="手机号"
			    >
			      	{getFieldDecorator('phone', {
			            rules: [
			            	{ required: true, message: '请输入手机号' }
			            ],
			            initialValue:userData.phone
			        })(
			            <Input placeholder='请输入手机号'/>
			        )}
			    </FormItem>
			    <FormItem
			      {...formItemLayout}
			      label="金额"
			    >
			      	{getFieldDecorator('amount', {
			            rules: [
			            	{ required: true, message: '请输入金额' }
			            ],
			            initialValue:userData.amount
			        })(
			            <Input placeholder='请输入金额'/>
			        )}
			    </FormItem>
			    <FormItem
			      {...formItemLayout}
			      label="地址"
			    >
			      	{getFieldDecorator('address', {
			            rules: [
			            	{ required: true, message: '请输入地址' }
			            ],
			            initialValue:userData.address
			        })(
			            <TextArea placeholder='请输入地址'/>
			        )}
			    </FormItem>
				<FormItem
			      {...formItemLayout}
			      label="备注"
			    >
			      	{getFieldDecorator('remark',{
			      		initialValue:userData.remark
			      	})(
			            <TextArea placeholder='请输入备注'/>
			        )}
			    </FormItem>
			</Form>
		)
	}
}

export default Form.create()(UserEdit);