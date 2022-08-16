import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { clinicalManagData } from "../ClinicalPostgraduate";
import { Button, Modal, message as Message, Input, InputNumber, Select  } from "antd";
import { appStore,authStore } from "src/stores";
import qs from "qs";
// import AddInternModal from "../model/AddInternModal"; // 修改弹窗
const { Option } = Select;
const { TextArea } = Input;

interface Props {}

export default observer(function ApplyTable(props: Props) {
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态

  const deptName = authStore.isDepartmentYaXin ? [{
    title: "实习科室",
    dataIndex: "deptName",
    align: "center",
    width: 100,
    
  }] : []
  const columns: any = [
    {
      title: "姓名",
      dataIndex: "empName",
      align: "center",
      width: 150,
      render: (text: string, record: any) => {
        return {
          children: text,
          props: {
            rowSpan: record.rowSpan,
          },
        }
      }
    },
    ...deptName,
    {
      title: "带教老师",
      dataIndex: "teachTeacher",
      align: "center",
      width: 150,
      render:(text:any,record:any) => {
        return(
        <TextArea
            style={{border:'none',resize:'none',outline:'none'}} 
            autosize={{ minRows: 1 }}
            maxLength={200}
            value={text}
            onChange={e => {
            // console.log(e.target.value)
            record.teachTeacher = e.target.value
            updateData(record)
          }}
        />
        )
      }
    },
    {
      title: "实习时间",
      dataIndex: "实习时间",
      width: 300,
      align: "center",
      render(text: string, record: any) {
        return record.internshipBeginTime && record.internshipEndTime ? `${record.internshipBeginTime} ~ ${record.internshipEndTime}` : '';
      }
    },
    {
      title: "操作考核成绩",
      dataIndex: "operationScore",
      align: "center",
      width: 150,
      render:(text:any,record:any) => {
        return(
          <InputNumber
            value={text}
            precision={1}
            onChange={(val: any) => {
            record.operationScore = val
            updateData(record)
          }}
          />
        )
      }
    },
    {
      title: "理论考核成绩",
      dataIndex: "theoryScore",
      align: "center",
      width: 150,
      render:(text:any,record:any) => {
        return(
          <InputNumber
            value={text}
            precision={1}
            onChange={(val: any) => {
            record.theoryScore = val
            updateData(record)
          }}
          />
        )
      }
    },
    {
      title: "综合评定",
      dataIndex: "comprehensiveScore",
      align: "center",
      width: 150,
      render:(text:any,record:any) => {
        return(
          <InputNumber
            value={text}
            precision={1}
            onChange={(val: any) => {
            record.comprehensiveScore = val
            updateData(record)
          }}
          />
        )
      }
    },
    {
      title: "留院结果",
      dataIndex: "detentionResults",
      align: "center",
      width: 200,
      render:(text: any,record: any) => {
        return (
          <Select 
            style={{ width: 150 }}
            value={text}
            onChange={(value: any,option: any) => {
              record.detentionResults = option.props.children;
              updateData(record)
            }}
          >
            {clinicalManagData.getDict('留院结果').map((item) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: "优秀实习生",
      dataIndex: "isGoodIntern",
      align: "center",
      width: 100,
      render:(text: any,record: any) => {
        return (
          <Select 
            style={{ width: 80 }}
            value={text}
            onChange={(value: any,option: any) => {
              record.isGoodIntern = option.props.value;
              updateData(record)
            }}
          >
            <Select.Option value={1}>{'是'}</Select.Option>
            <Select.Option value={0}>{'否'}</Select.Option>
          </Select>
        )
      }
    },
    {
      title: "总体评价",
      dataIndex: "overallEvaluation",
      align: "center",
      width: 300,
      render:(text:any,record:any) => {   
        return(
          <TextArea
            style={{border:'none',resize:'none',outline:'none'}} 
            autosize={{ minRows: 1 }}
            maxLength={200}
            value={text}
            onChange={e => {
            // console.log(e.target.value)
            record.overallEvaluation = e.target.value
            updateData(record)
          }}
        />
        )
      }
    },
    authStore.isDepartment && {
      title: "操作",
      dataIndex: "overallEvaluation",
      align: "center",
      width: 80,
      render(text: any, record: any) {
        let data: any = [
        {
          text: "删除",
          color:'#f44',
          function: handleDelete
        }];
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                style={{color:item.color?item.color:''}}
                onClick={() => (item.function ? item.function(record) : {})}
              >
                {item.text}
              </span>
            ))}
          </DoCon>
        );
      }
    }
  ];

  const handleDelete = (record:any) => {
    let obj = {
      groupId:record.groupId,
      empNo:record.empNo,
    }
    clinicalManagData.deleteIdentification(obj).then((res:any)=>{
      Message.success('删除成功！')
      clinicalManagData.onload();
    })
  }

  // 更新数据
  const updateData = (record: any) => {
    // 找出当前填写的id和后端返回的id相等的索引值
    const dataIndexOne: any = clinicalManagData.tableList.findIndex(
      (obj: any) => record.id === obj.id
    );
    (clinicalManagData.tableList[dataIndexOne] as any) = record;
    const arrOne = clinicalManagData.tableList.slice();
    
    clinicalManagData.tableList = [];
    clinicalManagData.tableList = arrOne;
    
  };

  return (
    <Wrapper>
      <BaseTable
        loading={clinicalManagData.tableLoading}
        dataSource={clinicalManagData.tableList}
        columns={columns}
        surplusHeight={230}
        surplusWidth={100}
        pagination={{
          current: clinicalManagData.pageIndex,
          total: clinicalManagData.totalCount,
          pageSize: clinicalManagData.pageSize,
        }}
        onChange={(pagination) => {
          clinicalManagData.pageIndex = pagination.current;
          clinicalManagData.totalCount = pagination.total;
          clinicalManagData.pageSize = pagination.pageSize;
          clinicalManagData.onload();
        }}
      />
       {/* <AddInternModal
        allowClear={createClear}
        visible={editVisible}
        params={editParams}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditOk}
      /> */}
      
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 0 20px;
  box-sizing: border-box;

  .ant-input-number {
    border: none;
  }

  .ant-select-selection {
    border: none;
  }

  .ant-select-arrow {
    display: none;
  }
`;
