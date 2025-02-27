import moment from 'moment'
import BaseTabs from 'src/components/BaseTabs'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Button, DatePicker, message, Modal, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { useKeepAliveEffect } from 'react-keep-alive'

import BadEventsNewService from './api/badEventsNewService'

// import Form from "src/components/Form";
// import { Link } from "react-router-dom";
// import CustomPagination from './components/CustomPagination'
const api = new BadEventsNewService();

const { RangePicker } = DatePicker;

export default observer(function BadEventNewList() {

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
    happenedDeptCode: "",
    // dateBegin: dateRange[0].format("YYYY-MM-DD"),
    // dateEnd: dateRange[1].format("YYYY-MM-DD"),
    patientName: "",
    formCodes: [] as string[],
    // eventStatus: "",
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
  const delItem = (row: any) => {
    let happenPlace = row.happenPlace
        ? row.happenPlace.slice(0, 15) + "等场所"
        : "";
      Modal.confirm({
        content: `是否要删除,${row.name || ""}于${row.happenDate ||
          ""} ${row.happenTime || ""}在${happenPlace}因${row.happenReason ||
          ""}发生的${row.eventType || ""}不良事件?`,
        title: "提示",
        onOk: () => {
          setDataLoading(true)
          api.deleteBE(row.id).then((res: any) => {
            message.success('删除成功')
            getEventList()
          }).catch(() => {
            message.warning('删除失败')
            setDataLoading(false)
          })
        }
      })
  }

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
    // {
    //   title: "科室",
    //   dataIndex: "deptName",
    //   key: "deptName",
    //   className: "align-left",
    //   align: "center",
    //   width: 150
    // },
    {
      title: "科室",
      dataIndex: "happenedDeptName",
      key: "happenedDeptName",
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
    {
      title: "发生时间",
      dataIndex: "happenDate",
      key: "happenDate",
      align: "center",
      width: 150,
    },
    {
      title: "事件状态",
      dataIndex: "currentNodePendingName",
      key: "currentNodePendingName",
      align: "center",
      width: 140,
    },
    {
      title: "操作",
      key: "operation",
      align: "center",
      width: 100,
      render: (text: string, item: any) => {
        return (
          <DoCon>
            <span onClick={() => appStore.history.push(`/badEventsNewDetail/${item.id}`)}>查看</span>
            {authStore.isDepartment && <span onClick={() => delItem(item)}>删除</span>}
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
    getTitleCount()
  }, [query, page])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      if (!authStore.isDepartment && !query.happenedDeptCode) {
        setQuery({ ...query, happenedDeptCode: defaultWardCode })
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

    api.getEvetTypetList(deptCode).then(res => {
      let data = res.data;

      if (data instanceof Array)
        setEventTypeList(data);
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

    let reqMethod = api.getPageCanHandle.bind(api)
    if (reqQuery.type == '2') reqMethod = api.getPageByMyHandled.bind(api)

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
  return (
    <Wrapper>
      <div className="topbar">
        <div className="query">
          <div className="float-left">
            <div className="title">不良事件</div>
          </div>
          <div className="float-right">
            <div className="float-item">
              <div className="item-title">科室:</div>
              <div className="item-content">
                <Select
                  defaultValue=""
                  style={{width:200}}
                  value={query.happenedDeptCode}
                  onChange={(happenedDeptCode: any) => setQuery({
                    ...query,
                    happenedDeptCode: happenedDeptCode || ''
                  })}
                  showSearch
                  allowClear={authStore.isDepartment ? true : false}
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {/* {authStore.isDepartment && <Select.Option value="">全部</Select.Option>} */}
                  <Select.Option value="" title="全部">全部</Select.Option>
                  {/* {(authStore.isDepartment ? deptList : authStore.deptList).map((item: any, idx: number) => { */}
                  {deptList.map((item: any, idx: number) => {
                    return (
                      <Select.Option value={item.code} key={idx} title={item.name}>
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
