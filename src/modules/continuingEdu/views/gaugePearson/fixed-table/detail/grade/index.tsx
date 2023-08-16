import { ColumnProps } from 'antd/es/table'
import React from 'react'
import BaseTable from 'src/modules/setting/common/TableModel'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import {observer} from "mobx-react";
interface IProps {
  isPreview?: boolean
}
const columns: ColumnProps<any>[] = [
  {
    key: 'idx',
    dataIndex: 'idx',
    title: '序号',
    width: 60,
    align: 'center',
    render(text: any, record: any, idx: number) {
      return idx + 1
    }
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: '考核类型',
    width: 100,
    align: 'center',
    render:(text:string)=>{
      // type 类型 1：理论考核；2：实操考核
      return {1:'理论考核',2:'实操考核'}[text]
    }
  },
  {
    key: 'examContent',
    dataIndex: 'examContent',
    title: '考核项目',
    width: 100,
    align: 'center',
  },
  {
    key: 'examScore',
    dataIndex: 'examScore',
    title: '考核分数',
    width: 100,
    align: 'center',
  },
  {
    key: 'examResult',
    dataIndex: 'examResult',
    title: '考核结果',
    width: 100,
    align: 'center',
  },
  {
    key: 'resitScore',
    dataIndex: 'resitScore',
    title: '补考后成绩',
    width: 100,
    align: 'center',
  },
]
/**固定表-岗前培训考核成绩 */
export default observer(function FixedGrade(props: IProps) {
  const { isPreview = false } = props
  return <Wrapper>
    <div className='title'>岗前培训考核成绩</div>
    <BaseTable
      dataSource={isPreview ? [] : handbookModel.detail.preTheoryExamDetails}
      columns={columns}
    />
  </Wrapper>
})
const Wrapper: any = styled.div`
width: 210mm;
/* height: 960mm; */
.title {
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
`