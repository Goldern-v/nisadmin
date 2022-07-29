import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {authStore} from 'src/stores'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message,Table } from "antd";


export default observer(function BadEventTable(props) {
  const [tableData, setTableData] = useState([]);
  const [isAdd,setIsAdd] = useState(false) //权限仅护理部主任和肖瑞芬护士长拥有


  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "事件发生科室",
      dataIndex: "natureOfLearning",
      align: "center",
      width: 100
    },
    {
      title: "不良事件类型",
      dataIndex: "name",
      align: "center",
      width: 100
    },
    {
      title: "事件发生对象的姓名",
      dataIndex: "sex",
      align: "center",
      width: 100
    },
    {
      title: "病案号",
      dataIndex: "age",
      align: "center",
      width: 80
    },
    {
      title: "住院流水号",
      dataIndex: "post",
      align: "center",
      width: 80
    },
    {
      title: "入院日期",
      dataIndex: "title",
      align: "center",
      width: 80
    },
    {
      title: "事件发生时间",
      dataIndex: "education",
      align: "center",
      width: 80
    },
    {
      title: "事件发生班次",
      dataIndex: "originalWorkUnit",
      align: "center",
      width: 80
    },
    {
      title: "事件发生地点",
      dataIndex: "studyDeptName01",
      align: "center",
      width: 180
    },
    {
      title: "事件发生相关人员",
      dataIndex: "studyTimeBegin",
      align: "center",
      width: 150
    },
    {
      title: "事件发生相关人员/责任人姓名",
      dataIndex: "studyTimeEnd",
      align: "center",
      width: 150
    },
    {
      title: "发生时当事人层级",
      dataIndex: "duration",
      align: "center",
      width: 80
    },
    {
      title: "报告人",
      dataIndex: "mattersForStudy",
      align: "center",
      width: 150
    },
    {
      title: "上报护理部时间",
      dataIndex: "phone",
      align: "center",
      width: 120
    },
    {
      title: "事件发生的简要描述",
      dataIndex: "teachingTeacher",
      align: "center",
      width: 120
    },
    {
      title: "护理部讨论不良事件定性",
      dataIndex: "operationScore",
      align: "center",
      width: 100
    },
    {
      title: "护理部讨论不良事件级别",
      dataIndex: "theoryScore",
      align: "center",
      width: 100
    },
  ];

return (
  <Wrapper>
    
    <BaseTable
        // loading={bacisPostgraduateData.tableLoading}
        // dataSource={bacisPostgraduateData.tableList}
        columns={columns}
        surplusHeight={230}
        surplusWidth={100}
        // pagination={{
        //   current: bacisPostgraduateData.pageIndex,
        //   total: bacisPostgraduateData.total,
        //   pageSize: bacisPostgraduateData.pageSize,
        // }}
        // onChange={(pagination) => {
        //   bacisPostgraduateData.pageIndex = pagination.current;
        //   bacisPostgraduateData.total = pagination.total;
        //   bacisPostgraduateData.pageSize = pagination.pageSize;
        //   bacisPostgraduateData.onload();
        // }}
      />
  </Wrapper>
)
})
const Wrapper = styled.div`

`
