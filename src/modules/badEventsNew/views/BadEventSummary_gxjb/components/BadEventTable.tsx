import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {authStore} from 'src/stores'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message,Table } from "antd";
import { badEventQuarterData_gxjb } from '../BadEventQuarter_gxjb';

export default observer(function BadEventTable(props) {

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 30
    },
    {
      title: "事件发生科室",
      dataIndex: "deptName",
      align: "center",
      width: 100
    },
    {
      title: "不良事件类型",
      dataIndex: "badEventType",
      align: "center",
      width: 100
    },
    {
      title: "事件发生对象的姓名",
      dataIndex: "patientName",
      align: "center",
      width: 130
    },
    
    {
      title: "事件发生日期",
      dataIndex: "happenDay",
      align: "center",
      width: 90
    },
    {
      title: "事件发生时间",
      dataIndex: "happenTime",
      align: "center",
      width: 90
    },
    {
      title: "事件发生班次",
      dataIndex: "happenShift",
      align: "center",
      width: 90
    },
    {
      title: "事件发生地点",
      dataIndex: "happenPlace",
      align: "center",
      width: 90
    },
    {
      title: "事件发生相关人员",
      dataIndex: "relevantPeople",
      align: "center",
      width: 120
    },
    {
      title: "事件发生相关人员/责任人姓名",
      dataIndex: "relevantPeopleName",
      align: "center",
      width: 190
    },
    {
      title: "发生时当事人层级",
      dataIndex: "relevantHierarchy",
      align: "center",
      width: 120
    },
    {
      title: "报告人",
      dataIndex: "reportPeople",
      align: "center",
      width: 80
    },
    {
      title: "上报护理部日期",
      dataIndex: "reportDay",
      align: "center",
      width: 100
    },
    {
      title: "上报护理部时间",
      dataIndex: "reportTime",
      align: "center",
      width: 100
    },
    {
      title: "事件发生的简要描述",
      dataIndex: "briefDescription",
      align: "center",
      width: 150
    },
    {
      title: "护理部讨论不良事件级别",
      dataIndex: "eventLevel",
      align: "center",
      width: 160
    },
  ];

return (
  <Wrapper>
    
    <BaseTable
        loading={badEventQuarterData_gxjb.tableLoading}
        dataSource={badEventQuarterData_gxjb.tableList}
        columns={columns}
        surplusHeight={230}
        surplusWidth={100}
        pagination={{
          current: badEventQuarterData_gxjb.pageIndex,
          total: badEventQuarterData_gxjb.total,
          pageSize: badEventQuarterData_gxjb.pageSize,
        }}
        onChange={(pagination) => {
          badEventQuarterData_gxjb.pageIndex = pagination.current;
          badEventQuarterData_gxjb.total = pagination.total;
          badEventQuarterData_gxjb.pageSize = pagination.pageSize;
          badEventQuarterData_gxjb.onload();
        }}
      />
  </Wrapper>
)
})
const Wrapper = styled.div`

`
