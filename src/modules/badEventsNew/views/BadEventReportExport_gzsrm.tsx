import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Select, Input, Button, Row, Col,Modal,message,DatePicker,TimePicker  } from "antd";
import { PageTitle } from "src/components/common";
import { NullBox } from 'src/modules/WardRegister/components/NullBox';
import { badEventsNewService } from '../api/badEventsNewService';
import { fileDownload } from "src/utils/file/file";
import { appStore, authStore } from 'src/stores'
import moment from "moment";
export interface Props {
payload: any;
}
const { RangePicker } = DatePicker
export default observer(function BadEventReportExport_gzsrm(props: Props) {
    const [typeList, setTypeList] = useState([]) as any;
    const [btnLoading, setBtnLoading] = useState(false);
    const [query, setQuery] = useState({
        formCode:'',
        startDateStr:moment().startOf('month').format('YYYY-MM-DD'),
        endDateStr:moment().endOf('month').format('YYYY-MM-DD'),
        deptCode:''
    });
    useEffect(() => {
      getEvetTypetList()
    }, [])
    /**不良事件类型列表 */
    const getEvetTypetList = ()=>{
        badEventsNewService.getDetailFormDict().then(res=>{
            setTypeList(res.data || [])
            setQuery({...query,formCode:res.data[0].formCode || ''})
        }).catch(err=>{

        })
    }

    const exportExcel = ()=>{
        setBtnLoading(true)
        badEventsNewService.exportBadEvent_gzsrm(query).then(res=>{
            fileDownload(res);
            setBtnLoading(false)
        }).catch(err=>{
            setBtnLoading(false)
        })
    }
    return (
        <Wrapper>
            <Headerr>
				<LeftIcon>
					<PageTitle maxWidth={1200}>{'不良事件导出'}</PageTitle>
				</LeftIcon>
				<RightIcon>
				<span style={{marginRight:'10px'}}>发生日期：</span>
					<RangePicker
						allowClear={false}
						style={{ width: 200 }}
                        format={'YYYY-MM-DD'}
                        defaultValue={[moment(query.startDateStr),moment(query.endDateStr)]}
						onChange={(date: any) => {
							// console.log(date)
                            setQuery({...query,
                                startDateStr:date[0].format('YYYY-MM-DD'),
                                endDateStr:date[1].format('YYYY-MM-DD')})
						}}
					/>
                    <span style={{marginRight:'10px',marginLeft:'15px'}}>科室：</span>
					<Select 
                        style={{ width: 200 }}
                        value={query.deptCode}
                        onChange={(val: string) => {
                            setQuery({...query,deptCode:val})
                        }}
                        >
                        <Select.Option key={'全部'} value={''}> 全院 </Select.Option>
                        {authStore.deptList.map((item: any, idx: any) =>
                            <Select.Option
                            key={idx}
                            value={item.code}>
                            {item.name}
                        </Select.Option>)}
                    </Select>
					<span style={{marginRight:'10px',marginLeft:'15px'}}>事件类型：</span>
					<Select
					style={{ width: 200 }}
					value={query.formCode}
					onChange={(val: string) => {
                        setQuery({...query,formCode:val})
					}}
					>
					{typeList.map((item:any,index:number)=>{
						return <Select.Option value={item.formCode} key={index}>{item.formName}</Select.Option>
					})}
					</Select>
					
					
					{/* <Button
						type="primary"
						className="span"
						>
						查询
					</Button> */}
				</RightIcon>
			</Headerr>
            <ScrollCon>
                <div className='main'>
                    <Button type='primary' loading={btnLoading} onClick={exportExcel} >导出文件</Button>
                    {/* <p>点击筛选条件进行查询，当前共查询出0条已上报完成记录</p> */}
                </div>
				
            </ScrollCon>
        </Wrapper>
    )
})
const Wrapper = styled.div`
	height: 100%;
    display: flex;
    flex-direction: column;
	.none-border {
		.ant-input,.ant-time-picker-input{
			border: none;
		}
	}
`
const ScrollCon = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  .main{
    height: 200px;
    text-align: center;
    p{
        margin-top: 10px;
        font-size: 15px;
    }
  }


`;
const Headerr = styled.div`
width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px;`;
  
  const LeftIcon = styled.div`
	padding: 0;
	float: left;
  `;
  const RightIcon = styled.div`
	padding: 0 0 0 15px;
	float: right;
	.span {
	  /* font-size:16px; */
	  margin-left: 15px;
	}
  `;