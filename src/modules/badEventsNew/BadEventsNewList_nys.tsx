import BaseTable, { DoCon } from "src/components/BaseTable";
// import Form from "src/components/Form";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import service from 'src/services/api'
// import { Link } from "react-router-dom";
import { ColumnProps } from "antd/lib/table";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";

import BadEventsNewService from "./api/badEventsNewService";
// import CustomPagination from './components/CustomPagination'
import moment from "moment";
import { useKeepAliveEffect } from "react-keep-alive";
import BaseTabs from "src/components/BaseTabs";

const api = new BadEventsNewService();

const { RangePicker } = DatePicker;

export default observer(function BadEventNewList() {

  const defaultDateRange = () => {
    let startDate = moment(moment().format("YYYY-MM-") + "01");
    let ednDate = moment(moment().format("YYYY-MM-DD"));

    return [startDate, ednDate] as [moment.Moment, moment.Moment];
  };

  let dateRange = defaultDateRange()
  const defaultWardCode = authStore.isDepartment ? '' : authStore.defaultDeptCode
  //列表请求参数
  const [query, setQuery] = useState({
    wardCode: defaultWardCode,
    dateBegin: dateRange[0].format("YYYY-MM-DD"),
    dateEnd: dateRange[1].format("YYYY-MM-DD"),
    patientName: "",
    eventType: "",
    eventStatus: "",
    type: '1'
  });

  const [deptList, setDeptList] = useState([] as any);
  //列表数据
  const [data, setData] = useState([] as any);
  //列表Table组件loading状态
  const [dataLoading, setDataLoading] = useState(false);
  //不良事件类型下拉选项
  const [eventTypeList, setEventTypeList] = useState([] as any);
  //前端分页控制
  const [page, setPage] = useState({
    current: 1,
    size: 20
  });
  const [total, setTotal] = useState(0)

  //不良事件状态对应的文本显示
  const [eventStatusList, setEventStatusList] = useState([] as any[])

  //列表Table组件columns配置
  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
      render: (text: string, record: any, idx: number) => (page.current - 1) * 10 + idx + 1
    },
    {
      title: "事件单号",
      dataIndex: "badEventOrderNo",
      key: "badEventOrderNo",
      className: "align-left",
      align: "left",
      width: 160
    },
    {
      title: "科室",
      dataIndex: "deptName",
      key: "deptName",
      className: "align-left",
      align: "left",
      width: 150
    },
    {
      title: "事件类别",
      dataIndex: "eventType",
      key: "eventType",
      className: "align-left",
      align: "left",
      width: 190
    },
    {
      title: "发生时间",
      dataIndex: "happenDate",
      key: "happenDate",
      align: "center",
      width: 100,
      render: (text: string) => {
        let dateStr = text == "Invalid Date" ? "" : text;
        return <span>{dateStr}</span>;
      }
    },
    {
      title: "事件发生地点",
      dataIndex: "happenPlace",
      key: "happenPlace",
      className: "happen-place",
      align: "left",
      render: (text: string) => <div title={text}>{text}</div>
    },
    {
      title: "严重程度",
      dataIndex: "deverityLevel",
      key: "deverityLevel",
      align: "center",
      width: 60
    },
    ...appStore.hisMatch({
      map: {
        'nys': [],
        'other': [
          {
            title: "SAC",
            dataIndex: "sac",
            key: "sac",
            align: "center",
            width: 40
          },
          {
            title: "提交医院质量安全管理委员会",
            dataIndex: "commitToQC",
            key: "commitToQC",
            align: "center",
            width: 110,
            render: (commitToQC: any, item: any) => {
              if (!commitToQC || commitToQC == '不提交')
                return '不提交'
              else
                return '提交'
            }
          },
        ]
      }
    }),
    {
      title: "事件状态",
      dataIndex: "status",
      key: "status",
      className: "align-left",
      align: "left",
      width: 140,
      render: (text: string, item: any) => {
        let statusText = "";
        let target = eventStatusList.filter(
          (item1: any) => item1.code == item.status
        );
        let color = '#000'

        if (!item.allow) {
          if (appStore.HOSPITAL_ID !== 'nys') {
            return <span style={{ color: "red" }}>退回</span>
          } else {
            color = '#f00'
          }
        }

        if (target.length > 0) statusText = target[0].name;
        return <span style={{ wordBreak: "break-word", color }}>{statusText}</span>
      }
    },
    {
      title: "操作",
      key: "operation",
      align: "center",
      width: 100,
      render: (text: string, item: any) => {
        return (
          <DoCon>
            <span onClick={() => appStore.history.push(`/badEventsNewDetail/${item.id}/${item.badEventOrderNo}`)}>查看</span>
          </DoCon>
        );
      }
    }
  ];

  useEffect(() => {
    getDeptListAll()
    getEventTypeList()
    getEventStatusList()
  }, []);

  useEffect(() => {
    getEventList()
  }, [query, page])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      if (!authStore.isDepartment && !query.wardCode) {
        setQuery({ ...query, wardCode: defaultWardCode })
      } else {
        getEventList()
      }
    }

    if (deptList.length <= 0 && authStore.isDepartment) getDeptListAll()
    if (eventTypeList.length <= 0) getEventTypeList()
    if (eventStatusList.length <= 0) getEventStatusList()
    // return () => { }
  })

  const getDeptListAll = () => {
    api.getDeptList("2")
      .then(res => {
        let data = res.data;
        if (data instanceof Array)
          setDeptList(
            data.map((item: any) => {
              return {
                name: item.deptName,
                code: item.deptCode
              }
            })
          )
      })
  }

  const getEventStatusList = () => {
    service.commonApiService
      .dictInfo('badEvent_status')
      .then((res: any) => {
        setEventStatusList(res.data)
      })
  }

  const getEventTypeList = () => {
    let deptCode = "";
    if (authStore.user) deptCode = authStore.user.deptCode;

    api.getEvetTypetList(deptCode).then(res => {
      let data = res.data;

      if (data instanceof Array)
        setEventTypeList(data.map((item: any) => item.name));
    });
  }

  const getEventList = (newQuery?: any) => {
    setDataLoading(true)

    let reqQuery = newQuery ||
    {
      ...query,
      pageIndex: page.current,
      pageSize: page.size
    }

    // console.log(reqQuery)

    let reqMethod = api.getWaitHandler.bind(api)
    if (reqQuery.type == '2') reqMethod = api.getMyHandler.bind(api)

    reqMethod(reqQuery)
      .then(
        res => {
          setDataLoading(false);
          let data = res.data.list;
          let total = res.data.totalCount || 0
          setTotal(total)
          if (data && data.map)
            setData(
              data.map((item: any, idx: number) => {
                return {
                  key: idx,
                  ...item
                };
              })
            );
        },
        err => {
          setDataLoading(false);
        }
      );
  };

  const handleQueryDateRangeChange = (moments: any[]): void => {
    if (moments.length > 0) {
      setQuery({
        ...query,
        dateBegin: moments[0].format("YYYY-MM-DD"),
        dateEnd: moments[1].format("YYYY-MM-DD")
      });
    } else {
      setQuery({
        ...query,
        dateBegin: "",
        dateEnd: ""
      });
    }
  };

  const handleSearch = (): void => {
    setPage({ ...page, current: 1 })
  }

  return (
    <Wrapper>
      <div className="topbar">
        <div className="query">
          <div className="float-left">
            <div className="title">不良事件</div>
          </div>
          <div className="float-right">
            {/* <div className="float-item">
              <div className="item-title">事件日期:</div>
              <div className="item-content date-range">
                <RangePicker
                  onChange={handleQueryDateRangeChange}
                  defaultValue={defaultDateRange()}
                />
              </div>
            </div> */}
            <div className="float-item">
              <div className="item-title">科室:</div>
              <div className="item-content">
                <Select
                  defaultValue=""
                  value={query.wardCode}
                  onChange={(wardCode: any) => setQuery({
                    ...query,
                    wardCode: wardCode || ''
                  })}
                  showSearch
                  allowClear={authStore.isDepartment ? true : false}
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {authStore.isDepartment && <Select.Option value="">全部</Select.Option>}
                  {(authStore.isDepartment ? deptList : authStore.deptList).map((item: any, idx: number) => {
                    return (
                      <Select.Option value={item.code} key={idx}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="float-item">
              <div className="item-title">事件分类:</div>
              <div className="item-content">
                <Select
                  defaultValue=""
                  value={query.eventType}
                  onChange={(eventType: any) => {
                    setQuery({ ...query, eventType });
                  }}
                >
                  <Select.Option value="">全部</Select.Option>
                  {eventTypeList.map((item: any, idx: number) => {
                    return (
                      <Select.Option value={item} key={idx}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            {/* <div className="float-item">
              <div className="item-title">状态:</div>
              <div className="item-content">
                <Select
                  defaultValue=""
                  value={query.eventStatus}
                  onChange={(eventStatus: any) => {
                    setQuery({ ...query, eventStatus });
                  }}
                >
                  <Select.Option value="">全部</Select.Option>
                  {eventStatusList.map((item, idx) => {
                    return (
                      <Select.Option value={item.code} key={idx}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div> */}
            <div className="float-item">
              <div className="item-title" />
              <div className="item-content">
                <Button type="primary" onClick={handleSearch}>
                  查询
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-contain">
        <div className="table-content">
          <BaseTabs
            defaultActiveKey={query.type.toString()}
            config={['待我处理', '我已处理'].map((name: any, idx: number) => {
              return {
                title: name,
                component: (
                  <BaseTable
                    loading={dataLoading}
                    columns={columns}
                    dataSource={data.filter((item: any, idx: number) => {
                      let { current, size } = page;
                      let starIndex = (current - 1) * size;
                      return idx + 1 > starIndex && idx + 1 <= starIndex + size;
                    })}
                    surplusHeight={265}
                    pagination={{
                      showQuickJumper: true,
                      total,
                      current: page.current,
                      pageSize: page.size,
                      onShowSizeChange: (current: number, size: number) => setPage({ ...page, size }),
                      onChange: (current: number) => setPage({ ...page, current })
                    }}
                  />
                ),
                index: (idx + 1).toString()
              }
            })}
            onChange={(type: any) => setQuery({ ...query, type })}
          />
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  /* position:relative; */
  display:flex;
  flex-direction: column;
  height: 100%;
  .topbar{
    padding: 10px 15px;
    height: 55px;
    overflow: hidden;
    .title{
      font-size: 20px;
      line-height: 32px;
      font-weight: bold;
      color: #000;
      width: 100%;
    }
    
    .ant-calendar-picker-input{
      padding-left: 0;
      /* .ant-calendar-range-picker-separator{
        position: relative;
        top: 5px;
      } */
    }
    .query{
      margin-top: 5px;
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
        &.date-range{
          width: 220px;
        }
        .ant-select {
          min-width: 150px;
        }
      }
    }
  }
  .main-contain{
    flex: 1;
    padding: 0 15px;
    /* position: absolute;
    left: 10px;
    top: 60px;
    right: 10px;
    bottom: 10px; */
    .table-content{
      /* position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0; */
      /* overflow: hidden; */
      td.align-left{
        padding-left: 10px!important;
      }
      .happen-place{
        position: relative;
        &>div{
          position: absolute;
          left:0;
          top: 0;
          right: 0;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          padding: 0 10px;
        }
      }
    }
    .custom-pagination{
      position: absolute;
      padding: 10px 15px;
      left:0;
      bottom: 0;
      right: 0;
      .ant-pagination{
        float: right;
      }
    }
    .view-detail{
      cursor: pointer;
      color: #00A680;
      :hover{
        font-weight: bold;
      }
    }
  }
`
