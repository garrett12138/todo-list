import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Divider, Alert, Modal } from 'antd';

const status = [
  <Alert message="待办" type="info" showIcon={false} />,
  <Alert message="已完成" type="success" showIcon />,
  <Alert message="已取消" type="error" showIcon />,
];

class TodoPage extends Component {
  state = {
    modalVisible: false,
    todoList: [
      {
        id: 8,
        title: '完成Antd-Pro-Generator手动添加接口并生成代码',
        status: 0,
      },
      {
        id: 7,
        title: '修改Antd-Pro-Generator UI',
        status: 0,
      },
      {
        id: 6,
        title: '完善Antd-Pro-Generator数据类型定义',
        status: 0,
      },
      {
        id: 5,
        title: '文章使用Antd-Pro-Generator生成代码',
        status: 1,
      },
      {
        id: 4,
        title: 'Antd-Pro-Generator支持TypeScript',
        status: 2,
      },
      {
        id: 3,
        title: '发布Antd-Pro-Generator vscode 插件',
        status: 1,
      },
      {
        id: 2,
        title: '文章Ant Design Pro 快速入门',
        status: 1,
      },
      {
        id: 1,
        title: '文章React快速入门',
        status: 1,
      },
    ],
  };

  componentDidMount() {}

  handelSubmit = async (values) => {
    const { todoList } = this.state;
    const item = { id: todoList.length + 1, title: values.title, status: 0 };
    this.setState({ todoList: [item, ...todoList] });
  };

  handleModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  updateStatus(item, _status) {
    const { todoList } = this.state;
    for (let i = 0; i < todoList.length; i += 1) {
      if (todoList[i].id === item.id) {
        todoList[i].status = _status;
        break;
      }
    }
    this.setState({ todoList: [...todoList] });
  }

  render() {
    const { todoList, modalVisible } = this.state;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        hideInForm: true,
      },
      {
        title: '标题',
        dataIndex: 'title',
        rules: [
          {
            required: true,
            message: '待办事项标题不能为空',
          },
        ],
      },
      {
        title: '状态',
        dataIndex: 'status',
        hideInForm: true,
        render: (val) => status[val],
      },
      {
        title: '修改状态',
        hideInForm: true,
        render: (_, record) => {
          const operations = [];
          if (record.status !== 0) {
            operations.push(
              <a key="normal" onClick={() => this.updateStatus(record, 0)}>
                {' '}
                待办
              </a>,
            );
          }
          if (record.status !== 1) {
            if (operations.length > 0) {
              operations.push(<Divider key="done-divider" type="vertical" />);
            }
            operations.push(
              <a key="done" onClick={() => this.updateStatus(record, 1)}>
                {' '}
                完成
              </a>,
            );
          }
          if (record.status !== 2) {
            if (operations.length > 0) {
              operations.push(<Divider key="canceled-divider" type="vertical" />);
            }
            operations.push(
              <a key="canceled" onClick={() => this.updateStatus(record, 2)}>
                {' '}
                取消
              </a>,
            );
          }
          return <>{operations}</>;
        },
      },
    ];
    return (
      <PageHeaderWrapper>
        <ProTable
          headerTitle="待办事项列表"
          rowKey="id"
          toolBarRender={() => [
            <Button type="primary" onClick={() => this.handleModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          search={false}
          dataSource={todoList}
          columns={columns}
          pagination={false}
          rowSelection={false}
          expandable={false}
        />
        <Modal
          destroyOnClose
          title="新建待办事项"
          visible={modalVisible}
          onCancel={() => this.handleModalVisible(false)}
          footer={null}
        >
          <ProTable
            onSubmit={async (values) => {
              await this.handelSubmit(values);
              this.handleModalVisible(false);
            }}
            rowKey="key"
            type="form"
            columns={columns}
          />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default TodoPage;
