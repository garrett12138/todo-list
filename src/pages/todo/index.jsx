import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Divider, Alert, Modal, message } from 'antd';
import { connect } from 'umi';
import { addItem, updateItem } from '@/services/todo';

const status = [
  <Alert message="待办" type="info" showIcon={false} />,
  <Alert message="已完成" type="success" showIcon />,
  <Alert message="已取消" type="error" showIcon />,
];

class TodoPage extends Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    this.loadData();
  }

  handelSubmit = async (values) => {
    const item = { title: values.title, status: 0 };
    const rsp = await addItem(item);
    if (rsp.code === 0) {
      message.success('添加成功！');
      this.loadData();
    } else {
      message.error(rsp.message);
    }
  };

  updateStatus = async (item, _status) => {
    const rsp = await updateItem({ ...item, status: _status });
    if (rsp.code === 0) {
      message.success('修改成功！');
      this.loadData();
    } else {
      message.error(rsp.message);
    }
  };

  loadData() {
    const { dispatch } = this.props;
    dispatch({ type: 'todo/fetchTodoList', payload: null });
  }

  handleModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { todo } = this.props;
    const { todoList } = todo;
    const { modalVisible } = this.state;
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

export default connect(({ todo }) => ({ todo }))(TodoPage);
