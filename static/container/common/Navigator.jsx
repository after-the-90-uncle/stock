import React , {Component} from 'react';
import ReactDOM from 'react-dom';

import { Menu, Icon, Button,Layout } from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Footer, Sider, Content } = Layout;
import { FadeIn } from "animate-components";
import './styles/navigator.css';
import {Link} from 'react-router-dom'

import {navigatorMenu,urlMapKey} from 'constants/navigatorMenu';
import cookie from 'utils/cookie';


export default class Navigator extends React.PureComponent {

	constructor(props,context){
		super(props,context);
		this.state = {
			collapsed: false,
			isLoginPage:false,
			...this.handleSelectMenu()
		}

	}

	handleSelectMenu(){
		let selectMenu = urlMapKey[location.pathname]||urlMapKey[cookie('selectMenu')||'']||'',
		    path = selectMenu.split('/'),
			select = {},
			le = path.length;
		if(le == 1){
			select.defaultSelectedKeys = [path[0]];
		}else if(le == 2){
			select.defaultOpenKeys = [path[0]];
			select.defaultSelectedKeys = [selectMenu];
		} 
		return select;
	}

	componentDidMount(){
	}

	//导航收起打开事件
	collapsedToggle = () => {
		this.setState({collapsed:!this.state.collapsed})
	}
	//检查是否为登录页面
	isLoginPage = (value) => {
		if(value == this.state.isLoginPage ){
			return
		}
		this.timer = setTimeout(() => {
			this.setState({isLoginPage:value})
		},1)
		
	}
	
	//导航选中事件
	onSelect = (params) => {
		cookie({selectMenu:params.key});
		if(params.key=='logout'){
			this.logout();
			return
		}
		let href = params.item.props.href;
		if(href){
			console.log(this)
			// this.context.history.push(href);
		}
		
	}

	//退出
	logout () {
		window.logout();
	}

	componentWillUnmount(){
		this.timer && clearTimeout(this.timer);
	}

	

	renderMenuItem(menus){
		return menus.map((item,index) => {
			let icon = item.icon?<Icon type={item.icon} />:null;
			if(item.subMenu){
				return (
					<SubMenu 
						key={item.key} 
						title={
							<span>
								{icon}<span>{item.name}</span>
							</span>
						}
					>
						{this.renderMenuItem(item.subMenu)}
			        </SubMenu>
				)
			}
			return (
				<Menu.Item key={item.key} href={item.url} >
	               {icon}
	               <span>{item.name}</span>
	            </Menu.Item>
			)
		})
	}

	render(){
		let {children} = this.props;
		if(this.state.isLoginPage){
			return children
		}
		console.log(children)
		let {defaultOpenKeys,defaultSelectedKeys} = this.state;
		return (
			<FadeIn style={{width:'100%',height:'100%'}} duration=".75s" timingFunction="ease-out">
				<Layout>
			        <Sider
			          trigger={null}
			          collapsible
			          collapsed={this.state.collapsed}
			        >
			          <div className="logo">后台管理</div>
			          <Menu 
			          	theme="dark" 
			          	mode="inline" 
			          	onSelect={this.onSelect}
			          	defaultOpenKeys={defaultOpenKeys||[]}
			          	defaultSelectedKeys={defaultSelectedKeys||[]}
			          >
			            {this.renderMenuItem(navigatorMenu)}
			            <Menu.Item key="logout">
			              <Icon type="poweroff" />
			              <span>退出</span>
			            </Menu.Item>
			          </Menu>
			        </Sider>
			        <Layout>
			          <Header style={{ background: '#fff', padding: 0 }}>
			            <Icon
			              className="trigger"
			              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
			              onClick={this.collapsedToggle}
			            />
			          </Header>
			          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
			            {children}
			          </Content>
			        </Layout>
			    </Layout>
		    </FadeIn>
		)
	}
}

