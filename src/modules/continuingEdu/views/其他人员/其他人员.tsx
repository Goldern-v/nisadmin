import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Button,
  // Icon, 
  Input,
  // Popover, 
  Select, message, Modal,
} from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
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
import EditModal from './components/EidtModal'
import ImportTemlateModal from './components/ImportTemlateModal'
import { otherEmpService } from "./api/OtherEmpService";
import qs from "qs";
// import createModal from "src/libs/createModal";

const Option = Select.Option;

export interface Props extends RouteComponentProps { }

export default observer(function 其他人员(props: Props) {
  const [query, setQuery] = useState({
    // deptCode: authStore.isDepartment ? '' : authStore.selectedDeptCode, //科室
    pageIndex: 1,
    pageSize: 20,
    keyWord: "",
    education: "", //学历
    groupId: "", //分组
  });

  const [queryFilter, setQueryFilter] = useState({
    Xl: "全部",
    Fz: "全部",
  });

  const [tableData, setTableData] = useState([] as any);
  const [deptAllList, setDeptAllList] = useState([] as any);
  const [total, setTotal] = useState(0 as number);
  const [groupList, setGroupList] = useState([] as any);
  const [dataLoading, setDataLoading] = useState(false);
  const [filterConVisible, setFilterConVisible] = useState(true);

  const [editVisible, setEditVisible] = useState(false)
  const [isAdd, setIsAdd] = useState(true)
  const [recordSelected, setRecordSelected] = useState({} as any)
  const [importVisible, setImportVisible] = useState(false)
  // const [ruleInsts, setRuleInsts] = useState([])

  // let creditRecordExport = createModal(DeptCreditRecordExportModal)
  // let ruleInstsEditModal = createModal(RuleInstsEditModal)

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      width: 50,
      align: "center",
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: "编号",
      dataIndex: "identifier",
      width: 80,
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "userTypeName",
      width: 90,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "name",
      width: 80,
      align: "center"
    },
    {
      title: "性别",
      key: "sex",
      dataIndex: "sex",
      width: 80,
      align: "center",
    },
    {
      title: "年龄",
      key: "age",
      dataIndex: "age",
      width: 50,
      align: "center",
      render: (text: any, record: any) => {
        if (record.userType == '2') return text
        return ''
      }
    },
    {
      title: "院校",
      dataIndex: "schoolName",
      width: 120,
      align: "center"
    },
    {
      title: "原单位",
      dataIndex: "originalWorkUnit",
      width: 120,
      align: "center"
    },
    {
      title: "专业",
      dataIndex: "major",
      width: 80,
      align: "center"
    },
    {
      title: "职称",
      dataIndex: "title",
      width: 80,
      align: "center"
    },
    {
      title: "学历",
      dataIndex: "education",
      width: 60,
      align: "center"
    },
    {
      title: "分组",
      dataIndex: "groupNames",
      width: 120,
      align: "center"
    },
    {
      title: "科室",
      dataIndex: "deptName",
      width: 150,
      align: "center"
    },
    {
      title: "原科室",
      dataIndex: "originalDepartment",
      width: 150,
      align: "center"
    },
    {
      title: "身份证号",
      dataIndex: "idCardNo",
      width: 180,
      align: "center"
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      width: 150,
      align: "center"
    },
    {
      title: "是否住宿",
      dataIndex: "isResident",
      width: 60,
      align: "center"
    },
    {
      title: "宿舍号",
      dataIndex: "dormitoryNumber",
      width: 60,
      align: "center"
    },
    {
      title: "实习时间",
      dataIndex: "internshipBegin",
      width: 180,
      align: "center",
      render: (text: any, record: any) => {
        let viewText = ''
        if (text) viewText += text
        if (record.internshipEnd) viewText += `~${record.internshipEnd}`
        return viewText
      }
    },
    {
      title: "进修时间",
      dataIndex: "refresherTimeBegin",
      width: 180,
      align: "center",
      render: (text: any, record: any) => {
        let viewText = ''
        if (text) viewText += text
        if (record.refresherTimeEnd) viewText += `~${record.refresherTimeEnd}`
        return viewText
      }
    },
    {
      title: "是否组长",
      dataIndex: "isGroupLeader",
      width: 60,
      align: "center"
    },
    {
      title: "进修科室一",
      dataIndex: "refresherDeptName01",
      width: 150,
      align: "center"
    },
    {
      title: "进修科室二",
      dataIndex: "refresherDeptName02",
      width: 150,
      align: "center"
    },
    {
      title: "家庭地址",
      dataIndex: "address",
      width: 200,
      align: "center"
    },
    {
      title: "紧急联系人",
      dataIndex: "emergencyContactPerson",
      width: 80,
      align: "center"
    },
    {
      title: "紧急联系人电话",
      dataIndex: "emergencyContactPhone",
      width: 120,
      align: "center"
    },
    {
      title: "操作",
      key: "operation",
      width: 120,
      align: "center",
      render: (text: string, record: any) => {
        return <DoCon>
          <span onClick={() => handleReview(record)} className="review">
            查看
          </span>
          <span onClick={() => handleEditEmp(record)}>编辑</span>
          <span onClick={() => handleDeleteEmp(record)}>删除</span>
        </DoCon>
      }
    }
  ];

  useEffect(() => {
    // otherEmpService.findAllAreas().then(res => {
    //   console.log(res)
    // })
    getTableData()
    //护理部能查看所有科室
    // if (authStore.isDepartment) 
    getDeptAll()
    getGroupList()
  }, []);

  const getGroupList = () => {
    otherEmpService.queryOtherPersonGroupList()
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
      empNo: record.identifier,
      empName: record.name,
      newTitle: record.title,
      nurseHierarchy: record.nurseHierarchy,
      deptCode: record.deptCode,
      deptName: record.deptName,
      status: record.status,
      nearImageUrl: record.nearImageUrl,
      userType: record.userType
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
    setQueryFilter({ ...queryFilter, [`${name}`]: value });
    let newQuery = { ...query };
    value = value == "全部" ? "" : value;
    switch (name) {
      case "Xl":
        newQuery.education = value;
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
    if (e.target.value == query.keyWord) return;

    let newQuery = { ...query, keyWord: e.target.value, pageIndex: 1 };
    setQuery(newQuery);
    getTableData(newQuery);
  };

  const getDeptAll = () => {
    service.commonApiService.getNursingUnitAll().then(res => {
      if (res.data.deptList) setDeptAllList(res.data.deptList)
    })
  }

  /**分组设置 */
  const toGroupSetting = () => {
    appStore.history.push('/continuingEdu/人员分组设置?type=other')
  }

  const handleEditEmp = (record: any) => {
    setRecordSelected(record)
    setIsAdd(false)
    setEditVisible(true)
  }
  const handleAddEmp = () => {
    setIsAdd(true)
    setEditVisible(true)
  }

  const handleDeleteEmp = (record: any) => {
    Modal.confirm({
      title: '删除',
      content: '确定要删除该人员？',
      centered: true,
      onOk: () => {
        setDataLoading(true)
        otherEmpService.deleteInfoByIdentifier(record.identifier)
          .then(res => {
            message.success('删除成功')
            getTableData()
          }, () => setDataLoading(false))
      }
    })
  }

  return (
    <Wrapper className={switchWrapperName()}>
      <CommonHeader title={"其他人员"}>
        {/* <span className="float-item title">科室:</span>
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
        </span> */}
        <span className="float-item input-search">
          <Input
            allowClear
            defaultValue={query.keyWord}
            onBlur={handleSearchInputChange}
          />
        </span>
        <span className="float-item">
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </span>
        <span className="float-item">
          <Button onClick={() => handleAddEmp()}>添加人员</Button>
        </span>
        <span className="float-item">
          <Button onClick={() => setImportVisible(true)}>导入人员</Button>
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
      <EditModal
        visible={editVisible}
        isAdd={isAdd}
        params={recordSelected}
        onOk={() => {
          getTableData()
          setEditVisible(false)
        }}
        onCancel={() => {
          setEditVisible(false)
        }} />
      <ImportTemlateModal
        visible={importVisible}
        onOk={() => {
          setImportVisible(false)
          getTableData()
        }}
        onCancel={() => setImportVisible(false)} />
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
