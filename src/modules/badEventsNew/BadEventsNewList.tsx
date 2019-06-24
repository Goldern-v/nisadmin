import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Form from 'src/components/Form'
import { DatePicker, Select, Button } from 'antd'
import { Link } from 'react-router-dom'
import { ColumnProps } from 'antd/lib/table'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import BadEventsNewService from './api/badEventsNewService'
// import CustomPagination from 'src/components/CustomPagination'

const api = new BadEventsNewService();

// export interface Props { }
const { RangePicker } = DatePicker;

export default observer(function BadEventNewList() {
  const queryForm = React.createRef<Form>();
  //列表请求参数
  const [query, setQuery] = useState({
    wardCode: '',
    dateBegin: '',
    dateEnd: '',
    patientName: '',
    eventType: '',
    eventStatus: ''
  });
  const initDeptList: any = [];
  const [deptList, setDeptList] = useState(initDeptList);
  //列表数据
  const [data, setData] = useState([]);
  //列表Table组件loading状态
  const [dataLoading, setDataLoading] = useState(false);
  //不良事件类型下拉选项
  const initEventTypeList: any = [];
  const [eventTypeList, setEventTypeList] = useState(initEventTypeList);
  //列表Table组件columns配置
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => {
        return index + 1;
      }
    }, {
      title: '事件单号',
      dataIndex: 'badEventOrderNo',
      key: 'badEventOrderNo',
      align: 'center',
      width: 180
    }, {
      title: '科室',
      dataIndex: 'deptName',
      key: 'deptName',
      align: 'center',
      width: 180
    }, {
      title: '事件类别',
      dataIndex: 'eventType',
      key: 'eventType',
      align: 'center',
      width: 90
    }, {
      title: '发生时间',
      dataIndex: 'happenDate',
      key: 'happenDate',
      align: 'center',
      width: 120
    }, {
      title: '事件发生地点',
      dataIndex: 'happenPlace',
      key: 'happenPlace',
      align: 'center'
    }, {
      title: '严重程度',
      dataIndex: 'deverityLevel',
      key: 'deverityLevel',
      align: 'center',
      width: 120
    }, {
      title: 'SAC',
      dataIndex: 'sac',
      key: 'sac',
      align: 'center',
      width: 100
    }, {
      title: '提交医院质量安全管理委员会',
      dataIndex: 'isCommit',
      key: 'isCommit',
      align: 'center',
      width: 150
    }, {
      title: '事件状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      render: (text: string, item: any) => {
        let statusText = ''
        let target = eventStatusList.filter((item1: any) => item1.value == item.status);
        if (target.length > 0) statusText = target[0].name;
        return <span style={{ wordBreak: 'break-word' }}>{statusText}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (text: string, item: any) => {
        return <Link className="view-detail" to={`/badEventsNewDetail/${item.id}/${item.badEventOrderNo}`}>查看</Link>
      }
    }
  ];
  //不良事件状态对应的文本显示
  const eventStatusList = [
    { name: '禁用', value: -1 },
    { name: '保存', value: 0 },
    { name: '护士上报', value: 1 },
    { name: '质管科审核通过', value: 2 },
    { name: '质控科审核不通过', value: -2 },
    { name: '责任科室已处理', value: 3 },
    { name: '质控科已总结', value: 4 },
    { name: '质量委员会已处理', value: 5 }
  ];

  useEffect(() => {
    api.getDeptList()
      .then(res => {
        let data = res.data;
        if (data) {
          let { deptList } = data;
          if (deptList instanceof Array) setDeptList(deptList);
        }
      })

    let deptCode = '';
    if (authStore.user) deptCode = authStore.user.deptCode;
    api
      .getEvetTypetList(deptCode)
      .then(res => {
        let data = res.data;

        if (data instanceof Array) setEventTypeList(data.map((item: any) => item.name))
      })
  }, []);

  useEffect(() => {
    setDataLoading(true);

    api
      .getList(query)
      .then(res => {
        setDataLoading(false);
        let data = res.data;
        if (data) setData(data.map((item: any, idx: number) => {
          return {
            key: idx,
            ...item
          }
        }));
      }, err => {
        setDataLoading(false);
      })
  }, [query]);

  const handleQueryDateRangeChange = (moments: any[]): void => {
    if (moments.length > 0) {
      setQuery({
        ...query,
        dateBegin: moments[0].format('YYYY-MM-DD'),
        dateEnd: moments[1].format('YYYY-MM-DD')
      });
    } else {
      setQuery({
        ...query,
        dateBegin: '',
        dateEnd: ''
      });
    }
  }

  const handleSearch = (): void => {
    let current = queryForm.current;
    if (current) {
      let otherQuery = current.getFields();
      setQuery({
        ...query,
        ...otherQuery
      })
    }
  }

  return <Wrapper>
    <div className="topbar">
      <div className="title">不良事件</div>
      <div className="query">
        <Form ref={queryForm}>
          <div className="float-left">
            <div className="float-item">
              <div className="item-title">事件日期:</div>
              <div className="item-content date-range">
                <RangePicker onChange={handleQueryDateRangeChange} />
              </div>
            </div>
            <div className="float-item">
              <div className="item-title">科室:</div>
              <div className="item-content">
                <Form.Field name="wardCode">
                  <Select defaultValue="">
                    <Select.Option value="">全部</Select.Option>
                    {deptList.map((item: any, idx: number) => {
                      return <Select.Option value={item.code} key={idx}>{item.name}</Select.Option>
                    })}
                  </Select>
                </Form.Field>
              </div>
            </div>
            <div className="float-item">
              <div className="item-title">事件分类:</div>
              <div className="item-content">
                <Form.Field name="eventType">
                  <Select defaultValue="">
                    <Select.Option value="">全部</Select.Option>
                    {eventTypeList.map((item: any, idx: number) => {
                      return <Select.Option value={item} key={idx}>{item}</Select.Option>
                    })}
                  </Select>
                </Form.Field>
              </div>
            </div>
            <div className="float-item">
              <div className="item-title">状态:</div>
              <div className="item-content">
                <Form.Field name="eventStatus">
                  <Select defaultValue="">
                    <Select.Option value="">全部</Select.Option>
                    {eventStatusList.map((item, idx) => {
                      return <Select.Option value={item.value} key={idx}>{item.name}</Select.Option>
                    })}
                  </Select>
                </Form.Field>
              </div>
            </div>
          </div>
          <div className="float-right">
            <Button type="primary" onClick={handleSearch}>查询</Button>
          </div>
        </Form>
      </div>
    </div>
    <div className="main-contain">
      <div className="table-content">
        <BaseTable
          loading={dataLoading}
          columns={columns}
          dataSource={data}
          pagination={false}
          surplusHeight={325} />
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  .topbar{
    padding: 10px 15px;
    height: 100px;
    overflow: hidden;
    .title{
      font-size: 20px;
      line-height: 32px;
      color: #000;
      width: 100%;
    }
    .query{
      margin-top: 10px;
      width: 100%;
      overflow: hidden;
      .float-left{
        float:left;
      }
      .float-right{
        float:right;
      }
      .float-item{
        display: inline-block;
        &:first-of-type{
          .item-title{
            margin-left: 10px;
          }
        }
      }
      .item-title,.item-content{
        display: inline-block;
      }
      .item-title{
        margin-left: 20px;
        margin-right: 5px;
      }
      .item-content{
        width: 180px;
        &.date-range{
          width: 220px;
        }
      }
    }
  }
  .main-contain{
    background: #fff;
    position: absolute;
    left 10px;
    top: 200px;
    right: 10px;
    bottom: 10px;
    .table-content{
      position: absolute;
      left 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .view-detail{
      &:hover{
        cursor: pointer;
        color: #00A680;
      }
    }
`