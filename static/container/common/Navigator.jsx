import React , {Component} from 'react';
import ReactDOM from 'react-dom';

import { Menu, Icon, Button,Layout } from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Footer, Sider, Content } = Layout;

import './styles/navigator.css';

export default class Navigator extends React.PureComponent {

	constructor(props,context){
		super(props,context);
		this.state = {
			collapsed: false,
		}
	}

	collapsedToggle = () => {
		this.setState({collapsed:!this.state.collapsed})
	}
	

	render(){
		let {children} = this.props;
		console.log(this , "==11===this.props")
		return (
			<Layout>
		        <Sider
		          trigger={null}
		          collapsible
		          collapsed={this.state.collapsed}
		        >
		          <div className="logo">后台管理</div>
		          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
		            <Menu.Item key="1">
		              <Icon type="user" />
		              <span>demo 1</span>
		            </Menu.Item>
		            <Menu.Item key="2">
		              <Icon type="video-camera" />
		              <span>nav 2</span>
		            </Menu.Item>
		            <Menu.Item key="3">
		              <Icon type="upload" />
		              <span>nav 3</span>
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
		)
	}
}