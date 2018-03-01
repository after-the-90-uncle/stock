import React,{Component} from 'react'; 

import { Table, Button,Divider,Modal,message } from 'antd';

import api from 'services/api';

import UserEdit from './UserEdit';


export default class User extends Component{

	constructor(props,context){
		super(props,context);
		this.state ={
			data:[],
			pagination:{
				page:1,
				total:0 ,
				size :10,
				showSizeChanger:true ,
			},
			visible:false,
			userData:{}

		}
	}

	componentDidMount(){
		console.log('======user')
		this.doFetch(1,10)
	}

	async doFetch(page=1,size=10){
		let result = await api('/user/list',{page,size});
		console.log(result)
		if(!result.success){
			return
		}
		let {pagination} = this.state;
		pagination.page = page;
		pagination.size = size;
		pagination.total = result.total;
		this.setState({
			data:result.data,
			pagination,
		})
	}

	getColumns(){
		return [
			{
			  title: '姓名',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '手机号',
			  dataIndex: 'phone',
			  key: 'phone',
			},
			{
			  title: '年龄',
			  dataIndex: 'age',
			  key: 'age',
			},
			{
			  title: '金额',
			  dataIndex: 'amount',
			  key: 'amount',
			},
			{
			  title: '更新时间',
			  dataIndex: 'update_time',
			  key: 'update_time',
			}, 
			{
			  title: '住址',
			  dataIndex: 'address',
			  key: 'address',
			},
			{
			  title: '操作',
			  key: 'action',
			  render: (text, record) => (
			    <span>
			      <a href="#" onClick={() => {
			      	console.log(this.props)
			      	{/*this.props.history.push({pathname:'/user/refund',query:{id:record.id}})*/}
			      }}>查看还款记录</a>
			      <Divider type="vertical" />
			      <a href="#" onClick={this.editUser.bind(this,record)}>编辑</a>
			    </span>
			  ),
			}
		];		
	}

	toPage = () => {

	}

	editUser(userData={}){
		this.setState({visible:true,userData})
	}
	
	hide(){
		this.setState({visible:false,userData:{}});
	}

	handleOk = () => {
		this.refs.userEdit.validateFields((err, values) => {
	        if (err) return 
	    	this.edit(values)
		});
	}
	async edit (values) {
		let {userData} = this.state;
		let result = await api('/user/edit',{...values,id:userData.id});
		if(!result.success){
			message.error(result.error.msg)
			return
		}

		message.success('操作成功' , 1 ,() => {
			this.hide()
			let {pagination} = this.state;
			this.doFetch(1,pagination.size)
		})
	}

	render(){
		let {data,pagination,visible,userData} = this.state;
		
		return (
			<div>
				<Button type="primary" onClick={this.editUser.bind(this)}>添加用户</Button>
				<div style={{height:10}} />
				<Table 
					bordered
					columns={this.getColumns()} 
					size={'default'}
					dataSource={data} 
					onChange={this.toPage} 
					pagination={pagination}
					rowKey={record => record.id}
				/>
				<Modal
					title={userData.id?"编辑用户":'添加用户'}
			        visible={visible}
			        onOk={this.handleOk}
			        onCancel={this.hide.bind(this)}
			        destroyOnClose={true}
				>
				<UserEdit userData={userData} ref='userEdit'/>
				</Modal>
			</div>
		)
	}
}
