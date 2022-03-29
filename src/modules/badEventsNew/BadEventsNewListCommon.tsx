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
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import BadEventsNewService from "./api/badEventsNewService";
// import CustomPagination from './components/CustomPagination'
import moment from "moment";
import { useKeepAliveEffect } from "react-keep-alive";
import BaseTabs from "src/components/BaseTabs";

const api = new BadEventsNewService();

const { RangePicker } = DatePicker;

export default observer(function BadEventNewList() {
  const [date, setDate]: any = useState(getCurrentMonth());
  const defaultDateRange = () => {
    let startDate = moment(moment().format("YYYY-MM-") + "01");
    let ednDate = moment(moment().format("YYYY-MM-DD"));

    return [startDate, ednDate] as [moment.Moment, moment.Moment];
  };

  // let dateRange = defaultDateRange()
  const defaultWardCode = authStore.isDepartment ? '' : authStore.defaultDeptCode
  //列表请求参数
  const [query, setQuery] = useState({
    // wardCode: defaultWardCode,
    wardCode: "",
    beginDate: date[0].format("YYYY-MM-DD"),
    endDate: date[1].format("YYYY-MM-DD"),
    patientName: "",
    formCodes: [] as string[],
    // eventStatus: "",
    status: "",
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

  //显示待审核 和 已审核数量
  const [titleCount, setTitleCount] = useState({
    toAudit: 0,
    audited: 0,
  })

  //列表Table组件columns配置
  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
      render: (text: string, record: any, idx: number) => (page.current - 1) * page.size + idx + 1
    },
    {
      title: "科室",
      dataIndex: "wardName",
      key: "wardName",
      className: "align-left",
      align: "left",
      width: 150
    },
    {
      title: "事件类别",
      dataIndex: "chainName",
      key: "chainName",
      className: "align-left",
      align: "center",
      width: 190
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 150,
    },
    ...appStore.hisMatch({
      map: {
        lcey: [
          {
            title: "事件状态",
            key: "status",
            align: "center",
            width: 140,
            render: (text: string, item: any) => {
              return (
                <DoCon>
                  <span>{getStatus(item)}</span>
                </DoCon>
              );
            }
          }
        ],
        other: [
          {
            title: "事件状态",
            dataIndex: "currentNodePendingName",
            key: "currentNodePendingName",
            align: "center",
            width: 140,
          }
        ]
      }
    }),
    {
      title: "操作",
      key: "operation",
      align: "center",
      width: 100,
      render: (text: string, item: any) => {
        return (
          <DoCon>
            <span onClick={() => appStore.history.push(`/badEventsNewDetail/${item.id}`)}>查看</span>
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
    if (!['lcey'].includes(appStore.HOSPITAL_ID)) {
      getTitleCount()
    }
  }, [query, page, date])

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
    api.nursingUnit()
      .then(res => {
        let data = res.data.deptList
        if (data instanceof Array)
          setDeptList(
            data.map((item: any) => {
              return {
                name: item.name,
                code: item.code
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

    if (['lcey'].includes(appStore.HOSPITAL_ID)) {
      api.getEvetTypetList(deptCode).then(res => {
        let data = res.data;
        if (data instanceof Array)
          setEventTypeList(data);
      });
    } else {
      api.getBadEventTypeList().then(res => {
        let data = res.data.map((item: any) => {
          return {
            code: item.badEventCode,
            name: item.badEventType,
          }
        })
        setEventTypeList(data);
      })
    }
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

    let reqMethod = api.getPageCanHandle.bind(api)
    if (reqQuery.type == '2') reqMethod = api.getPageByMyHandled.bind(api)
    if (['lcey'].includes(appStore.HOSPITAL_ID)) reqMethod = api.getPage.bind(api)

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

  const getTitleCount = (newQuery?: any) => {
    let reqQuery = newQuery ||
    {
      ...query,
      pageIndex: page.current,
      pageSize: page.size
    }

    Promise.all([
      api.getPageCanHandle(reqQuery),
      api.getPageByMyHandled(reqQuery),
    ])
      .then(res => {
        let toAuditNum = 0
        if (res[0].data.totalCount) toAuditNum = res[0].data.totalCount


        let auditEdNum = 0
        if (res[1].data.totalCount) auditEdNum = res[1].data.totalCount

        setTitleCount({
          toAudit: toAuditNum,
          audited: auditEdNum,
        })
      })
  }

  const handleSearch = (): void => {
    setPage({ ...page, current: 1 })
  }
  const changeTabs = (type: any) => {
    setPage({ current: 1, size: page.size })
    console.log(query, type)
    setQuery({ ...query, type })
  }
  let eventStatusOptions = [
    { code: "", name: "全部" },
    { code: "0", name: "待上报" },
    { code: "1", name: "待质控科分派" },
    { code: "2", name: "待职能部门审核" },
    { code: "3", name: "待职能部门结案" },
    // {code:"4",name:"质控科审核"},
    { code: "4", name: "待质控科结案" },
    { code: "5", name: "完成" },
  ]
  const getStatus = (data: any) => {
    for (let i = 0; i < eventStatusOptions.length; i++) {
      if (eventStatusOptions[i].code == data.status) {
        return eventStatusOptions[i].name;
      }
    }
  }
  return (
    <Wrapper>
      <div className="topbar">
        <div className="query">
          <div className="float-left">
            <div className="title">不良事件</div>
          </div>
          <div className="float-right">
            <div className="float-item">
              <div className="item-title">日期:</div>
              <DatePicker.RangePicker
                value={date}
                onChange={(value: any) => {
                  let beginDate = value[0].format("YYYY-MM-DD")
                  let endDate = value[1].format("YYYY-MM-DD")
                  setDate(value)
                  setQuery({ ...query, beginDate, endDate })
                }}
                allowClear={true}
                style={{ width: 220 }}
              />
            </div>
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
                  {/* {authStore.isDepartment && <Select.Option value="">全部</Select.Option>} */}
                  <Select.Option value="">全部</Select.Option>
                  {/* {(authStore.isDepartment ? deptList : authStore.deptList).map((item: any, idx: number) => { */}
                  {deptList.map((item: any, idx: number) => {
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
                  value={query.formCodes[0] || ''}
                  onChange={(eventType: any) => {
                    setQuery({ ...query, formCodes: eventType ? [eventType] : [] });
                  }}
                >
                  <Select.Option value="">全部</Select.Option>
                  {eventTypeList.map((item: any, idx: number) => {
                    return (
                      <Select.Option value={item.code} key={idx}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            {appStore.HOSPITAL_ID == 'lcey' && <div className="float-item">
              <div className="item-title">事件状态:</div>
              <div className="item-content">
                <Select
                  defaultValue=""
                  value={query.status || ''}
                  onChange={(status: any) => {
                    setQuery({ ...query, status: status || '' });
                  }}
                >
                  {eventStatusOptions.map((item: any, idx: number) => {
                    return (
                      <Select.Option value={item.code} key={idx}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>}
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
          {appStore.HOSPITAL_ID != 'lcey' ? <BaseTabs
            defaultActiveKey={query.type.toString()}
            config={[
              `待我处理(${titleCount.toAudit})`,
              `我已处理(${titleCount.audited})`
            ].map((name: any, idx: number) => {
              return {
                title: name,
                component: (
                  <BaseTable
                    loading={dataLoading}
                    columns={columns}
                    dataSource={data}
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
            onChange={(type: any) => changeTabs(type)}
          /> : <BaseTable
            loading={dataLoading}
            columns={columns}
            dataSource={data}
            surplusHeight={265}
            pagination={{
              showQuickJumper: true,
              total,
              current: page.current,
              pageSize: page.size,
              onShowSizeChange: (current: number, size: number) => setPage({ ...page, size }),
              onChange: (current: number) => setPage({ ...page, current })
            }}
          />}
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
