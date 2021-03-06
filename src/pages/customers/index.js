import { Table, Button, Row, Col, Card, Input, Select } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { connect } from 'dva';
const { Search } = Input;
const { Option } = Select;

class Customers extends Component {
  state = {
    name: '',
  };
  handleChange = value => {
    this.setState({
      name: value,
    });
    console.log(value);
  };
  componentDidMount() {
    const { get_Customers } = this.props;
    get_Customers();
  }
  render() {
    const selectBefore = (
      <Select
        defaultValue="请选择过滤方式"
        onChange={value => this.handleChange(value)}
        autoClearSearchValue
      >
        <Option value="name">名字</Option>
        <Option value="orders_count">订单数量</Option>
      </Select>
    );
    const {
      customers,
      setFilter,
      get_Customers,
      get_Customers_name,
      resetFilter,
      loading,
    } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    const columns = [
      {
        title: '名字',
        dataIndex: 'first_name',
        key: 'name',
        render: (first_name, record) => first_name + ' ' + record.last_name,
      },
      {
        title: '地址',
        dataIndex: 'default_address',
        key: 'default_address',
        render: default_address => default_address.province + ' ' + default_address.city,
      },
      {
        title: '订单数量',
        dataIndex: 'orders_count',
        key: 'orders_count',
        render: orders_count => orders_count,
      },
      {
        title: '订单总价',
        dataIndex: 'total_spent',
        key: 'total_spent',
        render: total_spent => '￥' + total_spent,
      },
    ];

    return (
      <PageHeaderWrapper>
        <Card>
          <Row type="flex">
            <Col span={1} order={2} offset={16}>
              <Button
                onClick={() => {
                  location.hash = '#/customers/Addcustomers';
                }}
              >
                添加客户
              </Button>
            </Col>
            <Col span={6} order={1}>
              <Search
                addonBefore={selectBefore}
                onSearch={value => {
                  if (this.state.name == 'name') {
                    setFilter({ name: this.state.name, value });
                    get_Customers_name();
                  } else {
                    setFilter({ name: this.state.name, value });
                    get_Customers();
                  }
                }}
              />
            </Col>
          </Row>
          <Button
            onClick={() => {
              resetFilter(), get_Customers();
            }}
          >
            重置
          </Button>
          <Table
            columns={columns}
            dataSource={customers}
            rowSelection={rowSelection}
            loading={loading}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
const mapStateToProps = ({ customers, loading }) => ({
  customers: customers.Customers,
  loading: loading.models['ordcustomersrs'],
});

const mapDispatchToProps = dispatch => ({
  get_Customers: () =>
    dispatch({
      type: 'customers/fetch',
    }),
  get_Customers_name: () =>
    dispatch({
      type: 'customers/byname',
    }),
  setFilter: filter =>
    dispatch({
      type: 'customers/query_Customers',
      payload: filter,
    }),
  resetFilter: () =>
    dispatch({
      type: 'customers/resetFilter',
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
