import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Icon, Input, Popover, Select } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { RouteComponentProps } from "react-router";
import CommonHeader from "./components/CommonHeader";
import { appStore, authStore } from "src/stores";
import { observer } from "mobx-react-lite";

// import DeptSelect from "src/components/DeptSelect";
import service from 'src/services/api'

import FilterCon from "./components/FilterCon";
import DeptCreditRecordExportModal from './components/DeptCreditRecordExportModal'
import RuleInstsEditModal from './components/RuleInstsEditModal'
import { empManageService } from "./views/empDetail/api/EmpManageService";
import qs from "qs";
import { message } from "antd/es";
import createModal from "src/libs/createModal";

const Option = Select.Option;

export interface Props extends RouteComponentProps { }

export default observer(function 人员管理(props: Props) {
  const [query, setQuery] = useState({
    deptCode: authStore.isDepartment ? '' : authStore.selectedDeptCode, //科室
    // area: '',//片区
    pageIndex: 1,
    pageSize: 20,
    keyword: "",
    education: "", //学历
    title: "", //职称
    currentLevel: "", //层级
    job: "", //职务
    groupId: "", //分组
  });

  const [queryFilter, setQueryFilter] = useState({
    Xl: "全部",
    Zc: "全部",
    Cj: "全部",
    Zw: "全部",
    Fz: "全部"
  });

  const tableSupHeight = appStore.HOSPITAL_ID == 'hj' ? 450 : 420
  const tableHidenSupHeight = appStore.HOSPITAL_ID == 'hj' ? 160 : 130

  const [tableData, setTableData] = useState([] as any);
  const [deptAllList, setDeptAllList] = useState([] as any);
  const [total, setTotal] = useState(0 as number);
  const [dataLoading, setDataLoading] = useState(false);
  const [filterConVisible, setFilterConVisible] = useState(true);
  const [groupList, setGroupList] = useState([] as any)

  const [ruleInsts, setRuleInsts] = useState([])

  let creditRecordExport = createModal(DeptCreditRecordExportModal)
  let ruleInstsEditModal = createModal(RuleInstsEditModal)

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      key: "key",
      width: 50,
      align: "center",
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: "工号",
      key: "empNo",
      dataIndex: "empNo",
      width: 80,
      align: "center"
    },
    {
      title: "姓名",
      key: "empName",
      dataIndex: "empName",
      width: 80,
      align: "center"
    },
    {
      title: "性别",
      key: "sex",
      dataIndex: "sex",
      width: 80,
      align: "center",
      // render: (text: any) => (text == 0 ? "女" : "男")
    },
    {
      title: "年龄",
      key: "age",
      dataIndex: "age",
      width: 50,
      align: "center"
    },
    ...appStore.hisMatch({
      map: {
        hj: [
          {
            title: "分组",
            key: "groupNames",
            dataIndex: "groupNames",
            width: 120,
            className: 'elips-td',
            align: "center",
            render: (text: any) => {
              return <div title={text}>{text}</div>
            }
          },
        ],
        other: []
      }
    }),
    {
      title: "科室",
      key: "deptName",
      dataIndex: "deptName",
      width: 150,
      className: "align-left",
      align: "left"
    },
    {
      title: "职务",
      key: "job",
      dataIndex: "job",
      width: 80,
      align: "center"
    },
    {
      title: "职称",
      key: "title",
      dataIndex: "title",
      width: 80,
      align: "center"
    },
    {
      title: "层级",
      key: "nurseHierarchy",
      dataIndex: "nurseHierarchy",
      width: 50,
      align: "center"
    },
    {
      title: "学历",
      key: "highestEducation",
      dataIndex: "highestEducation",
      width: 50,
      align: "center"
    },
    {
      title: "学分",
      key: "credit",
      dataIndex: "credit",
      width: 50,
      align: "center",
      render: (text: any) => text || '0',
    },
    ...appStore.hisMatch({
      map: {
        nys: [
          {
            title: <span>
              <span>学分督导</span>
              <Popover content={<MinTableCon>
                <table>
                  <tbody>
                    <tr className="header">
                      <td>层级</td>
                      <td>最低学分要求</td>
                    </tr>
                    {ruleInsts.map((item: any) =>
                      <tr key={item.ruleItem}>
                        <td>{item.ruleItem}</td>
                        <td>{item.minimumCredit}</td>
                      </tr>)}
                  </tbody>
                </table>
              </MinTableCon>}>
                <Icon
                  type="question-circle"
                  theme="filled"
                  style={{
                    marginLeft: "5px",
                    cursor: 'pointer',
                  }}
                />
              </Popover>
            </span>,
            key: "creditSpv",
            dataIndex: "creditSpv",
            width: 50,
            align: "center",
            render: (text: any) =>
              <span style={{ color: text === '未达标' ? "red" : "green" }}>{text}</span>,
          },
        ],
        other: []
      }
    }),
    {
      title: "学时",
      key: "classHours",
      dataIndex: "classHours",
      width: 50,
      align: "center",
      render: (text: any) => text || '0',
    },
    ...appStore.hisMatch({
      map: {
        nys: [
          {
            title: <span>
              <span>学时督导</span>
              <Popover content={<MinTableCon>
                <table>
                  <tbody>
                    <tr className="header">
                      <td>层级</td>
                      <td>最低学时要求</td>
                    </tr>
                    {ruleInsts.map((item: any) =>
                      <tr key={item.ruleItem}>
                        <td>{item.ruleItem}</td>
                        <td>{item.minimumClassHours}</td>
                      </tr>)}
                  </tbody>
                </table>
              </MinTableCon>}>
                <Icon
                  type="question-circle"
                  theme="filled"
                  style={{
                    marginLeft: "5px",
                    cursor: 'pointer',
                  }}
                />
              </Popover>
            </span>,
            key: "classHourSpv",
            dataIndex: "classHourSpv",
            width: 50,
            align: "center",
            render: (text: any) =>
              <span style={{ color: text === '未达标' ? "red" : "green" }}>{text}</span>,
          },
        ],
        other: []
      }
    }),
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      width: 50,
      align: "center"
    },
    {
      title: "操作",
      key: "operation",
      width: 60,
      align: "center",
      render: (text: string, record: any) => {
        return (
          <span onClick={() => handleReview(record)} className="review">
            查看
          </span>
        );
      }
    }
  ];

  useEffect(() => {

    getTableData()

    //护理部能查看所有科室
    if (authStore.isDepartment) getDeptAll()

    if (appStore.HOSPITAL_ID === 'nys') {
      //南医三学分学时督导规则
      queryRuleInstsCurrentYear()
    } else if (appStore.HOSPITAL_ID === 'hj') {
      getGroupList()
    }
  }, []);

  const getGroupList = () => {
    empManageService.queryPersonGroupList()
      .then(res => {
        setGroupList(res.data ? res.data.sort((a: any, b: any) => a.sort - b.sort) : [])
      })
  }

  const handleReview = (record: any) => {
    if (!authStore.isNotANormalNurse) {
      message.error('非护士长以上权限，无法查看')
      return
    }
    let search = {
      empNo: record.empNo,
      empName: record.empName,
      newTitle: record.title,
      nurseHierarchy: record.nurseHierarchy,
      deptCode: record.deptCode,
      deptName: record.deptName,
      status: record.status,
      nearImageUrl: record.nearImageUrl
    };
    appStore.history.push(
      `/continuingEduEmpDetail/baseInfo?${qs.stringify(search)}`
    );
  };

  const handleDeptChange = (deptCode: any) => {
    let newQuery = { ...query, deptCode, pageIndex: 1 };

    setQuery(newQuery);
    getTableData(newQuery);
  };

  const handleSearch = () => {
    let newQuery = { ...query, pageIndex: 1 };
    getTableData(newQuery);
  };

  const getTableData = (other?: any) => {
    let _query = Object.assign({}, query, other || {});
    // console.log(_query)
    setDataLoading(true);
    empManageService.getEmpList(_query).then(
      res => {
        setDataLoading(false);
        if (res.data) {
          setTableData(res.data.list || []);
          setTotal(res.data.totalCount || 0);
        }
      },
      err => {
        setDataLoading(false);
      }
    );
    // setTimeout(() => {
    //   setDataLoading(false)
    // }, 1000)
  };

  const handlePageChange = (pageIndex: number) => {
    let newQuery = { ...query, pageIndex };
    setQuery(newQuery);
    getTableData(newQuery);
  };

  const handleSizeChange = (pageIndex: number, pageSize: number) => {
    let newQuery = { ...query, pageIndex: 1, pageSize };
    setQuery(newQuery);
    getTableData(newQuery);
  };

  const handleFilterConVisibleChange = (visible: boolean) => {
    setFilterConVisible(visible);
  };

  const handleFilterAdapterChange = (name: any, value: any) => {
    // console.log(name, value)
    setQueryFilter({ ...queryFilter, [`${name}`]: value });
    let newQuery = { ...query };
    value = value == "全部" ? "" : value;
    switch (name) {
      case "Xl":
        newQuery.education = value;
        break;
      case "Zc":
        newQuery.title = value;
        break;
      case "Cj":
        newQuery.currentLevel = value;
        break;
      case "Zw":
      case "Jxrz":
        newQuery.job = value;
        break;
      case "Fz":
        let target = groupList.find((item: any) => item.groupName === value)
        if (target)
          newQuery.groupId = target.id;
        else
          newQuery.groupId = ''
        break;
    }
    setQuery(newQuery);
    getTableData(newQuery);
  };

  const switchWrapperName = () => {
    let classList = [] as any;
    if (filterConVisible) classList.push("filter-con-visible");
    return classList.join(" ");
  };

  const deptOptions = () => {
    if (authStore.isDepartment) {
      return [
        <Option value='' key="">全部</Option>,
        ...deptAllList.map((item: any, idx: number) =>
          <Option value={item.code} key={idx} title={item.name}>{item.name}</Option>)
      ]
    } else {
      return authStore.deptList.map((item: any, idx: number) =>
        <Option value={item.code} key={idx} title={item.name}>{item.name}</Option>)
    }
  }

  const handleSearchInputChange = (e: any) => {
    if (e.target.value == query.keyword) return;

    let newQuery = { ...query, keyword: e.target.value, pageIndex: 1 };
    setQuery(newQuery);
    getTableData(newQuery);
  };

  const getDeptAll = () => {
    service.commonApiService.getNursingUnitAll().then(res => {
      if (res.data.deptList) setDeptAllList(res.data.deptList)
    })
  }

  /**获取当年的学分学时督导规则 */
  const queryRuleInstsCurrentYear = () => {
    empManageService
      .queryRuleInstsCurrentYear()
      .then(res => {
        if (res.data) setRuleInsts(res.data.instDtoList || [])
      })
  }

  /**分组设置 */
  const toGroupSetting = () => {
    appStore.history.push('/continuingEdu/人员分组设置')
  }

  return (
    <Wrapper className={switchWrapperName()}>
      <CommonHeader title={"人员管理"}>
        <span className="float-item title">科室:</span>
        <span className="float-item">
          {/* <DeptSelect onChange={handleDeptChange} /> */}
          <Select
            style={{ width: 180 }}
            value={query.deptCode}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={handleDeptChange}>
            {deptOptions()}
          </Select>
        </span>
        {/* <span className='float-item title'>片区:</span>
        <span className='float-item'>
          <Select defaultValue='' className='dept-list'>
            <Option value=''>全部</Option>
          </Select>
        </span> */}
        <span className="float-item input-search">
          <Input
            defaultValue={query.keyword}
            onBlur={handleSearchInputChange}
          />
        </span>
        <span className="float-item">
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </span>
        {appStore.HOSPITAL_ID === 'hj' && authStore.isDepartment && (
          <span className="float-item">
            <Button onClick={() => toGroupSetting()}>分组设置</Button>
          </span>
        )}
        <span className="float-item">
          <Button
            onClick={() =>
              creditRecordExport.show({
                deptCode: query.deptCode
              })}>
            导出学分统计
          </Button>
        </span>
        {appStore.HOSPITAL_ID === 'nys' && (
          <span className="float-item">
            <Button
              onClick={() =>
                ruleInstsEditModal.show({
                  okCallback: () => getTableData()
                })}>
              编辑学分学时督导
            </Button>
          </span>
        )}
      </CommonHeader>
      <div className="main-contain">
        <div className="filter-contain">
          <FilterCon
            groupList={groupList}
            filter={queryFilter}
            isOpenFilter={filterConVisible}
            onVisibleChange={handleFilterConVisibleChange}
            filterAdapterChange={handleFilterAdapterChange}
          />
        </div>
        <div className="table-contain">
          <BaseTable
            loading={dataLoading}
            columns={columns}
            surplusWidth={200}
            surplusHeight={queryFilter ? tableSupHeight : tableHidenSupHeight}
            onRow={(record: any) => {
              return {
                onDoubleClick: () => handleReview(record)
              }
            }}
            pagination={{
              current: query.pageIndex,
              total: total,
              pageSize: query.pageSize,
              pageSizeOptions: ["10", "20", "30"],
              showSizeChanger: true,
              onChange: handlePageChange,
              onShowSizeChange: handleSizeChange
            }}
            // type={['spaceRow']}
            dataSource={tableData}
          />
        </div>
      </div>
      <creditRecordExport.Component />
      <ruleInstsEditModal.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  .common-header-continnuing-edu{
    margin-top: -60px;
    .float-item{
      &.input-search{
        width: 180px;
        margin-right:5px;
      }
      .dept-list{
        min-width: 150px;
      }
    }
  }
    
  .main-contain{
    width: 100%;
    height: 100%;
    padding: 40px 15px 10px 15px;
    .filter-contain{
      margin-top: -40px;
      margin-bottom: 10px;
    }
    #baseTable{
      box-shadow: 0px 2px 4px rgba(0,0,0,0.15);
    }
    .table-contain{
      width: 100%;
      height: 100%;
    }
    td{
      &.align-left{
        padding-left: 10px!important;
      }
      font-weight: normal;
      .review{
        cursor: pointer;
        color: #00A680;
        :hover{
          font-weight: bold;
        }
      }
    }
  }

  &.filter-con-visible{
    .main-contain{
      padding-top: 225px;
      .filter-contain{
        margin-top: -225px;
        margin-bottom: 10px;
      }
    }
  }
  .elips-td{
    position: relative;
    &>div{
      text-align: left;
      width: 100%;
      padding: 0 8px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
`;

const MinTableCon = styled.div`
  table,table tr th, table tr td { 
    border:1px solid #ccc;
  }
  td{
    padding: 5px 10px;
  }
  table { 
    text-align: center; 
    border-collapse: collapse;
  }
  .header{
    background: #eee;
    font-weight: bold;
  }
`
