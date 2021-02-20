import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import { privateRoutes } from '../../routers';
import { withRouter } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

var topMunes = privateRoutes.filter((item, index) => {
    return item.isTop === true;
})

//var iconType = 'MessageOutlined';
function NewIcon(props) {
    //console.log(props);
    return (
        <span>
            {
                React.createElement(
                    Icon[props.icon]
                )
            }
        </span>
    );
}


@withRouter
class FrameOut extends Component {
    menusHandler = (item) => {
        //console.log(item.key);
        this.props.history.push(item.key);
    }
    render() {
        return (
            <Layout style={{ minHeight: '100%' }}>
                <Header className="header">
                    <div className="logo" />
                    <h2 style={{ color: '#fff' }}>CMS管理系统</h2>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            onClick={this.menusHandler}
                            mode="inline"
                            selectedKeys={[this.props.location.pathname]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                topMunes.map((item, index) => {
                                    return (
                                        <Menu.Item key={item.pathname}>
                                            <NewIcon icon={item.icon} />{item.title}
                                        </Menu.Item>
                                    )
                                })
                            }

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: ' 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                backgroundColor: '#fff',
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default FrameOut
