import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Icon, Input, Popover, Select, message } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { RouteComponentProps } from "react-router";
import CommonHeader from "./../../components/CommonHeader";
import { appStore, authStore } from "src/stores";
import { observer } from "mobx-react-lite";

// import DeptSelect from "src/components/DeptSelect";
import service from 'src/services/api'

import FilterCon from "./components/FilterCon";
// import DeptCreditRecordExportModal from './components/DeptCreditRecordExportModal'
// import RuleInstsEditModal from './components/RuleInstsEditModal'
import { otherEmpService } from "./api/OtherEmpService";
import qs from "qs";
// import createModal from "src/libs/createModal";

const Option = Select.Option;

export interface Props extends RouteComponentProps { }

export default observer(function 其他人员(props: Props) {
  const [query, setQuery] = useState({
    deptCode: authStore.isDepartment ? '' : authStore.selectedDeptCode, //科室
    pageIndex: 1,
    pageSize: 20,
    keyword: "",
    education: "", //学历
    group: "", //分组
  });

  const [queryFilter, setQueryFilter] = useState({
    Xl: "全部",
    Fz: "全部",
  });

  const [tableData, setTableData] = useState([] as any);
  const [deptAllList, setDeptAllList] = useState([] as any);
  const [total, setTotal] = useState(0 as number);
  const [dataLoading, setDataLoading] = useState(false);
  const [filterConVisible, setFilterConVisible] = useState(true);

  const [ruleInsts, setRuleInsts] = useState([])

  // let creditRecordExport = createModal(DeptCreditRecordExportModal)
  // let ruleInstsEditModal = createModal(RuleInstsEditModal)

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
              <span style={{ color: text === '未达标' ? "red" : "" }}>{text}</span>,
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
    // otherEmpService.findAllAreas().then(res => {
    //   console.log(res)
    // })
    getTableData()
    //护理部能查看所有科室
    if (authStore.isDepartment) getDeptAll()
    //南医三学分学时督导规则
    if (appStore.HOSPITAL_ID === 'nys')
      queryRuleInstsCurrentYear()
  }, []);

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
    otherEmpService.getEmpList(_query).then(
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
      case "Fz":
        newQuery.group = value;
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
    otherEmpService
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
      <CommonHeader title={"其他人员"}>
        <span className="float-item title">科室:</span>
        <span className="float-item">
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
        <span className="float-item">
          <Button onClick={() => toGroupSetting()}>分组设置</Button>
        </span>
        {/* <span className="float-item">
          <Button
            onClick={() =>
              creditRecordExport.show({
                deptCode: query.deptCode
              })}>
            导出学分统计
          </Button>
        </span> */}
      </CommonHeader>
      <div className="main-contain">
        <div className="filter-contain">
          <FilterCon
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
            surplusHeight={queryFilter ? 420 : 130}
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
      {/* <creditRecordExport.Component /> */}
      {/* <ruleInstsEditModal.Component /> */}
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
