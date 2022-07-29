import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {authStore} from 'src/stores'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message,Table } from "antd";


export default observer(function CaseTable(props) {
  const [tableData, setTableData] = useState([]);
  const [isAdd,setIsAdd] = useState(false) //权限仅护理部主任和肖瑞芬护士长拥有


  const columns: any = [
    {
      title:()=>{
        return(
          <div className='table-hed-left'>
            <span className='ml'>科室</span>
				    <span className='mr'>类别</span>
          </div>
        )
      },
      className:'hua-line',
      dataIndex: "",
      align: "center",
      render: (text: any, record: any, index: number) => index + 1,
      width: 100
    },
    {
      title: "跌倒/坠床",
      dataIndex: "natureOfLearning",
      align: "center",
      width: 100
    },
    {
      title: "非计划拔管",
      dataIndex: "name",
      align: "center",
      width: 100
    },
    {
      title: "院内压力性损伤",
      dataIndex: "sex",
      align: "center",
      width: 100
    },
    {
      title: "给药错误",
      dataIndex: "age",
      align: "center",
      width: 80
    },
    {
      title: "护士锐器伤",
      dataIndex: "post",
      align: "center",
      width: 80
    },
    {
      title: "其他",
      children:[
        {
          title: '烫伤',
          dataIndex: 'fv',
          align: "center",
          width: 80
        },
        {
          title: '冻伤',
          dataIndex: 'hn',
          align: "center",
          width: 80
        },
        {
          title: '标本采集错误',
          dataIndex: 'sd',
          align: "center",
          width: 80
        },
        {
          title: '输血相关事件',
          dataIndex: 'ki',
          align: "center",
          width: 80
        },
        {
          title: '患者走失',
          dataIndex: 'fs',
          align: "center",
          width: 80
        },
        {
          title: '护理投诉',
          dataIndex: 'rt',
          align: "center",
          width: 80
        },
        {
          title: '其他',
          dataIndex: 'gh',
          align: "center",
          width: 80,
          className:'table-border-right'
        },
      ]
    },
    {
      title: "合计",
      dataIndex: "education",
      align: "center",
      width: 80
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
// svg生成base64的网址  https://base64.us/  stroke是颜色 stroke-width线的粗细
{/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#333" stroke-width="0.5"/></svg> */}
const Wrapper = styled.div`
.hua-line {
 background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+) no-repeat 100% center;   
 box-sizing: border-box;
}
.ml{
  float: left;
  padding-left: 10px;
}
.mr{
  float: right;
  padding-right: 10px;
}
.table-border-right{
  border-right: 1px solid #e8e8e8 !important;
}
`