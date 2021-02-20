import React, { Component } from 'react';
import { Card, Button, Table, Tag, Tooltip, Space, Modal } from 'antd';
import { getTopics } from '../../api';

const mapFiledToChinese = {
    id: '编号',
    title: '标题',
    visit_count: '点击次数',
    create_at: '创建时间',
    author: '作者',
}



export default class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            total: 100,
            columns: [],
            visible: false,
            record: {}
        }
    }

    editHandler = (record) => {
        console.log(record);
        this.props.history.push('/admin/article/edit/' + record.id);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    okModal = () => {
        this.hideModal();
        console.log("确认删除！");
    }

    cancelModal = () => {
        this.hideModal();
        console.log("取消删除！");
    }

    delHandler = (record) => {
        //console.log(record);
        this.setState({
            record,
        })
        this.showModal();
    }

    getArticleTopics = (page, limit) => {
        getTopics(page, limit).then((res) => {
            console.log('返回的内容', res.data);

            var rs = [];
            for (let i = 0; i < res.data.length; i++) {
                var tmp = {
                    id: res.data[i]['id'],
                    title: res.data[i]['title'],
                    visit_count: res.data[i]['visit_count'],
                    create_at: res.data[i]['create_at'],
                    author: res.data[i]['author']['loginname'],
                }
                rs.push(tmp);
            }

            //console.log('rs', rs[0]);

            var first = rs[0];
            var keys = Object.keys(first);
            var columns = keys.map((item) => {

                if (item === "visit_count") {
                    return {
                        title: mapFiledToChinese[item],
                        dataIndex: item,
                        key: item,
                        render: (text, record, index) => {
                            return (
                                <Tooltip placement="top" title={record.visit_count > 1000 ? '阅读数高于1000' : '阅读数低于1000'}>
                                    <Tag color={record.visit_count > 1000 ? 'red' : 'green'}>{record.visit_count}</Tag>
                                </Tooltip>
                            )

                        }
                    }
                }


                return {
                    title: mapFiledToChinese[item],
                    dataIndex: item,
                    key: item,
                }
            })

            columns.push({
                title: "操作",
                dataIndex: "action",
                key: "action",
                render: (text, record, index) => {
                    return (
                        <Space size={0}>
                            <Button onClick={() => { this.editHandler(record) }} size="small" type="primary">修改</Button>
                            <Button onClick={() => { this.delHandler(record) }} size="small" type="danger">删除</Button>
                            <Modal
                                title="警告"
                                visible={this.state.visible}
                                onOk={this.okModal}
                                onCancel={this.cancelModal}
                                okText="确认"
                                cancelText="取消"
                            >
                                <p>{this.state.record.title}</p>
                            </Modal>
                        </Space>
                    )

                },
            })

            this.setState({
                dataSource: rs,
                columns
            })


        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.getArticleTopics(1, 2);
    }

    render() {
        return (
            <Card title="文章列表" extra={<Button type="dashed">导出Excel</Button>} >
                <Table
                    rowKey={record => record.id}
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    pagination={{
                        current: 1,
                        total: this.state.total,
                        pageSize: 10
                    }} />
            </Card>
        )
    }
}
