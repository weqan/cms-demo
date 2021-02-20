import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { getOneArticle } from '../../api';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

class ArticleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleDetail: {}
        }
    }

    formRef = React.createRef();
    onFinish = (values) => {
        console.log(values);
    };

    getOneArticle = (aid) => {
        getOneArticle(aid).then((res) => {
            console.log('res', res.data);
            this.setState({
                articleDetail: res.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }


    componentDidMount() {
        var aid = this.props.match.params.id;
        this.getOneArticle(aid);
    }

    onFill = () => {
        this.formRef.current.setFieldsValue({
            title: this.state.articleDetail.title,
        });
    };
    componentDidUpdate() {
        this.onFill()
    }

    render() {
        console.log('form', this.props);

        return (
            <Card title="文章编辑" extra={<Button type="danger" onClick={this.props.history.goBack}>取消</Button>} style={{ width: '100%' }}>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="title"
                        label="标题"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            修改
                    </Button>
                    </Form.Item>
                </Form>
            </Card>


        );
    }
}

export default ArticleEdit