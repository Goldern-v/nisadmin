import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, InputNumber,Checkbox, Col, DatePicker, Row,message,Input,Icon,Spin } from 'src/vendors/antd'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore, authStore } from 'src/stores'
import { ScrollBox } from 'src/components/common'
import BaseTable, { DoCon } from "src/components/BaseTable";
import moment from 'moment'
import {
	ColumnProps,
} from "src/vendors/antd";
import qs from 'qs'
import { trainExamData } from './TrainExamData'
export interface Props {
payload: any;
}
export default observer(function TrainExamScore(props: Props) {
	const [columns, setColumns] = useState([] as any);
	let titleList: ColumnProps<any>[] | any= [];
  const columns1: ColumnProps<any>[] | any = [
        {
			title: "序号",
			dataIndex: "batch",
			align: "center",
			width: 30,
			render: (text: any, record: any, index: number)=>index+1
        },
		{
			title: "姓名",
			dataIndex: "name",
			align: "center",
			width: 90,
		},
		{
			title: "平均分",
			dataIndex: "average",
			align: "center",
			width: 80,
			render: (text: any, record: any, index: number)=><span>{text || '--'}</span>
		},
		
	]
  useEffect(() => {
    trainExamData.tableTitleList.map((it:string)=>{
      titleList.push({
          title: it,
          dataIndex: it,
          align: "center",
          width: 80,
          render: (text: any, record: any, index: number)=><span>{text || '--'}</span>
      })
    })
    setColumns([...columns1,...titleList])
    }, [trainExamData.tableTitleList])
	return (
		<Wrapper>
			<HeadCon>
            {/* {name:'学习培训',link:'/continuingEdu'},{name:'人员管理',link:'/continuingEdu/人员管理'}, */}
                <BaseBreadcrumb data={[{name:trainExamData.componentTitle,link:'/continuingEdu/'+trainExamData.module},{ name: '全部成绩', link: '' }]} />
                <div className='title'>{trainExamData.componentTitle}{'全部成绩详情'}</div>
                <div className='aside'>
                {/* <span>
                创建时间:{moment().format('YYYY-MM-DD HH:mm:ss')}
                </span> */}
                </div>
                <div className='tool-con'>
                    <Button onClick={() => appStore.history.goBack()}>返回</Button>
                    {/* <Button type='primary' onClick={()=>{}}>保存</Button> */}
                   
                </div>
            </HeadCon>
			<ScrollCon>
                <BaseTable
                loading={trainExamData.tableScoreLoading}
                dataSource={trainExamData.tableScoreList}
                columns={columns}
                surplusWidth={300}
                surplusHeight={255}
                pagination={{
                    current: trainExamData.pageScoreIndex,
                    total: trainExamData.totalScore,
                    pageSize: trainExamData.pageScoreSize,
                }}
                onChange={(pagination:any) => {
                    trainExamData.pageScoreIndex = pagination.current;
                    trainExamData.totalScore = pagination.total;
                    trainExamData.pageScoreSize = pagination.pageSize;
                    // trainExamData.getTableList();
                }}
                />
            </ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div``
const ScrollCon = styled.div`
  flex: 1;
  .cell-ipt .ant-input-number-input:focus {
    background: yellow !important;
  }
  .pre-wrap{
	white-space: pre-wrap;
  }
  .col-green{
	color: #06AA18;
  }
  .col-red{
	color: #f00;
  }

`;
const HeadCon = styled.div`
  height: 100px;
  background: #f2f2f2;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 24px;
    margin: 0 0 0 20px;
    font-weight: bold;
    min-height: 30px;
	color: #000;
  }
  .aside {
    font-size: 12px;
    color: #8c8c8c;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    /* width: 400px; */
    height: 45px;
    display: flex;
    align-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    button {
      margin-left: 15px;
      margin-bottom: 10px;
    }
  }
`